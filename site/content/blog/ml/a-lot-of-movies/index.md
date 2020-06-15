---
title: I watch a lot of movies
description: A visual inspection into my IMDb ratings using Altair
tags:
  - viz
draft: true
---

import hist_year from "./hist_year.alt.json"
import heatmap_genre from "./heatmap_genre.alt.json"

For better or for worse, I have watched [over 780 movies](/kb/movies). It
seems natural to put that data to good use, at least academically. This
post is written, in expectation, to mainly serve three purposes -

1. a way for me to ask as many questions as possible on a simple dataset to keep
   the creative juices flowing

2. to keep thinking about informative ways to visualize data ubiquitous around us

3. a quick reference for [Altair](https://altair-viz.github.io), a declarative
   charting library

## Data

IMDb allows users to rate every movie or a TV show on a scale of 1 to 10,
restricted to integer ratings. Conveniently, it also collects them into a
[list](https://www.imdb.com/user/ur34765497/ratings) which I have made public.

I wrote a tiny web spider using [Playwright](https://playwright.dev) which
collects some basic information - title, release year, genres, ratings (including
mine) and total number of votes, into a CSV file [^1]. It is a pretty
straightforward set of CSS path selectors. I do some further organization in
a [Jupyter notebook](https://github.com/activatedgeek/imdb-ratings/blob/master/notebooks/IMDb%20Analysis.ipynb)
using [Pandas](https://pandas.pydata.org) `DataFrames` to make charting easier.

My rule of thumb to store or organize data is to do it in a format I would design
for a typical relational database. All downstream analysis can then be pretty much
summarized via operations in relational algebra - Cartesian product, projection,
selection, union and difference [^2].

## Questions

This is a list of questions I've thought of visualizing so far for a qualitative
inspection of the statistics.

### Count based

#### Movies watched by release year

<LazyVega spec={hist_year} />

#### Genre heatmap by release year

<LazyVega spec={heatmap_genre} />

## Footnotes

[^1]: The code and data is available at [activatedgeek/imdb-ratings](https://github.com/activatedgeek/imdb-ratings).
[^2]: More SQL-esque notions would be the operations of table merge and join.
