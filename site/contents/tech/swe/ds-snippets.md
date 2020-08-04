---
title: Data Science Snippets
description: Snippets for Python, Conda, Jupyter etc.
date: Aug 02 2020, 08:24 -0700
area: tech
cat: swe
---

### Fixing Jupyter Lab widgets

If widgets like [tqdm progress bars](https://tqdm.github.io) are not working
in Jupyter, run the following once in every new environment containing Jupyter.

```bash
$ pip install ipywidgets
$ jupyter nbextension enable --py widgetsnbextension
$ jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

After searching innumerable times, I finally have it handy. This was originally
discussed in [Issue #394](https://github.com/tqdm/tqdm/issues/394) on Github.
