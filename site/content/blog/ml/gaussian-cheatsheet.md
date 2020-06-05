---
title: The Gaussian Cheatsheet
date: 2020-04-22T12:30:00-7:00
tags:
  - ML
  - probs
---

This is a collection of key derivations involving Gaussian distributions
which commonly arise almost everywhere in Machine Learning.

## Normalizing Constant

A Gaussian distribution with mean $\mu$ and variance $\sigma^2$ is given by

$$
p(x) \propto \exp\left\{ - \frac{(x - \mu)^2}{2\sigma^2} \right\}
$$

To derive the normalizing constant for this density, consider the following integral

$$
\text{I} = \int_{-\infty}^{\infty} \exp\left\{ - \frac{(x - \mu)^2}{2\sigma^2} \right\} dx
$$

$$
\text{I}^2 = \int_{-\infty}^{\infty} \exp\left\{ - \frac{(x - \mu)^2}{2\sigma^2} \right\} \exp\left\{ - \frac{(y - \mu)^2}{2\sigma^2} \right\} dx dy
$$

First using change of variables $u = x - \mu$ and $v = y - \mu$, we have

$$
\text{I}^2 = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} \exp\left\{ - \frac{u^2 + v^2}{2\sigma^2} \right\} du dv
$$

Transforming to polar coordinates $u = r \cos{\theta}$ and $v = r\sin{\theta}$
using the standard change of variables, we require the Jacobian determinant $\Big| \frac{\partial (u,v)}{\partial (r, \theta)} \Big|$

$$
\Big| \begin{bmatrix} \cos{\theta} & -r\sin{\theta} \\ \sin{\theta} & r\cos{\theta} \end{bmatrix} \Big| = r
$$

$$
\text{I}^2 = \int_{0}^{2\pi} \int_{0}^{\infty} \exp\left\{ - \frac{r^2}{2\sigma^2} \right\} r dr d\theta = 2\pi \int_{0}^{\infty} \exp\left\{ - \frac{r^2}{2\sigma^2} \right\} r dr
$$

Solving this final integral requires another change of variable. Let $z = \frac{r^2}{2\sigma^2}$,
hence $\sigma^2 dz = r dr$.

$$
\text{I}^2 = 2 \pi \sigma^2 \int_{0}^{\infty} e^{-z} dz = 2 \pi \sigma^2 \left[ -e^{-z} \right]_{0}^{\infty} = 2\pi\sigma^2
$$

This implies $\text{I} = (2\pi\sigma^2)^{1/2}$ and hence the complete distribution is now written as

$$
p(x) = \frac{1}{(2\pi\sigma^2)^{1/2}} \exp\left\{ - \frac{(x - \mu)^2}{2\sigma^2} \right\}
$$

## As a Maximum Entropy Distribution

Interestingly, the Gaussian distribution also turns out to be the maximum entropy
distribution on the infinite support for a finite second moment \cite{bishop2006pattern}.
The differential entropy is defined as the expected information
$\mathbb{H}[x] = -\int_{-\infty}^{\infty} p(x) \log{p(x)} dx$ of a random variable $x \sim p(x)$.

To find the maximum entropy distribution, we formally write the constrained optimization
problem stated before

$$
\begin{aligned}
\text{max}& -\int_{-\infty}^{\infty} p(x) \log{p(x)} dx \\
\text{s.t.}& \int_{-\infty}^{\infty} p(x) dx = 1 \\
&\int_{-\infty}^{\infty} x p(x) dx = \mu \\
&\int_{-\infty}^{\infty} (x - \mu)^2 p(x) dx = \sigma^2
\end{aligned}
$$

The constraints correspond to the normalization of probability distributions,
finite mean (first moment) and finite variance (finite second moment). This
can be converted into an unconstrained optimization problem using Lagrange multipliers \cite{boyd2004convex}.
The complete objective becomes

$$
-\int_{-\infty}^{\infty} p(x) \log{p(x)} dx +
$$

$$
\lambda_1 \left( \int_{-\infty}^{\infty} p(x) dx - 1 \right) + \lambda_2 \left( \int_{-\infty}^{\infty} x p(x) dx - \mu \right) + \lambda_3 \left( \int_{-\infty}^{\infty} (x - \mu)^2 p(x) dx - \sigma^2 \right)
$$

Setting the functional derivative [^1] $\frac{d [f(p(x))] }{d p(x)} = 0$, we get

$$
-\log{p(x)} + 1 + \lambda_1 + \lambda_2 x + \lambda_3 (x - \mu)^2 = 0
$$

$$
p(x) = \exp{ \left\{ 1 + \lambda_1 + \lambda_2 x + \lambda_3 (x - \mu)^2 \right\} }
$$

To recover the precise values of the Lagrange multipliers, we substitute them back
into the constraints. The derivation is involved but straightforward. We first manipulate the exponent by
completing the squares [^2] which will allow us to re-use results from the [previous section](#normalizing-constant). We also further always make use of the subsitution $x^\prime = x - \frac{\beta}{2\alpha}$.

$$
1 + \lambda_1 + \lambda_2 x + \lambda_3 (x - \mu)^2 = \underbrace{\lambda_3}_{=\alpha} x^2 - \underbrace{(2\mu\lambda_3 - \lambda_2)}_{=\beta} x + \underbrace{(1 + \lambda_1 + \lambda_3 \mu^2)}_{=\gamma}
$$

$$
p(x) = \exp{ \left\{ \alpha\left(x - \frac{\beta}{2\alpha} \right)^2  \right\} }\exp{ \left\{ -\underbrace{\frac{1}{2}\frac{\beta^2 - 4\alpha \gamma}{2\alpha}}_{= \delta}  \right\} }
$$

Putting back these new definitions the normalization constraint is,

$$
\int_{-\infty}^{\infty} \exp{ \left\{ \alpha \left( x^\prime \right)^2 \right\} } dx^\prime = \exp{ \left\{ \delta \right\} }
$$

Using another change of variable $y = \sqrt{-\alpha}x^\prime$, we reduce this integral to a familiar form and can evaluate using the polar coordinate transformation trick as earlier.

$$
\begin{aligned}
\frac{1}{\sqrt{-\alpha}} \int_{-\infty}^{\infty} \exp{ \left\{ -y^2 \right\} }dy &= \exp{\left\{ \delta \right\}} \\
\implies\exp{ \left\{ \delta \right\} } &= \sqrt{\frac{\pi}{-\alpha}} \tag{1}
\end{aligned}
$$

Similarly, we put this into the finite first moment constraint and re-apply
the substitution $y = \sqrt{-\alpha}x^\prime$. The first term is an integral
of an odd function over the full domain and is nullified.

$$
\begin{aligned}
\int_{-\infty}^{\infty} (x^\prime + \frac{\beta}{2\alpha}) \exp{\left\{ \alpha (x^\prime)^2 \right\}} dx^\prime &= \cancel{\int_{-\infty}^{\infty} x^\prime \exp{\left\{ \alpha (x^\prime)^2 \right\}} dx^\prime} + \frac{\beta}{2\alpha} \int_{-\infty}^{\infty} \exp{\left\{ \alpha (x^\prime)^2 \right\}} \\
&= \mu\exp{\left\{\delta\right\}} \\
\implies\exp{\left\{ \delta \right\}} &= \frac{\beta}{2\mu\alpha} \sqrt{\frac{\pi}{-\alpha}} \tag{2}
\end{aligned}
$$

Combining (1) with (2), we get $\beta = 2\mu\alpha$. Substituting $\alpha$ and $\beta$
as defined earlier, we get

$$
\lambda_2 = 0
$$

With similar approaches and substitutions, we substitute values in the integral for finite
second moment constraint.

$$
\begin{aligned}
\int_{-\infty}^{\infty} \left(x^\prime + \cancel{\frac{\beta}{2\alpha}} - \cancel{\mu} \right)^2 \exp{ \left\{ \alpha \left( x^\prime \right)^2 \right\} } dx^\prime &= \sigma^2 \exp{ \left\{ \delta \right\} }
\end{aligned}
$$

Focusing on the remaining term, we first apply the change of variable $y = \sqrt{-\alpha}x^\prime$ and note
that this is an even function. This allows us to use the next change of variables.

$$
\int_{-\infty}^{\infty} (x^\prime)^2 \exp{ \left\{ \alpha \left( x^\prime \right)^2 \right\} } dx^\prime = \frac{1}{(-\alpha)^{3/2}} \int_{-\infty}^{\infty} y^2 \exp{ \left\{ -y^2 \right\} } dy
$$

To allow a change of variable further, we first note that this is an even function and symmetric around $0$.
Using this knowledge, we can change the limits of integration to positive values and use $y^2 = z$

$$
\begin{aligned}
\frac{2}{(-\alpha)^{3/2}} \int_{0}^{\infty} y^2 \exp{ \left\{ -y^2 \right\} } dy &= \frac{1}{(-\alpha)^{3/2}} \int_{0}^{\infty} z^{1/2} \exp{ \left\{ -z \right\} } dz \\
&= \frac{\Gamma(3/2)}{(-\alpha)^{3/2}} = \frac{1}{2}\sqrt{\frac{\pi}{-\alpha^3}}
\end{aligned}
$$

where we utilize the fact that $\Gamma(x + 1) = x\Gamma(x)$ [^3] and $\Gamma(1/2) = \sqrt{\pi}$. Plugging
everything back and using $\beta = 2\mu\alpha$, we get

$$
\begin{aligned}
\frac{1}{2}\sqrt{\frac{\pi}{-\alpha^3}} &= \sigma^2 \exp{\delta} \\
\frac{1}{2}\sqrt{\frac{\pi}{-\alpha^3}} &= \sigma^2 \sqrt{\frac{\pi}{-\alpha}} \\
-\frac{1}{2\alpha} &= \sigma^2
\end{aligned}
$$

Using this, we get

$$
\lambda_3 = - \frac{1}{2\sigma^2}
$$

Substituting back in (1), we have

$$
\begin{aligned}
\exp{ \left\{ \frac{4\mu^2\alpha^2 - 4\alpha\gamma}{4\alpha} \right\} } &= \sqrt{\frac{\pi}{-\alpha}} \\
\exp{ \left\{ \mu^2\lambda_3 - 1 - \lambda_1 - \lambda_3\mu^2 \right\} } &= \sqrt{2\pi\sigma^2} \\
\lambda_1 = -1 - \frac{1}{2}\log{2\pi\sigma^2}
\end{aligned}
$$

Substituting $\lambda_1,\lambda_2,\lambda_3$ back into $p(x)$ gives us the form for $p(x) = \mathcal{N}(\mu, \sigma^2)$ [^4].

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
```

## Footnotes

[^1]: See Appendix D in \cite{bishop2006pattern}
[^2]: We note that for any general quadratic $\alpha x^2 - \beta x + \gamma = \alpha \left(x - \frac{\beta}{2\alpha} \right)^2 - \frac{1}{2} \frac{\beta^2 - 4\alpha \gamma}{2\alpha}$
[^3]: $\Gamma(x) = \int_{0}^{\infty} u^{x-1} e^{-u}du$ is the Gamma function.
[^4]: For maximum entropy distributions under other constraints, see examples on [this](https://en.wikipedia.org/wiki/Maximum_entropy_probability_distribution#Other_examples) Wikipedia entry.
