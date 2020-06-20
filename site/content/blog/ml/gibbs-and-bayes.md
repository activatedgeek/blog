---
title: The Gibbs distribution and general Bayes
description: A visual inspection into my IMDb ratings using Altair
date: Jun 11 2020, 16:00 -0700
tags:
  - ML
  - bayes
---

The Gibbs distribution keeps coming up everywhere in machine learning. In this
post, I'm going to focus on a general optimization problem and realize its
various connections. Towards the end, I'm going to touch upon _general Bayes_
which goes beyond classic posterior inference.

## Optimization problem

The optimization problem we are interested in is formulated as below -

$$
\underset{q(\theta) \in \mathcal{P}}{\text{argmin}}{}~ \left\{ \mathcal{J}(q(\theta); \ell, \mathcal{D}, p(\theta)) = \mathbb{E}_{q(\theta)}\left[ \ell(\mathcal{D}; \theta) \right] + \mathcal{KL}\left[ q(\theta){}~ \big|\big|{}~ p(\theta) \right] \right\}
$$

We aim to find a distribution $q(\theta)$ that minimizes the function
$\mathcal{J}$ over a family of distributions $\mathcal{P}$ regularized by the
prior $p(\theta)$ via the $\mathcal{KL}$-divergence. $\ell$ is a _loss function_
to our liking.

## Optimal Gibbs distribution

We show two proofs for the fact the distribution $q$ that minimizes the
optimization problem above is a specific form of a Gibbs distribution.

### Variational Calculus

The variational calculus approach to solving would be to simply solve a constrained
optimization problem. The only constraint we have is that $q(\theta)$ is a probability
distribution.

$$
\begin{aligned}
\underset{q(\theta) \in \mathcal{P}}{\text{argmin}}&{}~ \mathcal{J}(q(\theta); \ell, \mathcal{D}, p(\theta)) \\
\text{s.t.}&{}~ \int q(\theta) d\theta = 1
\end{aligned}
$$

Converting this to an unconstrained optimization problem via the _method of Lagrange multipliers_ \cite{boyd2004convex},
for a multiplier $\lambda \in \mathbb{R}$, we have

$$
\mathcal{J}(q(\theta); \ell, \mathcal{D}, p(\theta)) + \lambda \left(\int q(\theta) d\theta - 1 \right)
$$

We take the functional derivatives [^1] w.r.t $q(\theta)$ and the fact that this should
be equal to zero for a minimum.

$$
\ell(\mathcal{D}, \theta) + 1 + \log{q(\theta)} - \log{p(\theta)} + \lambda = 0
$$

$$
q(\theta) = p(\theta) \exp{\left\{-1 - \lambda - \ell(\mathcal{D}; \theta)\right\}}
$$

To eliminate $\lambda$, we put it back into the constraint and get

$$
\exp{\left\{1 + \lambda\right\}} = \int p(\theta) \exp{\left\{- \ell(\mathcal{D}; \theta)\right\}} d\theta
$$

We get the complete form for our optimal Gibbs distribution

$$
q(\theta) = \frac{p(\theta) \exp{\left\{- \ell(\mathcal{D}; \theta)\right\}}}{\int p(\theta^\prime) \exp{\left\{- \ell(\mathcal{D}; \theta^\prime)\right\}} d\theta^\prime}
$$

### KL-divergence minimizer

Alternatively, we can also make some manipulations to our original object of interest
as follows

$$
\begin{aligned}
\mathbb{E}_{q(\theta)}\left[ \ell(\mathcal{D}; \theta) \right] + \mathcal{KL}\left[ q(\theta){}~ \big|\big|{}~ p(\theta) \right] \\
\mathbb{E}_{q(\theta)}\left[ \log{\exp{\left\{ \ell(\mathcal{D}; \theta) \right\}}} + \log{\frac{q(\theta)}{p(\theta)}} \right] \\
\mathbb{E}_{q(\theta)}\left[ \log{\frac{q(\theta)}{p(\theta)\exp{\left\{ -\ell(\mathcal{D}; \theta) \right\}}/Z}} \right]
\end{aligned}
$$

Note that we have sneaked in a normalizer $Z$ as it does not change the optimization problem.
This ensure the denominator remains a probability distribution and allows us
to arrive at the following expression,

$$
\mathcal{KL}\left( q(\theta) ~\big|\big|~ p(\theta)\exp{\left\{ -\ell(\mathcal{D}; \theta) \right\}} / Z \right)
$$

Things are much simpler now because we know that $\mathcal{KL}$-divergence is
non-negative and zero only when the two arguments are equal. Hence, the minimum (zero)
is attained when

$$
q(\theta) = \frac{p(\theta)\exp{\left\{ -\ell(\mathcal{D}; \theta) \right\}}}{Z}
$$

The normalizer can be simply arrived at by integrating out the numerator over $\theta$
and we arrive at the optimal Gibbs distribution $q(\theta)$.

## Connections

Bayesian inference can be seen as an infinite dimensional generalization of the
optimization problem described above \cite{csiszar1975divergence,donsker1976asymptotic,zellner1988optimal}.
This result can also be extended to build all sorts of new schemes based on generalized
divergences like the $\beta$-divergence \cite{futami2017variational}. Generalized
variational inference \cite{knoblauch2019generalized} encompasses a large family
of inference schemes, for instance power likelihoods when we use a tempered divergence
$\frac{1}{\beta}$ $\mathcal{KL}$.

Below we discuss a few connections to show the broad coverage of this formulation
of the optimization problem.

### Bayesian posterior

As an example, the classic Bayesian posterior inference can be recovered by
assuming $\ell(\mathcal{D}; \theta) = -\log{p(\mathcal{D} ~|~ \theta)}$. Plugging
this back into the optimal Gibbs distribution we get,

$$
q(\theta) = \frac{p(\theta) p(\mathcal{D} ~|~ \theta)}{\int p(\theta^\prime)p(\mathcal{D} ~|~ \theta) d\theta^\prime}
$$

which is reminiscent of the classic posterior recovered by the Bayes theorem, $q(\theta) = p(\theta ~|~ \mathcal{D})$.

Further, instead of optimizing over the universal family of distributions $\mathcal{P}$,
using a restricted family of distributions $\mathcal{Q} \subset \mathcal{P}$, we recover
variational inference. For instance, when $\mathcal{Q}$ is the family of diagonal
covariance Gaussians, we recover Mean-Field variational inference (MFVI).

### Entropy-Regularized RL

The Gibbs distribution also comes up in the formulation of Soft Q-Learning.
We define an entropy-augmented return \cite{schulman2017equivalence} as $\sum_{t=0}^{\infty} \gamma^t (r_t - \tau \mathcal{KL}_t)$
for a discount factor $\gamma \in [0, 1]$, instantaneuous
reward $r_t$, a scalar coefficient $\tau$ effectively balancing the explore/exploit dichotomy
and the instantaneous distance $\mathcal{KL}_t = \mathcal{KL}(\pi(\dot | s_t) ~||~ \pi_0(\dot | s_t) )$
between our policy $\pi$ and a reference policy $\pi_0$ at state $s_t$. Without
getting into the details, this definition leads us to the state value function at a
state $s$ under policy $\pi$ as

$$
V_\pi(s) = \mathbb{E}_{a \sim \pi}\left[ Q_\pi(s, a) - \tau \mathcal{KL}(\pi ~||~ \pi_0)(s) \right]
$$

$Q_\pi(s, a)$ is the action value function under the policy $\pi$ at state $s$
under action $a$. A natural optimal policy to define would be the one that maximizes
this state value function greedily. Hence, putting this in the form of our
minimization problem earlier, we want to minimize the objective over a family of
policies $\Pi$ given a reference policy $\pi_0$.

$$
\pi(\cdot ~|~ s) = \underset{\pi \in \Pi}{\text{argmin}}~ \mathbb{E}_{a \sim \pi}\left[ -\frac{1}{\tau} Q_\pi(s, a) + \mathcal{KL}(\pi ~||~ \pi_0)(s) \right]
$$

By symmetry, $\ell = -\frac{1}{\tau} Q_\pi(s, a)$ and the optimal distribution
comes out to be Gibbs distribution of the form

$$
\pi(a ~|~ s) \propto \pi_0(a ~|~ s)\exp{\frac{1}{\tau} Q_\pi(s, a)}
$$

This formulation forms the foundation of Soft Q-Learning and its derivatives.
Intuitively, this provides us a straightforward path to build an optimal policy
once we've arrived at the correct action value function. In the limit
$\tau \to \infty$, we recover our reference policy $\pi_0$ which basically
amounts exploration under the policy $\pi_0$ and never exploiting the policy $\pi$.

### General Bayes

We make a small final note. The traditional paradigm of Bayesian inference forces us
to define a likelihood model and a prior to arrive at the posterior as

$$
p(\theta ~|~ \mathcal{D}) \propto \overbrace{p(\theta)}^{\text{prior}} \underbrace{p(\mathcal{D} ~|~ \theta)}_{\text{model likelihood}}
$$

If one believes in the [Cox's Axioms](https://en.wikipedia.org/wiki/Cox%27s_theorem),
this formulation is very principled and effective based on decades of evidence.
However, as with all inference, Bayesian inference would also break under a
violation of assumptions - misspecified model likelihood or a misspecified prior,
moreso in some problems than others. For instance, it is still a hard problem to
come up with a prior for neural networks as we don't have a completely understanding
to what that would really mean - does a Gaussian prior over each unit mean something?

A broader family of work, inspired by Bayesian inference, instead avoids using
the terms _model likelihood_ and _prior_ altogether. Connecting this back to
our original optimization problem, instead of looking $p(\theta)$ as a prior, it
serves a way for us to represent favorable predictors of the data in the space
of distributions $\mathcal{P}$. Similarly, instead of $p(\mathcal{D} ~|~ \theta)$,
we want to describe $\ell$ as merely an instrument which guides us towards a better
predictive algorithm. $q(\theta)$ doesn't really remain a posterior in the
faithful _Bayesian_ sense but is oft referred to as a _pseudo-posterior_. This
approach certainly sounds promising, although still in early stages of
development \cite{knoblauch2019generalized,guedj2019primer} for the modern machine
learning world.

## References

```bib
@book{bishop2006pattern,
  title={Pattern recognition and machine learning},
  author={Bishop, Christopher M},
  year={2006},
  publisher={springer}
}

@book{boyd2004convex,
  title={Convex optimization},
  author={Boyd, Stephen and Boyd, Stephen P and Vandenberghe, Lieven},
  year={2004},
  publisher={Cambridge university press}
}

@article{csiszar1975divergence,
  title={I-divergence geometry of probability distributions and minimization problems},
  author={Csisz{\'a}r, Imre},
  journal={The annals of probability},
  pages={146--158},
  year={1975},
  publisher={JSTOR}
}

@article{zellner1988optimal,
  title={Optimal information processing and Bayes's theorem},
  author={Zellner, Arnold},
  journal={The American Statistician},
  volume={42},
  number={4},
  pages={278--280},
  year={1988},
  publisher={Taylor \& Francis}
}

@article{donsker1976asymptotic,
  title={Asymptotic evaluation of certain Markov process expectations for large time—III},
  author={Donsker, Monroe D and Varadhan, SR Srinivasa},
  journal={Communications on pure and applied Mathematics},
  volume={29},
  number={4},
  pages={389--461},
  year={1976},
  publisher={Wiley Online Library}
}

@article{futami2017variational,
  title={Variational inference based on robust divergences},
  author={Futami, Futoshi and Sato, Issei and Sugiyama, Masashi},
  journal={arXiv preprint arXiv:1710.06595},
  year={2017}
}

@article{knoblauch2019generalized,
  title={Generalized variational inference},
  author={Knoblauch, Jeremias and Jewson, Jack and Damoulas, Theodoros},
  journal={arXiv preprint arXiv:1904.02063},
  year={2019}
}

@article{schulman2017equivalence,
  title={Equivalence between policy gradients and soft q-learning},
  author={Schulman, John and Chen, Xi and Abbeel, Pieter},
  journal={arXiv preprint arXiv:1704.06440},
  year={2017}
}

@article{guedj2019primer,
  title={A primer on PAC-Bayesian learning},
  author={Guedj, Benjamin},
  journal={arXiv preprint arXiv:1901.05353},
  year={2019}
}
```

## Footnotes

[^1]: See Appendix D in Bishop \cite{bishop2006pattern}.
