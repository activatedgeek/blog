## Website

[![Build Status](https://travis-ci.org/activatedgeek/website.svg?branch=master)](https://travis-ci.org/activatedgeek/website)

Website hosted on [Netlify](https://www.netlify.com/) at [https://www.sanyamkapoor.com](https://www.sanyamkapoor.com).
It is based on [Hugo](https://gohugo.io/).

The CV is hosted at [https://www.sanyamkapoor.com/cv](https://www.sanyamkapoor.com/cv).

### Deploy to Github Pages (older method)

To deploy to Github Pages via the `gh-pages` branch, have a look
at the [Makefile](./Makefile) which performs the following steps:

* Build static site `hugo`
* Create an orphan branch `gh-pages`
* Remove everything from `git` on this branch except files from `public/`
* Add a `CNAME` entry (optional for linking custom domain)
* Commit changes and push the `gh-pages` branch
