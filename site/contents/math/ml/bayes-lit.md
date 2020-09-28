---
title: Topics in Bayesian Machine Learning
description: A resourceful document for entrypoints into Bayesian inference.
date: Sep 17 2020, 09:40 +0530
updated: Sep 26 2020, 13:27 +0530
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

I will post commentary, when I can, in terms of what to expect when reading the
material. Often, however, I will only put materials in list to be considered
as the recommended reading order. A recommendation for the overall sequence
in which topics should be considered is harder to be prescribed. I do,
however, suggest that this not be your first excursion into machine learning.

## Big Picture Views

When diving deep into a topic, we often find ourselves too close to the action.
It is important to start with and keep the bigger picture in mind. I recommend
the following to get a feel for the fundamental thesis around being _Bayesian_.
It is not a silver bullet but a set of common-sense principles to abide by.

- In my introductory article, [_The Beauty of Bayesian Learning_](/kb/the-beauty-of-bayesian-learning), I describe the essence of Bayesian learning using a simple pattern guessing demo.
- PRML Chapter 1 \cite{bishop2006pattern} is the place to start for a succinct
treatment on the topic.
- The ideas can be further reinforced through DJCM's PhD Thesis, Chapter 2 \cite{MacKay92bayesianmethods}.
- AGW's PhD Thesis Chapter 1 \cite{wilson2014thesis} provides a broader background on the big picture.

Many people, including seasonsed researchers, have the wrong idea of what it
means to be Bayesian. Putting prior assumptions _does not_ make one a Bayesian.
In that sense, everyone is a Bayesian because they build algorithms starting
with some implicit priors (not statistical biases). I die a little
when people compare Bayesian methods to simply regularlizing with the prior.
That is an effect often misconstrued. For instance, take a look at this fun post
by Dan Simpson, "[The king must die](https://statmodeling.stat.columbia.edu/2017/11/02/king-must-die/)"
on why simply assuming a Laplace prior does not imply sparse solutions unlike
its popular _maximum a-posteriori_ variant known as the Lasso.

Less so now, but often arguments around the subjectivity of the prior is brought
into question. This is unfortunately a misdirected argument because without
subjectivity, "learning" cannot happen and is in general an ill-defined problem
to tackle. Although, subjective priors is not the only thing that being Bayesian
brings to the table.

## Topics

### Gaussian Processes

Gaussian Process (GP) research interestingly started as a consequence of the
popularity and early success of neural networks.

- DJCM's Introduction, Sections 1-6 \cite{mackay1998introduction} to understand where GPs comes from. A single reading before the next should help calibrate the mindset. I also recommend returning to this once more after the next reading.
- GPML Chapter 1, 2, 3 \cite{williams2006gaussian} for a detailed treatment on the usual regression and classification problems.

#### Covariance Functions

Covariance functions are the way we describe our inductive biases in a Gaussian
Process model and hence deserve a separate section altogether.

- GPML Chapter 4 \cite{williams2006gaussian} provides a broad discussion around where covariance functions
come from.
- DD's PhD Thesis Chapter 2 \cite{duvenaud2014automatic} contains some basic advice and intuitions. This is more succinctly available as [The Kernel Cookbok](https://www.cs.toronto.edu/~duvenaud/cookbook/).


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
@article{mackay1998introduction,
  title={Introduction to Gaussian processes},
  author={MacKay, David JC},
  journal={NATO ASI Series F Computer and Systems Sciences},
  volume={168},
  pages={133--166},
  year={1998},
  publisher={Citeseer},
  url={http://www.inference.org.uk/mackay/gpB.pdf}
}
@book{williams2006gaussian,
  title={Gaussian processes for machine learning},
  author={Williams, Christopher KI and Rasmussen, Carl Edward},
  volume={2},
  number={3},
  year={2006},
  publisher={MIT press Cambridge, MA},
  url={http://www.gaussianprocess.org/gpml/}
}
@phdthesis{duvenaud2014automatic,
  title={Automatic model construction with Gaussian processes},
  author={Duvenaud, David},
  year={2014},
  school={University of Cambridge},
  url={https://www.cs.toronto.edu/~duvenaud/thesis.pdf}
}
```