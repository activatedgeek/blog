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
for my readings. The background section of *Exact GPs on a Million Points*
{{<cite bib="2019arXiv190308114W">}} is also full of great references.

### Kernels

Kernels can be applied to almost any kind of data and provide a notion of
"similarity". They are like the *grand-old-daddy* of feature representation (and
quite powerful at that). The famous Representer Theorem and its generalizations 
provide a powerful list of results, many of which I don't fully understand. See
references {{<cite bib="scholkopf2001learning">}} for my readings.

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


# Technical

Most of these are gaps in my knowledge. Looking for resources and perspectives
to improve my understanding. I hope to summarize answers to these as blog posts.

* To my knowledge, there is no way to prove convergence in MCMC sampling
  algorithms. All we have are diagnostics like *Effective Sample Size* and
  *Gelman-Rubin Diagnostic* to show chains have diverged. What is the 
  recommended way to verify convergence?

* How do we scale Gaussian Processes to large data? Matrix computations involve
  operations of the order of \\( O(N^3) \\). Isn't this terribly slow?

# Philosophical

* "Deep" Neural Networks are in principle really shallow learners (or at least in the way used so far)?
  How do we go from integrating isolated expert components for tasks like vision, language and planning
  to a unified module? What would be the objective we optimize? Are we just lacking in
  multi-modal datasets and current methods can take us further without major breakthroughs?

* Humans understanding from multi-modal data - we see, touch, hear, smell, taste.
  What are the right questions to start making incremental improvements in leveraging
  multi-modal data? Is it just one big feature vector?

* How do we embed concepts? How do we devise a calculus of concepts? Is learning over knowledge graphs
  the path to singularity (if that exists)?

* Humans are clearly not the benchmark of general intelligence (however broad scoped
  that term may be). Humans are just beings specialized in narrow skills. Do we really
  need "*one system to rule them all*"?
