---
title: Topics in Bayesian Machine Learning
description: A resourceful document for entrypoints into Bayesian inference.
date: Sep 17 2020, 09:40 +0530
updated: Nov 6 2020, 18:39 +0530
area: math
cat: ml
---

I want this to be a helpful resource for newcomers to the field of _Bayesian_
machine learning. The objective here is to collect relevant literature
that brings insights into modern inference methods. Of course, this requires me
to extract insights myself to be sure that the papers I put on are
meaningful. Therefore, this post remains a living document.

I will post commentary, when I can, in terms of what to expect when reading the
material. Often, however, I will only put materials in list to be considered
as the recommended reading order. A recommendation for the overall sequence
in which topics should be considered is harder to be prescribed. I do,
however, suggest that this not be your first excursion into machine learning.

## The Big Picture

When diving deep into a topic, we often find ourselves too close to the action.
It is important to start with and keep the bigger picture in mind. I recommend
the following to get a feel for the fundamental thesis around being _Bayesian_.
It is not a silver bullet but a set of common-sense principles to abide by.

- In my introductory article, [_The Beauty of Bayesian Learning_](/kb/the-beauty-of-bayesian-learning), I describe the essence of Bayesian learning using a simple pattern guessing demo.
- PRML Chapter 1 \cite{bishop2006pattern} is the place to start for a succinct
treatment on the topic.
- The ideas can be further reinforced through DJCM's PhD Thesis, Chapter 2 \cite{MacKay92bayesianmethods}.
- AGW's PhD Thesis Chapter 1 \cite{wilson2014thesis} provides a broader background on the big picture.

Less so now, but often arguments around the subjectivity of the prior is brought
into question. This is unfortunately a misdirected argument because without
subjectivity, "learning" cannot happen and is in general an ill-defined problem
to tackle. Although, subjective priors is not the only thing that being Bayesian
brings to the table.

Many people, including seasonsed researchers, have the wrong idea of what it
means to be Bayesian. Putting prior assumptions _does not_ make one a Bayesian.
In that sense, everyone is a Bayesian because they build algorithms starting
with priors, whether they know it or not. I die a little when people compare
Bayesian methods to simply regularlizing with the prior. That is an effect often
misconstrued. For instance, take a look at this fun post by Dan Simpson, 
"[The king must die](https://statmodeling.stat.columbia.edu/2017/11/02/king-must-die/)"
on why simply assuming a Laplace prior does not imply sparse solutions unlike
its popular _maximum a-posteriori_ variant known as the Lasso.

When explaining the data using a model, we usually have many competing
hypothesis available, naturally leading to the _model selection_ problem.
_Occam's razor_ principle advocates that we must choose the simplest possible 
explanation. Bayesian inference shines here as well by automatically embodying
this "principle of parsimony".

- ITILA Chapter 28 \cite{mackay2003information} describes how Bayesian inference handles "automatic Occam's razor" quantitatively.
- Seeing the ever increasing complexity of neural network models, one may doubt the
  validity of Occam's razor, perhaps sensing a contradiction. Rasmussen & Ghahramani \cite{rasmussen2001occam} resolve this through a simple experiment. Maddox & Benton et. al. \cite{maddox2020parameter} provide an excellent realization of this principle for large models.

_Bayesian model averaging_ (BMA) is another perk enjoyed by Bayesians, which
allows for _soft model selection_. Andrew G. Wilson
clarifies the value it adds in a technical report titled [The Case for Bayesian Deep Learning](https://cims.nyu.edu/~andrewgw/caseforbdl/). Unfortunately, BMA is often misconstrued as
model combination. Minka \cite{minka2000bayesian} dispells any misunderstandings
in this regard.

The _Frequentist-vs-Bayesian_ debate has unfortunately occupied more minds than
it should have. Any new entrant to the field will undoubtably still come across
this debate and be forced to take a stand (make sure you don't fall for the trap).
I highly recommend this talk by a dominant figure in the field, _Michael Jordan_,
titled _Bayesian or Frequentist, Which Are You?_ ([Part I](https://www.youtube.com/watch?v=HUAE26lNDuE), [Part II](https://www.youtube.com/watch?v=7sNgO7wQgaQ)).

I would refrain from labelling anyone or any algorithm as an exclusive Bayesian.
In one is still hell-bent on being labeled, remember keeping an open mind is
the hallmark of a true Bayesian.

## Topics

### Gaussian Processes

Gaussian Process (GP) research interestingly started as a consequence of the
popularity and early success of neural networks.

- DJCM's Introduction, Sections 1-6 \cite{mackay1998introduction} to understand where GPs comes from. A single reading before the next should help calibrate the mindset. I also recommend returning to this once more after the next reading.
- GPML Chapter 1, 2, 3 \cite{williams2006gaussian} for a detailed treatment on the usual regression and classification problems.
- LWK Chapter 1 \cite{scholkopf2018learning} is worth a read for a big picture view of kernel machines. It does not, however, present a Bayesian perspective, but an optimization perspective. Nevertheless, it is a useful perspective.
- GPML Chapter 5 \cite{williams2006gaussian} to understand how model selection
behaves with GPs, and key caveats to look out for, especially regarding Bayesian Model Averaging. It also has a nice example of a non-trivial composite kernel.

#### Sparse Gaussian Processes

The non-parametric nature is slightly at odds with scalability of Gaussian
Processes, but we've made some considerable progress through first principles
in this regard as well.

#### Covariance Functions

Covariance functions are the way we describe our inductive biases in a Gaussian
Process model and hence deserve a separate section altogether.

- GPML Chapter 4 \cite{williams2006gaussian} provides a broad discussion around where covariance functions
come from.
- DD's PhD Thesis Chapter 2 \cite{duvenaud2014automatic} contains some basic advice and intuitions. This is more succinctly available as [The Kernel Cookbok](https://www.cs.toronto.edu/~duvenaud/cookbook/).

### Monte Carlo algorithms

Monte Carlo algorithms are used for exact inference in scenarios when
closed-form inference is not possible.

- PRML Chapter 11.1 \cite{bishop2006pattern}

#### Markov Chain Monte Carlo

The simple Monte Carlo algorithms rely on _independent_ samples from a target distribution to be useful. Relaxing the independence assumption leads to
correlated samples via Markov Chain Monte Carlo (MCMC) family of algorithms.

- IM's PhD Thesis, Chapter 1,2 \cite{murray2007advances} is arguably the best introduction to the topic.
- PRML Chapter 11.2 \cite{bishop2006pattern}

### Variational Inference

#### Pathologies

Bishop Chapter 10 \cite{bishop2006pattern} shows the zero-forcing behavior of the KL term involved
in variational inference, as a result underestimating the uncertainty when
unimodal approximations are used for multimodal true distributions. This,
however, should not be considered a law of the universe, but only a thumb
rule as clarified by Turner et. al. [Counterexamples to variational free energy compactness folk theorems](http://www.gatsby.ucl.ac.uk/~turner/Notes/Compactness/CompactnessFolkTheorem.pdf).
Rainforth et. al show that [tighter variational bounds are not necessarily better](http://proceedings.mlr.press/v80/rainforth18b.html).

## Research Venues

Cutting-edge research is a good way to sense where the field is headed. Here are
a few venues that I occassionally sift through.

- [Bayesian Analysis](https://projecteuclid.org/info/euclid.ba): An electronic journal by the [ISBA](https://bayesian.org).
- [Bayesian Deep Learning](http://bayesiandeeplearning.org): A regular NeurIPS workshop.
- [Symposium on
Advances in Approximate Bayesian Inference](http://approximateinference.org): A regular NeurIPS workshop grown into an independent symposium.

## Blogs

- [Andrew Gelman](https://statmodeling.stat.columbia.edu)
- [Christian Robert](https://xianblog.wordpress.com)
- [Michael Betancourt](https://betanalpha.github.io)

## Acknowledgements

I'm inspired by 
[Yingzhen Li](http://yingzhenli.net/home/en/)'s resourceful 
document on [_Topics in Approximate Inference_](http://yingzhenli.net/home/pdf/topics_approx_infer.pdf) (2017).
Many of the interesting references also come from discussions with my advisor,
[Andrew Gordon Wilson](https://cims.nyu.edu/~andrewgw/).

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
@book{mackay2003information,
  title={Information theory, inference and learning algorithms},
  author={MacKay, David JC and Mac Kay, David JC},
  year={2003},
  publisher={Cambridge university press}
}
@inproceedings{rasmussen2001occam,
  title={Occam's razor},
  author={Rasmussen, Carl Edward and Ghahramani, Zoubin},
  booktitle={Advances in neural information processing systems},
  pages={294--300},
  year={2001}
}
@article{maddox2020parameter,
  title={Rethinking Parameter Counting in Deep Models: Effective Dimensionality Revisited},
  author={Maddox, Wesley J and Benton, Gregory and Wilson, Andrew Gordon},
  journal={arXiv preprint arXiv:2003.02139},
  year={2020}
}
@article{minka2000bayesian,
  title={Bayesian model averaging is not model combination},
  author={Minka, Thomas P},
  journal={https://tminka.github.io/papers/minka-bma-isnt-mc.pdf},
  year={2002}
}
@phdthesis{murray2007advances,
  title={Advances in Markov chain Monte Carlo methods},
  author={Murray, Iain Andrew},
  year={2007},
  school={University of London},
  url={http://homepages.inf.ed.ac.uk/imurray2/pub/07thesis/murray_thesis_2007.pdf}
}
@book{scholkopf2018learning,
  title={Learning with kernels: support vector machines, regularization, optimization, and beyond},
  author={Scholkopf, Bernhard and Smola, Alexander J},
  year={2018},
  publisher={Adaptive Computation and Machine Learning series}
}
```