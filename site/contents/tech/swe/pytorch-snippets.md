---
title: PyTorch code snippets
date: Jul 05 2020, 15:25 -0700
updated: Mar 8 2020, 18:15 +0500
area: tech
cat: swe
---

### CUDA Specific Builds

To install specific CUDA version builds for PyTorch, use

```shell
$ pip install torch --no-cache-dir -f https://download.pytorch.org/whl/cu101/torch_stable.html
```

`cu101` corresponds to CUDA 10.1, and needs to be changed appropriately.

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
