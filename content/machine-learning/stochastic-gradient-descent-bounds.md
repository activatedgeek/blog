---
date: 2018-02-06T09:48:58-05:00
description: A summary of recent work on theoretical bounds for SGD
title: When Does Stochastic Gradient Algorithm Work Well?
categories:
  - machine learning
tags:
  - machine learning
  - algorithms
katex: true
og_image: https://i.imgur.com/GKP5Ubb.png
---

*Stochastic Gradient Descent* (SGD) has turned out to be a workhorse for most
gradient-based supervised learning algorithms today. But, why does that work? This post
presents an understanding from recent [1] theoretical results which gives insights
into the properties of this algorithm.

# Background

Formally, we define the general problem of stochastic optimization given a random
variable \\( \xi \\) as

\\[ \underset{\mathbf{w} \in \mathbb{R}^d}{min} F(\mathbf{w}) = \mathbb{E}[f(\mathbf{w},\xi)] \\]

In supervised learning, this framework is seen in the form of
*Empirical Risk Minimization* (ERM) where the aim is to search the d-dimensional
parameter space \\( w \in \mathbb{R}^d \\), so that we minimize the expected risk
(colloquially know as loss) over the given data. \\( \xi_i \\) is a single sample from
this data \\( (\mathbf{x}_i,\mathbf{y}_i) \in \mathcal{X} \times \mathcal{Y} \\).
Concisely, we write this in a finite sum form

\\[ \underset{\mathbf{w} \in \mathbb{R}^d}{min} F(\mathbf{w}) = \frac{1}{n} \sum_{i=1}^n f_i(\mathbf{w}) \\]

where \\( f_i(\mathbf{w}) = f(\mathbf{w}, \xi_i) \\). For instance, \\( f_i \\) could represent
the *Squared Loss* function. Having minimized the risk, we declare the system "learned".

From basic convex optimization theory, a closed form solution to a (strongly) convex minimization problem is to solve the
system of linear equations after equating the derivative to zero. In other cases an analytical solution might
not even be possible. It is well known that calculating the gradient over the complete sample becomes computationally
prohibitive when the number of samples \\( n \\) become very large (which is typically the case). Therefore,
we approximate the gradient step by considering a small batch of the samples (sometimes just one) which is what
the core of SGD contains. It is easy to show that this is an *unbiased estimator* of the true gradient,
i.e \\( \mathbb{E}[\nabla f_i(\mathbf{w})] = \nabla F(\mathbf{w}) \\). The canonical form of the parameter update
is then written as

\\[ \mathbf{w}_{t+1} = \mathbf{w}_t - \eta_t \nabla F(\mathbf{w}_t) \\]

which can be intuitively seen as a step in the opposite direction of steepest ascent (and hence the name gradient
descent). \\( \eta_t \\) represents the step size in that direction. Make it too small, SGD will take a long
time to converge to the solution. Make it too large, SGD will most likely never find a solution. \\( \eta_t \\)
is typically a constant value with respect to time steps in vanilla SGD.

{{< figure class="figure" src="//i.imgur.com/GKP5Ubb.png" title="Contour Plots for SGD Path. Left: Low Variance; Right: High Variance" >}}

It has been observed that when the components of \\( f_i \\) are far from the optimal solution, SGD wanders
erratically around the optimum causing high variance in the descent path (see graph on the right above).
Variance reduction techniques like *RMSProp* and *Adam* provide faster and smoother path to convergence
by varying \\( \eta_t \\) with the time steps (see graph on the left above).

# Result Summary

Now that we have setup a quick background to realize the problem this work is trying to solve,
here is the crux of the proposed results.

> We can achieve fast convergence rates using Stochastic Gradient Descent for both convex and non-convex
> cases, until some accuracy is reached. This can be done with a reasonably large fixed step size without
> using variance reduction techniques.

This claim is interesting because it is a step towards the theoretical understanding of why SGD
behaves the way it does.

# Convergence Results

One way to understand the behavior of SGD algorithm is to bind the expected value (over samples from the
population) of the difference of objective values at the end of \\( t^{th} \\) epoch. In Learning Theory
literature, we derive such "concentration bounds" so as to explain how the empirical estimates "concentrate"
around the true estimate. Quite understandably, we want the RHS of these inequalities to be as small as
possible for a good generalization behavior.

The main result from the work in [1] for convex objectives is paraphrased below

> Suppose that \\( f(\mathbf{w}; \xi) \\) is L-smooth and convex for every realization of \\( \xi \\).
> With \\( \eta_t = \eta < \frac{1}{L} \\), for any \\( \epsilon > 0 \\) we have
> \\[ \mathbb{E}[F(\mathbf{w}_t) - F(\mathbf{w}\_\star)] \leq \frac{||\mathbf{w}\_0 - \mathbf{w}\_\star ||^2}{2\eta(1 - \eta L)t} + \frac{\eta}{1-\eta L} p\_{\epsilon}\epsilon + \frac{\eta M\_{\epsilon}}{1-\eta L} (1 - p\_{\epsilon}) \\]
> where \\( \mathbf{w}\_\star \\) is any optimal solution of \\( F(\mathbf{w}) \\),
> \\( \mathbf{w}_0 \\) is the initial solution,
> \\( p\_\epsilon = P(|| g\_\star ||^2 \leq \epsilon) \\),
> \\( M\_\epsilon = \mathbb{E}[|| g || \big| || g || > \epsilon ] \\) and
> \\( g\_\star = \frac{1}{b} \sum\_{i=1}^b \nabla f(\mathbf{w}\_\star; \xi\_i) \\).

where L-smoothness is defined as

> A function \\( \phi \\) is \\( L \\)-Smooth if there exists a constant \\( L \\) such that
> \\[ || \nabla \phi(\mathbf{w}) - \nabla \phi(\mathbf{w}^\prime) || \leq L || \mathbf{w} - \mathbf{w}^\prime || \text{   } \forall \mathbf{w}, \mathbf{w}^\prime \in \mathbb{R}^d \\]

This result is quite dense with information. A few key definitions are important to understand this.

From calculus, we know that the gradient vanishes at a stationary point but since we are now approximating
gradients, we can only analyze how well it "concentrates" around the true optimum. In light of this, the
quantity \\( p_\epsilon \\)  represents the probability of the gradient norm being less than a small positive
value \\( \epsilon \\). \\( M\_\epsilon \\) represents the average bound for large gradients. Quite understandably, we
also see that the initial solution \\( \mathbf{w}_0 \\) also affects the viability of this bound.

It should be observed that as \\( \epsilon \\) decreases, \\( 1 - p_\epsilon \\) increases. Owing to this
dynamic, if we hover around the region where \\( \epsilon \approx 1 - p\_\epsilon \\), then SGD uniformly converges
in the neighborhood of \\( \mathcal{O}(\epsilon) \\) which is a tighter bound than previous results [2,3].

The result shown above shows dependence on the initial solution, \\( p\_\epsilon \\) and \\( M\_\epsilon \\).
If we now restrict \\( 1 - p\_\epsilon \leq \epsilon \\) and \\( \eta \leq \frac{1}{2L} \\)
(only for notational simplication), we get the following bound

> \\[ \mathbb{E}[F(\mathbf{w}_t) - F(\mathbf{w}\_\star)] \leq \frac{||\mathbf{w}\_0 - \mathbf{w}\_\star ||^2}{\eta t} + 2\eta (1 + M\_\epsilon) \epsilon \\]
> and for \\( t \geq T = \frac{||\mathbf{w}\_0 - \mathbf{w}\_\star ||^2}{2 \eta^2 (1 + M\_\epsilon) \epsilon} \\),
> \\[ \mathbb{E}[F(\mathbf{w}_t) - F(\mathbf{w}\_\star)] \leq 4 \eta (1 + M\_\epsilon) \epsilon \\]

Hence, under the key assumptions stated above and bounding \\( M\_\epsilon \leq M\_{max} \\), we achieve the
\\( \mathcal{O}(\epsilon) \\) optimality gap. This bound tells us that with sufficient time steps, the vanilla
SGD algorithm can uniformly converge to the true optimum within a given accuracy estimate \\( \epsilon \\). This
is indeed contingent on the probability that the stochastic gradients have a norm below \\( \epsilon \\) at the
solution. Increasing the batch size, we can expect \\( 1 - p\_\epsilon \leq \epsilon \\)
to hold for small values of \\( \epsilon \\) making the bounds even better. In the limit of arbitrarily small
\\( \epsilon \\) we basically recover the gradient.

A similar analysis for non-convex objectives is also presented in [1]. Empirical results reported in the
work show that SGD tends to be faster than other techniques like SVRG and L-BFGS which is quite
fascinating. It should also be noted there that the specific form of the objective function doesn't matter
as long as it satisfies the smoothness property.

# Conclusion

One could point out that most objectives that we encounter in Neural Networks generally tend to be non-convex.
How could the analysis of convex objectives even be of importance? The motivation lies in the fact that stationary
points will fall in a "locally" convex neighborhood. A convex analysis above would be a great help in analyzing and
understanding the properties of SGD in such neighborhoods. Removing this local constraint can only make things better.

However, one must be wary of such theoretical bounds. They are only meant to be indicative of behavior in practice.
These bounds act as a tool for investigation of properties or in others as a tool for the invention of
new algorithms. The calculation of the terms in concentration bounds is helpful to provide empirical evidence of
an overall trend. However, for most situations, searching for exact values is a fruitless endeavor and the bounds
are only meant to nudge us in the right conceptual direction.

# References

[[1]](https://arxiv.org/abs/1801.06159) Nguyen, Lam M., et al. "When Does Stochastic Gradient Algorithm Work Well?." arXiv preprint arXiv:1801.06159 (2018).

[[2]](https://papers.nips.cc/paper/3323-the-tradeoffs-of-large-scale-learning.pdf) Bousquet, Olivier, and Léon Bottou. "The tradeoffs of large scale learning." Advances in neural information processing systems. 2008.

[[3]](https://arxiv.org/abs/1606.04838) Bottou, Léon, Frank E. Curtis, and Jorge Nocedal. "Optimization methods for large-scale machine learning." arXiv preprint arXiv:1606.04838 (2016).
