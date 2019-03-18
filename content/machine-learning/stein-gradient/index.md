+++
title = "The Stein Gradient"
description = "Visualizing the simple yet powerful Stein gradient for sampling"
date = "2019-03-17"
# thumbnail = "https://i.imgur.com/K7Zjm95.png"
categories = [
  "sampling",
  "machine learning"
]
tags = [
  "sampling",
  "machine learning",
]

[distill]
  [distill.supportFiles]
  bibliography = "refs.bib"

  [[distill.authors]]
  author = "Sanyam Kapoor"
  authorURL = "http://www.sanyamkapoor.com/"

    [[distill.authors.affiliations]]
    name = "Courant Institute, NYU"
    url = "https://cs.nyu.edu"
+++

Machine Learning is all about dealing with uncertainty of outcomes and Bayesian inference provides us a principled way to reason about the same. We combine the observed data with out priors to build (potentially complex) posteriors over the variables of interest and use those for answering subsequent questions. The ability to model a probability distribution called the posterior allows us to quantify the uncertainty claims for any downstream tasks. However, the posterior is a tricky term to compute because of the computationally intensive integral term in the denominator (the evidence). Without having access to the true closed form of the posterior, the next best thing to have is a representative set (more formally the *typical set* {{<cite bib="betancourt2017geometric">}}) from the posterior distributions' *high* density regions. Over the years, researchers have used variants of a handful of umbrella techniques, all of which converge to the true distribution in the limit of the number of samples - conjugate priors for mathematical convenience {{<cite bib="gelman2013bayesian">}}, Markov Chain Monte Carlo (MCMC) {{<cite bib="brooks2011handbook">}} family of algorithms especially the Hamiltonian Monte Carlo (HMC) {{<cite bib="neal2012mcmc">}}, Variational Inference {{<cite bib="jordan1999introduction,ranganath2014black">}}, Normalizing Flows {{<cite bib="rezende2015variational">}}. All these methods have been immensely successful in Bayesian analysis. 

However, like all feasible methods, these make trade offs - using conjugate priors limits the richness of the posterior densities; the MCMC family requires us to carefully design the transition kernel of the Markov chain and the SDE integrator for numerical stability; Variational Inference can lead to underfitted posteriors by the nature of KL divergence minimization; Normalizing Flows demand an exact parametric form of the bijectors where the computation of the determinant of the Jacobian needs to be tractable. Today we will look at an approach which does away with all the previous pathologies (not to say it doesn't introduce new ones) called the (kernelized) Stein Gradient.

We will first summarize the key background topics needed to understand, state the formal results underlying the Stein gradient and then visualize via code how this technique can be used to build powerful samplers.

# Background

## Kernels

Kernels are a very neat idea where the objective is to map our raw input space {{<math>}}\mathcal{X}{{</math>}} to an abstract vector space {{<math>}}\mathcal{H}{{</math>}} so that we can define similarity in terms of dot products and get all the geometric niceties of angles, lengths and distances {{<cite bib="scholkopf2001learning">}}. Formally, the most important equations can be summarized as
{{<math block="true">}}
\begin{aligned}
\mathbf{\Phi}:& \mathcal{X} \to \mathcal{H} \\
&\mathcal{x} \mapsto \mathbf{x} \triangleq \mathbf{\Phi}(\mathcal{x}) \\
k(x, x^\prime) &= \langle \mathbf{\Phi}(\mathcal{x}), \mathbf{\Phi}(\mathcal{x}^\prime) \rangle
\end{aligned}
{{</math>}}

The key idea is that given a kernel function, we can construct a feature space (more formally known as the *Hilbert space* in functional analysis) such that the kernel computes a dot product in that feature space. The terminology kernel comes from a function {{<math>}}k{{</math>}} which gives rise to the following integral operator {{<math>}}T_k{{</math>}}
{{<math block="true">}}
(T_kf)(x) = \int_{\mathcal{X}} k(x, x^\prime) f(x) dx^\prime
{{</math>}}

Intuitively, one can imagine this operator to be a rich representation in terms of the linear combination over the full
space where the combination coefficients are defined by the kernel function. By extending this idea and a particular construction, we arrive at the idea of *representer of evaluation* which leads to the classic notion of *reproducing kernel Hilbert space (RKHS)*.

## Stein's Identity

Let {{<math>}}p(x){{</math>}} be a smooth density supported on {{<math>}}\mathcal{X} \subseteq \mathbb{R}^d{{</math>}}
and {{<math>}}\mathbf{\phi}(x){{</math>}} is a smooth vector function, the Stein's identity states that under a Stein operator {{<math>}}\mathcal{A}_p{{</math>}},

{{<math block="true">}}
\begin{aligned}
\mathbb{E}_{x \sim p}\left[ \mathcal{A}_p\phi(x) \right] &= 0 \\
\text{where}, \mathcal{A}_p\phi(x) &= \phi(x) \nabla_x \log{p(x)}^T + \nabla_x \phi(x)
\end{aligned}
{{</math>}}

We need mild boundary conditions for the above to be true - either {{<math>}}p(x)\phi(x) = 0\text{ }\forall x \in \partial\mathcal{X}{{</math>}} when {{<math>}}\mathcal{X}{{</math>}} is compact or {{<math>}}\lim_{||x|| \to \infty}p(x)\phi(x) =0{{</math>}} when {{<math>}}\mathcal{X} = \mathbb{R}^d{{</math>}}. A function {{<math>}}\phi{{</math>}} belongs to the Stein class of {{<math>}}p{{</math>}} if the Stein identity holds.

## Stein Discrepancy

Let us consider another smooth density {{<math>}}q(x){{</math>}} and {{<math>}}\phi{{</math>}} belongs to the Stein class of {{<math>}}q{{</math>}} (but not {{<math>}}p{{</math>}}). After some simple manipulations, we can see that
{{<math block="true">}}
\begin{aligned}
\mathbb{E}_q\left[\mathcal{A}_p\phi(x)\right] &= \mathbb{E}_q\left[\mathcal{A}_p\phi(x) - \mathcal{A}_q\phi(x)\right] \\
&= \mathbb{E}_q\left[ (\nabla_x \log{p(x)} - \nabla_x \log{q(x)}) \phi(x)^T \right]
\end{aligned}
{{</math>}}

Intuitively, this can be seen as a function weighted by the difference of the score functions of both the distributions. It has been shown{{<cite bib="gorham2015measuring">}} that
{{<math block="true">}}\mathbb{E}_q\left[ (\nabla_x \log{p(x)} - \nabla_x \log{q(x)}) \phi(x)^T \right] = \mathbb{E}_q\left[trace(\mathcal{A}_p\phi(x))\right]{{</math>}}

Note that the use of trace for the matrix norm is only meant to make it a scalar and other matrix norms may be used. If we consider the maximum value over some family of test functions, we get the *Stein Discrepancy* measure.

{{<math block="true">}}
\mathbb{S}(q, p) = \underset{\phi \in \mathcal{F}}{\max} \left\{ (\mathbb{E}_q\left[trace(\mathcal{A}_p\phi(x))\right])^2 \right\}
{{</math>}}

This can be thought of as a maximum possible violation under the family of test functions away from {{<math>}}p{{</math>}}. However, it turns out that the computational tractability of this measure is critically dependent on the choice of family of test functions {{<math>}}\mathcal{F}{{</math>}}.

## Kernelized Stein Discrepancy

If we choose the family of test functions to be the unit norm RKHS, it turns out we can find out a closed form for the Stein Discrepancy measure {{<cite bib="liu2016kernelized">}}.

{{<math block="true">}}
\begin{aligned}
\mathbb{S}(q, p) &= \underset{\phi \in \mathcal{H}^d}{\max} \left\{ (\mathbb{E}_q\left[trace(\mathcal{A}_p\phi(x))\right])^2, ||\phi||_{\mathcal{H}^d} \leq 1 \right\} \\
&= ||\mathbf{\phi}^\star_{q,p}||_{\mathcal{H}^d}^2 \\
\text{where, } \mathbf{\phi}^\star_{q,p}(\cdot) &= \mathbb{E}_q\left[ \mathcal{A}_p k(x, \cdot) \right]
\end{aligned}
{{</math>}}

This measure is zero if and only if {{<math>}}q = p{{</math>}}. The power of this result is realized by the *Stein Variational Gradient Descent*.

# Stein Variational Gradient Descent

As it turns out, under a deterministic transform (a one step normalizing flow) {{<math>}}z = \mathbf{T}(x) = x + \epsilon \mathbf{\phi}(x), \text{where } x \sim q(x){{</math>}}, we have {{<cite bib="liu2016stein">}}

{{<math block="true">}}
\nabla_\epsilon KL(q_{[\mathbf{T}]} || p) \bigg|_{\epsilon = 0} = - \mathbb{E}_q\left[trace(\mathcal{A}_p\phi(x))\right]
{{</math>}}

Combining this result with the previous discussion, we can conclude that {{<math>}}\phi^\star_{q,p}{{</math>}} is the optimal direction of perturbation in the unit norm RKHS. This is the direction of the steepest descent that minimizes the KL divergence of the transformed distribution {{<math>}}q_{[\mathbf{T}]}{{</math>}} in the zero centered ball of {{<math>}}\mathcal{H}^d{{</math>}}.

More practically, with every timestep {{<math>}}\epsilon{{</math>}}, the ODE brings the KL divergence down by a factor of {{<math>}}\epsilon \mathbb{S}(q,p){{</math>}}. Hence, the ODE we are trying to simulate to convergence is

{{<math block="true">}}
\dot{x} = \phi^\star_{q,p}(x)
{{</math>}}

{{<math>}}\phi^\star_{q,p}{{</math>}} is an expectation and can be empirically estimated using a mean of {{<math>}}n{{</math>}} *particles*. Before we go and see how this works in practice, it is important to see what the term {{<math>}}\phi^\star_{q,p}{{</math>}} is really achieving

{{<math block="true">}}
\hat{\phi}^\star_{q,p}(x) = \frac{1}{n} \sum_{j = 1}^n \left[ k(x_j, x) \nabla_{x_j} \log{p(x_j)} + \nabla_{x_j} k(x_j, x)  \right]
{{</math>}}

If we consider just one particle {{<math>}}n = 1{{</math>}} and all kernels where {{<math>}}\nabla_xk(x,x) =0{{</math>}} (which is true for the *rbf* kernel), then what we achieve is plain old gradient descent and the particle would simply reach the mode of {{<math>}}p{{</math>}}. In the presence of more particles, the kernel acts like a repulsive force which encourage diversity of particles. This is actually a pretty neat result where we have established sort of a communication protocol between the particles via the gradient of the kernel function.
