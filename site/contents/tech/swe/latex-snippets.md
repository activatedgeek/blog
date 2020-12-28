---
title: LaTeX code snippets
date: Jul 05 2020, 15:26 -0700
updated: Dec 23 2020, 2:48 +0530
area: tech
cat: swe
---

### Localize Settings

Just wrap everything inside

```tex
\begingroup
...
\endgroup
```

### Table Merge Columns

```tex
% <column size> (2), <type> (c), <content>
\multicolumn{2}{c}{...content...}
```

### Table Column Spacing

```tex
\setlength{\tabcolsep}{2pt}
```

### Wrapping figure around text

```tex
% "r" for right, "l" for left
\begin{wrapfigure}{r}{0.5\textwidth}
...
\end{wrapfigure}
```

### Split long equations overflowing page width

Inside `align` environments, use `split`. `{}&` for alignment and the usual new line `\\` for split points.

```tex
\begin{align}
a = b + c \\
\begin{split}
z^2 = {}&x^2 + \\{}&y^2
\end{split} \\
...
\end{align}
```

### Avoiding package import conflicts

Often, packages may be loaded transitively and conflict with a previous declaration.
To avoid such scenarios, pre-emptively send in package options.

```tex
% {<options>}{<package_name>}
\PassOptionsToPackage{pdftex}{graphicx}
```

A good place is in the preamble right before any other package imports. In this
case, any subsequent import of the `graphicx` package can be done as

```tex
\usepackage{graphicx}
```

which will implicitly also pass the desired option. This is helpful when another
package wants to load `graphicx` with different options. Effectively, this
command will append to the options list. This may not always be the best solution
but should work for most cases.

### LaTeX without native supported

This is the last thing one should use since images aren't accessible, and terrible to manipulate. Many platforms, however, do not leave a choice (e.g. Github Markdown). As a stop-gap, use this [CodeCogs Equation Editor](https://editor.codecogs.com) to generate SVGs of equations. Here's the Bayes' rule,

![Bayes' Rule](<https://latex.codecogs.com/svg.latex?p(x&space;\mid&space;y)&space;=&space;\frac{p(y\mid&space;x)p(x)}{p(y)}>)

generated through the URL `https://latex.codecogs.com/svg.latex?p(x&space;\mid&space;y)&space;=&space;\frac{p(y\mid&space;x)p(x)}{p(y)}`.

The range of LaTeX math grammar this supports is unclear.
