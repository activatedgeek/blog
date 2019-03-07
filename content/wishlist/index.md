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
parallelizable. See references {{<cite bib="Rasmussen2004,Duvenaud2014,damianou2013deep">}}
for my readings.

### Kernels

Kernels can be applied to almost any kind of data and provide a notion of
"similarity". They are like the *grand-old-daddy* of feature representation (and
quite powerful at that). The famous Representer Theorem and its generalizations 
provide a powerful list of results, many of which I don't fully understand. See
references {{<cite bib="scholkopf2001learning">}} for my readings.


### MCMC Diagnostics

There's a comically truthful idea {{<footnote>}}This is the idea behind 
Importance Sampling{{</footnote>}}

> any sample can come from any distribution

How do we evaluate goodness-of-fit? How do we ascribe samples belong to a
particular distribution? These are very interesting and hard questions. See
reference {{<cite bib="brooks2011handbook">}} for my readings.

### Statistical Learning Theory

For this topic, I don't have a particularly defined scope. My primary qualm with
most treatment on this topic is the reliance on plenty of obscure sounding
inqualities (except for a few popular ones like *Markov's*, 
*Hoeffding's*, *Chebychev's*, *Azuma's*). Often times, I think this is more of 
an art of posing the question **what to put a bound on?** and then put out
some results in terms of a function of error tolerance $\epsilon$
and confidence $\delta$. I might have a myopic view on this and still looking
for big-picture treatment. See references 
{{<cite bib="mohri2018foundations,shalev2014understanding">}} for my readings.
I'm looking for a general attack recipe for such kind of bounds analysis.


# Questions

Most of these are gaps in my knowledge. Looking for resources and perspectives
to improve my understanding. I hope to summarize answers to these as blog posts.

* To my knowledge, there is no way to prove convergence in MCMC sampling
  algorithms. All we have are diagnostics like *Effective Sample Size* and
  *Gelman-Rubin Diagnostic* to show chains have diverged. What is the 
  recommended way to verify convergence?

* How do we scale Gaussian Processes to large data? Matrix computations involve
  operations of the order of \\( O(N^3) \\). Isn't this terribly slow?