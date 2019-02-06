+++
title = "Policy Gradients in a Nutshell"
description = "Everything you need to know to get started with Policy Gradient Algorithms for Reinforcement Learning"
date = "2018-05-21"
thumbnail = "https://i.imgur.com/K7Zjm95.png"
categories = [
  "RL",
  "machine learning"
]
tags = [
  "reinforcement learning",
  "policy gradients",
]

[distill]
  [[distill.authors]]
  author = "Sanyam Kapoor"
  authorURL = "http://www.sanyamkapoor.com/"

    [[distill.authors.affiliations]]
    name = "Courant Institute, NYU"
    url = "https://cs.nyu.edu"
+++

*This article aims to provide a concise yet comprehensive introduction to one of the most important
class of control algorithms in Reinforcement Learning - Policy Gradients. I will discuss these
algorithms in progression, arriving at well-known results from the ground up. It is aimed at readers
with a reasonable background as for any other topic in Machine Learning. By the end, I hope that you'd
be able to attack a vast amount of (if not all) Reinforcement Learning literature.*

# Introduction

Reinforcement Learning (RL) refers to both the learning problem and the sub-field of machine
learning which has lately been in the news for great reasons. RL based systems have now [beaten
world champions of Go](https://deepmind.com/blog/alphago-zero-learning-scratch/), [helped operate
datacenters better](https://deepmind.com/blog/deepmind-ai-reduces-google-data-centre-cooling-bill-40/)
and [mastered a wide variety of Atari games](https://deepmind.com/research/publications/playing-atari-deep-reinforcement-learning/).
The research community is seeing many more promising results. With enough motivation, let us now
take a look at the Reinforcement Learning problem.

Reinforcement Learning is the most general description of the learning problem where the aim is to
maximize a long-term objective. The system description consists of an *agent* which interacts with the
*environment* via its actions at discrete timesteps and receives a *reward*. This transitions the agent
into a new *state*. A canonical agent-environment feedback loop is depicted by the figure below.

{{< figure class="figure" src="//i.imgur.com/K7Zjm95.png" title="The Canonical Agent-Environment Feedback Loop" >}}

The Reinforcement Learning flavor of the learning problem is strikingly similar to how humans effectively
behave - experience the world, accumulate knowledge and use the learnings to handle novel situations. Like
many people, this attractive nature (although a harder formulation) of the problem is what excites me and
hope it does you as well.

# Background and Definitions

A large amount of theory behind RL lies under the assumption of *The Reward Hypothesis* which in summary states
that all goals and purposes of an agent can be explained by a single scalar called the *reward*. This is still
subject to debate but has been fairly hard to disprove yet. More formally, the reward hypothesis is given below

> **The Reward Hypothesis**: That all of what we mean by goals and purposes can be well thought of as the maximization
> of the expected value of the cumulative sum of a received scalar signal (called reward).

As an RL practitioner and researcher, one's job is to find the right set of rewards for a given problem known
as *reward shaping*.

The *agent* must formally work through a theoretical framework known as a Markov Decision Process which consists
of a decision (what action to take?) to be made at each state. This gives rise to a sequence of states, actions and
rewards known as a *trajectory*.

\\[ S_0, A_0, R_1, S_1, A_1, R_2, \dots \\]

and the objective is to maximize this set of rewards. More formally, we look at the Markov Decision Process framework

> **Markov Decision Process**: A (Discounted) Markov Decision Process (MDP) is a tuple
> \\( (\mathcal{S}, \mathcal{A}, \mathcal{R}, p, \gamma) \\), such that
> \\[ p(s^\prime, r | s, a) = Pr\left[ S\_{t+1} = s^\prime, R\_{t+1} = r | S\_{t} = s, A\_{t} = a \right] \\]
> \\[ G\_{t} = R\_{t+1} + \gamma R\_{t+2} + \gamma^2 R\_{t+3} + \cdots \\]
> where \\( S\_{t}, S\_{t+1} \in \mathcal{S} \\) (state space), \\( A\_{t+1} \in \mathcal{A} \\) (action space),
> \\( R\_{t+1},R\_{t} \in \mathcal{R} \\) (reward space), \\( p \\) defines the dynamics of the process and
> \\( G\_t \\) is the discounted return.

In simple words, an MDP defines the probability of transitioning into a new state, getting some reward given
the current state and the execution of an action. This framework is mathematically pleasing because it is
First-Order Markov. This is just a fancy way of saying that anything that happens next is dependent only on the present
and not the past. It does not matter how one arrives at the current state as long as one does. Another important part of
this framework is the discount factor \\( \gamma \\). Summing these rewards over time with a varying degree of importance
to the rewards from the future leads to a notion of discounted returns. As one might expect, a higher \\( \gamma \\) leads
to higher sensitivity for rewards from the future. However, the extreme case of \\( \gamma = 0 \\) doesn't consider rewards
from the future at all.

The dynamics of the environment \\( p \\) are outside the control of the agent. To internalize this, imagine standing
on a field in a windy environment and taking a step in one of the four directions at each second. The winds are so strong,
that it is hard for you to move in a direction perfectly aligned with north, east, west or south. This probability of landing
in a new state at the next second is given by the dynamics \\( p \\) of the windy field. It is certainly not in your (agent's)
control.

However, what if you somehow understand the dynamics of the environment and move in a direction other than north, east,
west or south. This *policy* is what the agent controls. When an agent follows a policy \\( \pi \\), it generates the
sequence of states, actions and rewards called the *trajectory*.

> **Policy**: A policy is defined as the probability distribution of actions given a state
> \\[ \pi(A_t = a | S_t = s) \\]  \\[ \forall A_t \in \mathcal{A}(s), S_t \in \mathcal{S} \\]

With all these definitions in mind, let us see how the RL problem looks like formally.

# Policy Gradients

The objective of a Reinforcement Learning agent is to maximize the "expected" reward when following a policy \\( \pi \\).
Like any Machine Learning setup, we define a set of parameters \\( \theta \\) (e.g. the coefficients of a complex
polynomial or the weights and biases of units in a neural network) to parametrize this policy - \\( \pi_\theta \\)
(also written as \\( \pi \\) for brevity). If we represent the total reward for a given trajectory \\( \tau \\) as
\\( r(\tau) \\), we arrive at the following definition.

> **Reinforcement Learning Objective**: Maximize the "expected" reward following a parametrized policy
> \\[ J(\theta) = \mathbb{E}_\pi\left[ r(\tau) \right] \\]

All finite MDPs have at least one optimal policy (which can give the maximum reward) and among all the optimal policies
at least one is stationary and deterministic.

Like any other Machine Learning problem, if we can find the parameters \\( \theta^\star \\) which maximize \\( J \\),
we will have solved the task. A standard approach to solving this maximization problem in Machine Learning Literature
is to use Gradient Ascent (or Descent). In gradient ascent, we keep stepping through the parameters using the following
update rule

<div>
\[ \theta_{t+1} = \theta_{t} + \alpha \nabla J (\theta_{t}) \]
</div>

Here comes the challenge, how do we find the gradient of the objective above which contains the expectation. Integrals
are always bad in a computational setting. We need to find a way around them. First step is to reformulate the gradient
starting with the expansion of expectation (with a slight abuse of notation).

<div>
\[\begin{aligned}
\nabla \mathbb{E}_\pi \left[ r(\tau) \right] &= \nabla \int \pi(\tau) r(\tau) d\tau \\
&= \int \nabla\pi(\tau) r(\tau) d\tau \\
&= \int \pi(\tau) \nabla \log \pi(\tau) r(\tau) d\tau \\
\nabla \mathbb{E}_\pi \left[ r(\tau) \right] &= \mathbb{E}_\pi \left[ r(\tau) \nabla \log \pi(\tau) \right]
\end{aligned}\]
</div>

> **The Policy Gradient Theorem**: The derivative of the expected reward is the expectation of the product of
> the reward and gradient of the \\( \log \\) of the policy \\( \pi\_\theta \\).
> \\[ \nabla \mathbb{E}\_{\pi\_\theta} \left[ r(\tau) \right] = \mathbb{E}\_{\pi\_\theta} \left[ r(\tau) \nabla \log \pi_\theta(\tau) \right] \\]

Now, let us expand the definition of \\( \pi\_\theta(\tau) \\)

\\[ \pi\_\theta(\tau) = \mathcal{P}(s\_0) \Pi\_{t=1}^T \pi\_\theta (a\_t | s\_t) p(s\_{t+1},r\_{t+1} | s\_t, a\_t) \\]

To understand this computation, let us break it down - \\( \mathcal{P} \\) represents the ergodic distribution of starting
in some state \\( s_0 \\). From then onwards, we apply the product rule of probability because each new action probability
is independent of the previous one (remember Markov?). At each step, we take some action using the policy \\( \pi\_\theta \\)
and the environment dynamics \\( p \\) decide which new state to transition into. Those are multiplied over \\( T \\)
timesteps representing the length of the trajectory. Equivalently, taking the \\( \log \\), we have

<div>
\[\begin{aligned}
\log \pi_\theta(\tau) &= \log \mathcal{P}(s_0) + \sum_{t=1}^T \log \pi_\theta (a_t | s_t) + \sum_{t=1}^T \log p(s_{t+1},r_{t+1} | s_t, a_t) \\
\nabla \log \pi_\theta(\tau) &= \sum_{t=1}^T \nabla \log \pi_\theta (a_t | s_t) \\
\implies \nabla \mathbb{E}_{\pi_\theta} \left[ r(\tau) \right] &= \mathbb{E}_{\pi_\theta} \left[ r(\tau) \left( \sum_{t=1}^T \nabla \log \pi_\theta (a_t | s_t) \right) \right]
\end{aligned}\]
</div>

This result is beautiful in its own right because this tells us, that we don't really need to know about the ergodic
distribution of states \\( \mathcal{P} \\) nor the environment dynamics \\( p \\). This is crucial because for most
practical purposes, it hard to model both these variables. Getting rid of them, is certainly good progress. As a result,
all algorithms that use this result are known as "*Model-Free Algorithms*" because we don't "model" the environment.

The "expectation" (or equivalently an integral term) still lingers around. A simple but effective approach is to
sample a large number of trajectories (I really mean LARGE!) and average them out. This is an approximation but an unbiased
one, similar to approximating an integral over continuous space with a discrete set of points in the domain. This technique
is formally known as Markov Chain Monte-Carlo (MCMC), widely used in Probabilistic Graphical Models and Bayesian Networks
to approximate parametric probability distributions.

One term that remains untouched in our treatment above is the reward of the trajectory \\( r(\tau) \\). Even though the
gradient of the parametrized policy does not depend on the reward, this term adds a lot of variance in the MCMC sampling.
Effectively, there are \\( T \\) sources of variance with each \\( R_t \\) contributing. However, we can instead make
use of the returns \\( G_t \\) because from the standpoint of optimizing the RL objective, rewards of the past don't
contribute anything. Hence, if we replace \\( r(\tau) \\) by the discounted return \\( G_t \\), we arrive at the classic
algorithm Policy Gradient algorithm called *REINFORCE*. This doesn't totally alleviate the problem as we discuss further.

## REINFORCE (and Baseline)

To reiterate, the REINFORCE algorithm computes the policy gradient as

> **REINFORCE** Gradient:
>
<div>
\[\begin{aligned}
\nabla \mathbb{E}_{\pi_\theta} \left[ r(\tau) \right] &= \mathbb{E}_{\pi_\theta} \left[ \left( \sum_{t=1}^T G_t \nabla \log \pi_\theta (a_t | s_t) \right) \right]
\end{aligned}\]
</div>

We still have not solved the problem of variance in the sampled trajectories. One way to realize the
problem is to reimagine the RL objetive defined above as *Likelihood Maximization* (Maximum Likelihood Estimate). In an
MLE setting, it is well known that data overwhelms the prior - in simpler words, no matter how bad initial estimates
are, in the limit of data, the model will converge to the true parameters. However, in a setting where the data samples
are of high variance, stabilizing the model parameters can be notoriously hard. In our context, any erratic trajectory
can cause a sub-optimal shift in the policy distribution. This problem is aggravated by the scale of rewards.

Consequently, we instead try to optimize for the difference in rewards by introducing another variable called baseline
\\( b \\). To keep the gradient estimate unbiased, the baseline independent of the policy parameters.

> **REINFORCE with Baseline**
>
<div>
\[\begin{aligned}
\nabla \mathbb{E}_{\pi_\theta} \left[ r(\tau) \right] &= \mathbb{E}_{\pi_\theta} \left[ \left( \sum_{t=1}^T (G_t - b) \nabla \log \pi_\theta (a_t | s_t) \right) \right]
\end{aligned}\]
</div>

To see why, we must show that the gradient remains unchanged with the additional term (with slight abuse of notation).

<div>
\[\begin{aligned}
\mathbb{E}_{\pi_\theta} \left[ \left( \sum_{t=1}^T b \nabla \log \pi_\theta (a_t | s_t) \right) \right] &= \int \sum_{t=1}^T \pi_\theta (a_t | s_t) b \nabla \log \pi_\theta (a_t | s_t) d\tau \\
&= \int \sum_{t=1}^T \nabla b \pi_\theta (a_t | s_t) d\tau \\
&= \int \nabla b \pi_\theta (\tau) d\tau \\
&= b \nabla \int \pi_\theta (\tau) d\tau \\
&= b \nabla 1 \\
\mathbb{E}_{\pi_\theta} \left[ \left( \sum_{t=1}^T b \nabla \log \pi_\theta (a_t | s_t) \right) \right] &= 0
\end{aligned}\]
</div>

Using a baseline, in both theory and practice reduces the variance while keeping the gradient still unbiased. A good
baseline would be to use the state-value current state.

> **State Value**: State Value is defined as the expected returns given a state following the policy \\( \pi_\theta \\).
> \\[ V(s) = \mathbb{E}\_{\pi\_\theta}[G\_t | S\_t = s] \\]

# Actor-Critic Methods

Finding a good baseline is another challenge in itself and computing it another. Instead, let us make approximate that
as well using parameters \\( \omega \\) to make \\( V^\omega(s) \\). All algorithms where we bootstrap the gradient
using learnable \\( V^\omega(s) \\) are known as *Actor-Critic* Algorithms because this value function estimate behaves
like a "*critic*" (good v/s bad values) to the "*actor*" (agent's policy). However this time, we have to compute gradients
of both the actor and the critic.

> **One-Step Bootstrapped Return**: A single step bootstrapped return takes the immediate reward and estimates the
> return by using a bootstrapped value-estimate of the next state in the trajectory.
> \\[ G\_t \simeq R\_{t+1} + \gamma V^\omega(S\_{t+1}) \\]

The Actor-Critic gradient is accordingly updated as

> **Actor-Critic** Policy Gradient
>
<div>
\[\begin{aligned}
\nabla \mathbb{E}_{\pi_\theta} \left[ r(\tau) \right] &= \mathbb{E}_{\pi_\theta} \left[ \left( \sum_{t=1}^T (R_{t+1} + \gamma V^\omega(S_{t+1}) - V^\omega(S_{t})) \nabla \log \pi_\theta (a_t | s_t) \right) \right]
\end{aligned}\]
</div>

It goes without being said that we also need to update the parameters \\( \omega \\) of the critic. The objective there
is generally taken to be the Mean Squared Loss (or a less harsh Huber Loss) and the parameters updated using Stochastic
Gradient Descent.

> **Critic's Objective**
>
<div>
\[\begin{aligned}
J(\omega) &= \frac{1}{2}\left(R_{t+1} + \gamma V^\omega(S_{t+1}) - V^\omega(S_{t})\right)^2 \\
\nabla J(\omega) &= R_{t+1} + \gamma V^\omega(S_{t+1}) - V^\omega(S_{t})
\end{aligned}\]
</div>

# Deterministic Policy Gradients

Often times, in robotics, a differentiable control policy is available but the actions are not stochastic. In such
environments, it is hard to build a stochastic policy as previously seen. One approach is to inject noise into the
controller. More over, with increasing dimensionality of the controller, the previously seen algorithms start performing
worse. Owing to such scenarios, instead of learning a large number of probability distributions, let us directly learn
a deterministic action for a given state. Hence, in its simplest form, a greedy maximization objective is what we need

> **Deterministic Actions**:
>
<div>
\[\begin{aligned}
\mu^{k+1}(s) = \underset{a}{argmax} Q^{\mu^k} (s, a)
\end{aligned}\]
</div>

However, for most practical purposes, this maximization operation is computationally infeasible (as there is no other
way than to search the entire space for a given action-value function). Instead, what we can aspire to do is, build a
function approximator to approximate this \\( argmax \\) and therefore called the *Deterministic Policy Gradient* (DPG).

We sum this up with the following equations.

> **DPG Objective**
>
<div>
\[\begin{aligned}
J(\theta) &= \mathbb{E}_{s \sim \rho^{\mu_\theta}} \left[ r(s, \mu_\theta(s)) \right]
\end{aligned}\]
</div>

> **Deterministic Policy Gradient**
>
>
<div>
\[\begin{aligned}
\nabla J(\theta) &= \mathbb{E}_{s \sim \rho^{\mu_\theta}} \left[ \nabla_\theta \mu_\theta(s) \nabla_a Q^{\mu_\theta}(s, a) \big|_{a = \mu_\theta(s)} \right]
\end{aligned}\]
</div>

It shouldn't be surprising enough anymore that this value turned out to another expectation which we can again estimate
using MCMC sampling.

# Generic Reinforcement Learning Framework

We can now arrive at a generic algorithm to see where all the pieces we've learned fit together. All new algorithms
are typically a variant of the algorithm given below, trying to attack one (or multiple steps of the problem).

```text
Loop:
    Collect trajectories (transitions - (state, action, reward, next state, terminated flag))
    (Optionally) store trajectories in a replay buffer for sampling
    Loop:
        Sample a mini batch of transitions
        Compute Policy Gradient
        (Optionally) Compute Critic Gradient
        Update parameters
```

# Code

For the readers familiar with Python, these code snippets are meant to be a more tangible representation of the above
theoretical ideas. These have been taken out of the learning loop of real code.

## Policy Gradients (Synchronous Actor-Critic)

{{< gist salmanazarr a173f6d6dd859e222b1728737b01d16d >}}

## Deep Deterministic Policy Gradients

{{< gist salmanazarr a01ee0f778e7bdd2dc7b1923da1dce67 >}}

## Complete Implementations

Completed Modular implementations of the full pipeline can be viewed at
[salmanazarr/torchrl](https://github.com/salmanazarr/torchrl).

# References

**[Sutton and Barto, 1998]** Sutton, R. S. and Barto, A. G. (1998). Introduction to Reinforcement Learning. MIT Press, Cambridge, MA, USA, 1st edition.

**[Dimitri, 2017]** Dimitri, P. B. (2017). DYNAMIC PROGRAMMING AND OPTIMAL CONTROL. Athena Scientiﬁc.

**[Lillicrap et al., 2015]** Lillicrap, T. P., Hunt, J. J., Pritzel, A., Heess, N., Erez, T., Tassa, Y., Silver, D., and Wierstra, D. (2015). Continuous control with deep reinforcement learning. ArXiv e-prints.

**[Watkins and Dayan, 1992]** Watkins, C. J. C. H. and Dayan, P. (1992). Q-learning. Machine Learning, 8(3):279–292.

**[Williams, 1992]** Williams, R. J. (1992). Simple statistical gradient-following algorithms for connectionist reinforcement learning. In Reinforcement Learning, pages 5–32. Springer.

**[Silver et al., 2014]** Silver, D., Lever, G., Heess, N., Degris, T., Wierstra, D., and Riedmiller, M. (2014). Deterministic policy gradient algorithms. In Xing, E. P. and Jebara, T., editors, Proceedings of the 31st International Conference on Machine Learning, volume 32 of Proceedings of Machine Learning Research, pages 387–395, Bejing, China. PMLR.
