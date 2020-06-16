---
title: Code Snippets
description: Utilities so that I don't have to scour the internet always.
label: Machine Learning
---

## PyTorch

### Vectorized Pairwise Distances

For $\mathbf{X} \in \mathbb{R}^{... \times m \times d}, \mathbf{Y} \in \mathbb{R}^{... \times n \times d}$, the pairwise distance matrix between each pair of these batched matrices is $\mathbf{D} \in \mathbb{R}^{... \times m \times n}$, where ... represent arbitrary batch dimension (think batches of pairs of $m$ and $n$ samples of dimension $d$).

```python
def pairwise_dist(x, y):
    xx = (x * x).sum(dim=-1).unsqueeze(-1)
    yy = (y * y).sum(dim=-1).unsqueeze(-2)
    xy = torch.einsum('...ji,...ki->...jk', x, y)
    d = xx + yy - 2. * xy
    return d
```

## LaTeX

### Localize Settings

Just wrap everything inside

```text
\begingroup
...
\endgroup
```

### Table Merge Columns

```text
% <column size> (2), <type> (c), <content>
\multicolumn{2}{c}{...content...}
```

### Table Column Spacing

```text
\setlength{\tabcolsep}{2pt}
```

### Wrapping figure around text

```text
% "r" for right, "l" for left
\begin{wrapfigure}{r}{0.5\textwidth}
...
\end{wrapfigure}
```

### Split long equations overflowing page width

Inside `align` environments, use `split`. `{}&` for alignment and the usual new line `\\` for split points.

```text
\begin{align}
a = b + c \\
\begin{split}
z^2 = {}&x^2 + \\{}&y^2
\end{split} \\
...
\end{align}
```
