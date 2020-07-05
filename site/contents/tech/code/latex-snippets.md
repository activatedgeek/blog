---
title: LaTeX code snippets
date: Jul 05 2020, 15:26 -0700
area: tech
cat: code
---

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
