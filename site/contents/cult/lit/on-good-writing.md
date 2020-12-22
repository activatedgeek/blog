---
title: On good writing
description: Documenting characteristics of good writing.
date: Aug 11 2020, 17:28 -0700
updated: Dec 9 2020, 18:10 +0530
area: cult
cat: lit
---

I want to be a good scientist and science is a social endeavour. Crisp communication
is essential. Learning to write well, like everything else, is a process. Here
are some resources I often go back to.

## General Communication

- [How to write in plain English](http://www.plainenglish.co.uk/how-to-write-in-plain-english.html)

### Chekhov's gun

From [Wikipedia](https://en.wikipedia.org/wiki/Chekhov%27s_gun)

> Chekhov's gun is a dramatic principle that states that every element in a story must be necessary, and irrelevant elements should be removed.

While, I am not sure I would agree with this principle for drama (for which it
was originally emphasized), I think this is _the_ principle for any formal
communication, including mathematical and other scientific writing [^a].

### Mathematical Communication

- [How to write a great research paper](https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/) by _Simon Peyton Jones_

- [How to read a paper](https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf) by _S. Keshav_

- [Mathematical Writing](https://jmlr.csail.mit.edu/reviewing-papers/knuth_mathematical_writing.pdf) by _Donald E. Knuth, Tracy Larrabee, and Paul M. Roberts_

#### Speech

Speech is often a medium through which writing is communicated and also essential.

- [How to give a great research talk](https://www.microsoft.com/en-us/research/academic-program/give-great-research-talk/) by _Simon Peyton Jones_

- [How To Speak](https://www.youtube.com/watch?v=Unzc731iCUY&feature=share) by _Patrick Winston_

## Strunk's Rules

I was not happy with some of the sentence structures in a paper I wrote recently.
I am deliberately noting these rules here for a quick reference whenever I write
long-form public texts. My [kb](/kb) will be exempt, to allow faster
writing for now. This is a summary from the excellent book by _ William Strunk Jr._,
[The Elements of Style](https://www.librarything.com/work/3407/book/193494864).

- [Rule 1] Always use **'s** (appostrophe s) to form singular possessive nouns. Some ancient
  proper nouns ending in _-es_ or _-is_ are an exception but the sentence can be
  restructured to sound better.
  > _Moses' laws_ can be rewritten as _the law of Moses_.
- [Rule 2] With a series of comma-separated terms, no need for the last one.
  > supervised, unsupervised, and reinforcement learning.
- [Rule 3] Parenthetic expressions can be enclosed in commas. These must, however, be used
  sparingly. Often, one can compromise on succinctness and break such phrases
  into multiple independent statements.
  > Linear regression, one of the most popular methods, is an example of supervised learning.
- [Rule 4] In some sentences, connectors _and_ or _but_ do not explicitly define the relation between
  connected clauses. Instead, the sentences can be structured better using explicit
  relational qualifiers like _although_, _while_, etc.
  > _Linear regression is a regression method, but logistic regression is a classification method_ v/s
  > **_While linear regression is a regression method, logistic regression is a classification method_**.
- [Rule 5] A single compound sentence composed of complete clauses can be connected
  using a semi-colon ";" instead of a full stop; this is helpful to disambiguate
  pronouns like _this_, _they_, _it_, etc. Alternatively, we can fall back to using
  commas as usual with proper relational qualifiers.
- [Rule 9] A paragraph should either denote a single unit in a composition or
  signal a new development of the subject from the previous paragraph. Single
  sentence paragraphs should be used sparingly, only as a connecting thread between
  the predecessor and successor.
- [Rule 10] Within a paragraph, the first sentence can be the topic sentence,
  and the final sentence can emphasize a consequence of the discussion. Although,
  violating this thumb rule often breaks the monotony for the reader.
- [Rule 11] Use active voice to enforce directness.
- [Rule 12] Use positive statements; limit the use of _not_ qualifiers.
- [Rule 13] Omit needless words.
  > _She is the one who_ should be replaced by **_She_**.
- [Rule 15] Express co-ordinate ideas in similar form. Correlative expressions
  should be followed by the same grammatical construction.
  > _the Bayesians and frequentists_ should be **_the Bayesians and the frequentists_**
- [Rule 16] Keep related words together. Parenthetic clauses can
  be transferred to the beginning of a sentence to avoid reading interruptions.
- [Rule 18] The proper place for emphatic words, which the writer desires to make
  most prominent, is towards the end of a sentence.
  > _Neural networks have hardly advanced our understanding of the human brain, though
  > they are behind many breakthroughs in computer vision._ v/s
  > _Neural networks are behind many breakthroughs in computer vision, but they have
  > hardly advanced our understanding of the human brain_.

[^a]: Of course, we often beat about the bush to fill those 8 pages.
