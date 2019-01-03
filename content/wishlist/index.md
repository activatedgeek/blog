+++
title = "Learning Wishlist"
disableByline = true
listrender = false

[distill]
  [distill.supportFiles]
  bibliography = "refs.bib"
+++

I've decided to maintain a wishlist of things I'd like to work on whenever my
interest peaks. Clearly, this is a weakly organized scratchpad.

# Theory

These are works that I've only glossed over and never delved deeper. Sometime
in the future, I'd like to understand them better.

### Gaussian Processes

GP priors are unusually interesting. They lead to smooth interpolators with 
uncertainty estimates. Some parts of the inference are *embarrasingly*
parallelizable. See references<d-cite key="Rasmussen2004,Duvenaud2014,damianou2013deep"></d-cite>
for my readings.

### Kernels

Kernels can be applied to almost any kind of data and provide a notion of
"similarity". The famous Representer Theorem and its generalizations provide a
powerful result many of which I don't fully understand. See references <d-cite key="scholkopf2001learning"></d-cite> for my
readings.


# Questions

Most of these are gaps in my knowledge. Looking for resources and perspectives
to improve my understanding. I hope to summarize answers to this as blog posts.

* To my knowledge, there is no way to prove convergence in MCMC sampling
  algorithms. All we have are diagnostics like *Effective Sample Size* and
  *Gelman-Rubin Diagnostic* to show chains have diverged. What is the 
  recommended way to verify convergence?

* How do we scale Gaussian Processes to large data? Matrix computations involve
  operations of the order of \\( O(N^3) \\). Isn't this terribly slow?