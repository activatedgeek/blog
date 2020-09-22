---
title: Bayesian Machine Learning
description: A resourceful document for entrypoints into Bayesian inference
date: Sep 17 2020, 09:40 +0530
area: math
cat: ml
draft: true
---

I want this to be a helpful resource for newcomers to the field of _Bayesian_
machine learning. The objective here is to collect relevant literature
that brings insights into modern inference methods. Of course, this requires me
to extract insights myself to be sure that the papers I put on are
meaningful. Therefore, this post remains a living document. I'm inspired by 
[Yingzhen Li](http://yingzhenli.net/home/en/)'s resourceful 
document, [_Topics in Approximate Inference_](http://yingzhenli.net/home/pdf/topics_approx_infer.pdf) (2017).

## Big Picture Views

When diving deep into a topic, we often find ourselves too close to the action.
It is important to start with and keep the bigger picture in mind. I recommend
the following to get a feel for the fundamental thesis around _Bayesian_.

- Bishop's Chapter 1 \cite{bishop2006pattern}
- DM's PhD Thesis, Chapter 2 \cite{MacKay92bayesianmethods}
- AGW's PhD Thesis, Chapter 1 \cite{wilson2014thesis}

### Pathologies

I die a little when people compare Bayesian methods to simply regularlizing
with the prior. That is an interpretation, although incomplete. For instance,
take a look at this fun post by Dan Simpson, [_The king must die_](https://statmodeling.stat.columbia.edu/2017/11/02/king-must-die/) on why simply
assuming a Laplace prior does not induce sparsity unlike its _maximum a-posteriori_ variant.

## References

```bib
@phdthesis{MacKay92bayesianmethods,
    author = {MacKay, David J. C.},
    title = {Bayesian Methods for Adaptive Models},
    year = {1992},
    url = {http://www.inference.org.uk/mackay/PhD.html}
}
@phdthesis{wilson2014thesis,
  title={Covariance kernels for fast automatic pattern discovery and extrapolation with Gaussian processes},
  author={Wilson, Andrew Gordon},
  year={2014},
  school={University of Cambridge},
  url={http://www.cs.cmu.edu/%7Eandrewgw/andrewgwthesis.pdf}
}
@book{bishop2006pattern,
  title={Pattern recognition and machine learning},
  author={Bishop, Christopher M},
  year={2006},
  publisher={springer}
}
```