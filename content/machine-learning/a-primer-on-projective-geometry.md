---
date: 2017-07-19T03:08:04+05:30
description: Understanding the basics behind 2D projections
title: A Primer on Projective Geometry
categories:
  - machine learning
markdown: mmark
tags:
  - computer vision
  - geometry
katex: true
---

Projective Geometry is a term used to describe properties of projections of a given
geometric shape. When a shape is projected onto \\( \Bbb{R}^2 \\) (commonly known as
the 2D real space), it is called a Planar Projection. This idea can be extended to
a shape being projected as \\( H : \Bbb{R}^m \to \Bbb{R}^n \\) where \\( H \\)
is a *homogenous* matrix. To understand concepts, we'll use Planar geometry because
that is the easiest to visualize.

### Homogenous Representation of Points and Lines

From elementary geometry, we know that a line in the plane is represented by
\\( ax + by + c = 0 \\). In vector form, a line can also be written as
\\( (a,b,c)^T \\). As can be easily seen, any multiple of this vector will also
represent the same line. Hence, we can define the equivalence: \\( (a,b,c)^T \equiv k(a,b,c)^T \\).
The class of such vectors is know as the *homogenous vector*. The set of all
such equivalence classes in \\( \Bbb{R}^3 - (0,0,0)^T \\) form the *Projective Space*
\\( \Bbb{P}^2 \\) with \\( (0,0,0)^T \\) excluded because it does not represent a line.

From the same equation above, the point \\( (x,y)^T \\) lies on the line \\( (a,b,c)^T \\)
and hence can be rewritten as \\[ (x,y,1)^T(a,b,c) \equiv \textbf{x}^T\textbf{l} = 0 \\]
Now, observe here that for convenience we represent \\( (x,y)^T \\) in \\( \Bbb{R}^2 \\)
as \\( (x,y,1)^T \\) in \\( \Bbb{P}^2 \\). Generalizing it further, let us say we
represent points in \\( \Bbb{P}^2 \\) as \\( (x_1,x_2,x_3)^T \\), which when
accounted for scale (read *equivalence class*), can be rewritten as the
homogenous vector \\( (x_1/x_3,x_2/x_3, 1) \\) in \\( \Bbb{P}^2 \\) and represents
\\( (x_1/x_3,x_2/x_3) \\) in \\( \Bbb{R}^2 \\).

Now that we have basic definitions in place, let us see how this representation helps.

### Intersection of Lines

Let us consider two lines \\( \textbf{l} = (a,b,c)^T \\) and
\\( \textbf{l}^\prime = (a^{\prime},b^{\prime},c^{\prime})^T \\).

The point of intersection of two lines is given by
\\[ \textbf{x} = \textbf{l} \times \textbf{l}^{\prime} \\]

It is easy to see why the above formula works. But, in \\( \Bbb{R}^2 \\), there
is one special case - parallel lines. We know about the notion that
*parallel lines meets at infinity* but *infinity* is just another way of saying
that something is not defined. Instead in \\( \Bbb{P}^2 \\), we'll see that there
exists no such special case.

Consider lines \\( x = 1 \\) and \\( x = 2 \\) in \\( \Bbb{R}^2 \\). These are
represented by lines \\( (1,0,-1) \\) and \\( (1,0,-2) \\) in \\( \Bbb{P}^2 \\).
The point of intersection will be given by the cross product -

\\[ \begin{bmatrix} i & j & k \\\\ 1 & 0 & -1 \\\\ 1 & 0 & -2 \end{bmatrix} = \begin{pmatrix} 0 \\\\ -1 \\\\ 0 \end{pmatrix} \\]

The vector \\( \textbf{x} = (0,-1,0)^T \\) is very well defined and hence we did
not need to handle parallel lines as a special case in \\( \Bbb{P}^2 \\). But what
point does this *homogenous vector* describe in \\( \Bbb{R}^2 \\)? By definition,
it should be \\( (\frac{0}{0}, \frac{-1}{0})^T \\) which is not defined and hence,
the lines meet at infinity as expected. So, we satisfy definitions of parallel lines
and their intersection in both spaces.

We define such points where \\( x_3 = 0 \\) as *ideal points* and belong to the
*line at infinity*. For any general *ideal point* \\( (a,b,0)^T \\), it is easy
to see that the equivalence class of the *line at infinity* can be represented by
\\( \textbf{l}\_{\infty} = (0,0,1)^T \\). This fact that parallel lines do
intersect at well-defined points in \\( \Bbb{P}^2 \\) will have a very important
implication in projections.

## Projective Transformations

Geometry is the study of properties invariant under a given set of transformation.
For the purpose of this illustration, we will see 2D projective geometry, which
is the study of properties of the projective plane \\( \Bbb{P}^2 \\).

*Definition 1*: We define a *projectivity* as an invertible mapping \\( h: \Bbb{P}^2 \to \Bbb{P}^2 \\)
such that three points \\( \textbf{x}_1, \textbf{x}_2, \textbf{x}_3 \\) are collinear
iff \\( h(\textbf{x}_1), h(\textbf{x}_2), h(\textbf{x}_3) \\) are collinear. It is
alternatively known as *homography*.

There is an alternative algebraic way to write this.

*Definition 2*: A mapping \\( h: \Bbb{P}^2 \to \Bbb{P}^2 \\) is called a projectivity
iff there exists a \\( 3 \times 3 \\) non-invertible matrix such that
\\( \textbf{x}^{\prime} = H\textbf{x} \\).

To see how both of these definitions are equivalent, consider points \\( x_1,x_2,x_3 \\)
on line \\( \textbf{l} \\), which by definition would imply -
\\[ {\textbf{x}_i}^T\textbf{l} = 0 \kern{3em} \forall i \in {1,2,3} \\]

Introducing \\( H \\) and some manipulations,
\\[ \Rightarrow \textbf{x}_i^T(H^{-1}H)^T\textbf{l} = 0 \\]
\\[ \Rightarrow \textbf{x}_i^TH^TH^{-T}\textbf{l} = 0 \\]
\\[ \Rightarrow (H\textbf{x}_i)^T(H^{-T}\textbf{l}) = 0 \\]
\\[ \Rightarrow (\textbf{x}_i^\prime)^T\textbf{l}^\prime = 0 \\]

Hence, the matrix \\( H \\) transforms the set of collinear points \\( \textbf{x}_i \\)
on \\( \textbf{l} \\) to points \\( {\textbf{x}_i}^\prime \\) on \\( \textbf{l}^\prime \\)
proving the equivalence of *Definition 1* and *Definition 2*.

## Class of Projections

Now that we have convinced ourselves about the algebraic nature of projections,
let us take a look some special cases of *Projective Transformations*. Note
that each transformation discussed below has a given set of invariants. The
ability to assess and reconstruct such patterns is the essence of scene geometry
understanding in *Computer Vision*.

### Isometries

These are transformations of the plane \\( \Bbb{R}^2 \\) that preserve the
*Euclidean distance*.

\\[ \begin{pmatrix} x^\prime \\\\ y^\prime \\\\ 1 \end{pmatrix} =
  \begin{bmatrix} \epsilon\cos\theta & - \sin\theta & t_x \\\\ \epsilon\sin\theta & \cos\theta & t_y \\\\ 0 & 0 & 1 \end{bmatrix} \begin{pmatrix} x \\\\ y \\\\ 1 \end{pmatrix} \\]

This transformation can be written in block form as:

\\[ H_E = \begin{bmatrix} \textbf{R} & \textbf{t} \\\\ \textbf{0}^T & 1 \end{bmatrix} \\]

where \\(\epsilon = \pm 1 \\) for orientation preservation, \\( \textbf{R} \\)
is the *orthogonal rotation matrix* and \\( \textbf{t} \\) is the *translation vector*.

### Similarity Transformations

This transformation is an extension of isometry with scaling involved. Hence, instead
of the *Euclidean distance* being preserved, the ratios like between two lengths
or two areas are preserved. In essence, shapes are preserved.

\\[ \begin{pmatrix} x^\prime \\\\ y^\prime \\\\ 1 \end{pmatrix} =
  \begin{bmatrix} s\cos\theta & - s\sin\theta & t_x \\\\ s\sin\theta & s\cos\theta & t_y \\\\ 0 & 0 & 1 \end{bmatrix} \begin{pmatrix} x \\\\ y \\\\ 1 \end{pmatrix} \\]

This transformation can be written in block form as:

\\[ H_S = \begin{bmatrix} s\textbf{R} & \textbf{t} \\\\ \textbf{0}^T & 1 \end{bmatrix} \\]

where \\( s \in \Bbb{R} \\) represents the scaling factor.

### Affine Transformations

Affine transformations are an extension to the similarity transform but with an
added deformity factor. This preserves parallelism.

\\[ \begin{pmatrix} x^\prime \\\\ y^\prime \\\\ 1 \end{pmatrix} =
  \begin{bmatrix} a\_\text{11} & a\_\text{12} & t_x \\\\ a\_\text{21} & a\_\text{22} & t_y \\\\ 0 & 0 & 1 \end{bmatrix} \begin{pmatrix} x \\\\ y \\\\ 1 \end{pmatrix} \\]

This transformation can be written in block form as:

\\[ H_A = \begin{bmatrix} \textbf{A} & \textbf{t} \\\\ \textbf{0}^T & 1 \end{bmatrix} \\]

where \\( A \\) represents a general linear part. It is easy to observe that
*lines at infinity* remain at *infinity*.

### Projective Transformations

These are the most generalized set of transformations and can be written in block form as:

\\[ \textbf{x}^\prime = H_P\textbf{x} = \begin{bmatrix} \textbf{A} & \textbf{t} \\\\ \textbf{v}^T & w \end{bmatrix} \\]

The invariant property here, other than the previously discussed collinearity is
something known as a *cross-ratio* which is defined as a ratio of ratios -

\\[ Cross(x_1,x_2,x_3,x_4) = \frac{ \begin{vmatrix} x_1x_2 \end{vmatrix} \begin{vmatrix} x_3x_4 \end{vmatrix} }{ \begin{vmatrix} x_1x_3 \end{vmatrix} \begin{vmatrix} x_2x_4 \end{vmatrix} } \\]

where \\( \begin{vmatrix} x_ix_j \end{vmatrix} = det \begin{vmatrix} x\_\text{i1} & x\_\text{i2} \\\\ x\_\text{j1} & x\_\text{j2} \end{vmatrix} \\) in \\( \Bbb{P}^1 \\) (can be extended).
Note that the order of the points will change the ratio (which have a simple relationship)
but as long as the definition is consistent, it is an invariant.

Coming back to an earlier discussion on *homogenous points*, consider an *ideal point*
transformed by a *Projective Transformation*.

\\[ \textbf{x}^\prime = H_P\textbf{x} = \begin{bmatrix} \textbf{A} & \textbf{t} \\\\ \textbf{v}^T & w \end{bmatrix} \\]

where \\( \textbf{v}^T \neq \textbf{0}^T \\). It can be observed that
*lines at infinity* **DONOT** remain at *infinity*.

\\[ \begin{bmatrix} \textbf{A} & \textbf{t} \\\\ \textbf{v}^T & w \end{bmatrix} \begin{pmatrix} \textbf{x} \\\\ 0 \end{pmatrix} = \begin{pmatrix} A\textbf{x} \\\\ \textbf{v}^T\textbf{x} \end{pmatrix} \\]

which will not remain an *ideal point* anymore due to the \\( \textbf{v}^T\textbf{x} \\)
component and hence **helps model vanishing points** - *imagine two parallel rail
tracks meeting at the edge of the horizon as seen by the eyes*.

## Application

A projective transformation can be decomposed into the following set of transformations -

\\[ H = H_SH_AH_P = \begin{bmatrix} s\textbf{R} & \textbf{t} \\\\ \textbf{0}^T & 1 \end{bmatrix} \begin{bmatrix} \textbf{K} & \textbf{0} \\\\ \textbf{0}^T & 1 \end{bmatrix} \begin{bmatrix} \textbf{I} & \textbf{0} \\\\ \textbf{v}^T & w \end{bmatrix} \\].

\\( H_P \\) moves the *line at infinity*, \\( H_A \\) makes an affine transformation
and preserves the invariants of \\( H_P \\),
and \\( H_S \\) is the similarity transform and preserves the invariants of both
\\( H_P \\) and \\( H_A \\).

All the above equips us with a fundamental understanding of what matrices need to be
computed when trying to reconstruct geometry from given scene and keypoints. I
will discuss one of the simpler rectification problems here in theory.

### Affine Rectification of images

We will see that identifying the *line at infinity* will allow us to recover
the affine properties of an image. Remember from the above discussion, that

\\[ {\textbf{l}^\prime}_\infty = H_A^\text{-T}\textbf{l}\_\infty = \begin{bmatrix} \textbf{A}^\text{-T} & \textbf{0} \\\\ - \textbf{t}^\text{-1}\textbf{A}^\text{-T} & 1 \end{bmatrix} \begin{pmatrix}0 \\\\ 0 \\\\ 1 \end{pmatrix} = \begin{pmatrix}0 \\\\ 0 \\\\ 1 \end{pmatrix} = \textbf{l}\_\infty \\]

and that a *line at infinity* is only preserved when H is an *affinity*. Effectively,
what we need to find a projective matrix which transforms an identified
\\( {\textbf{l}^\prime}\_\infty \\) in the image to the canonical position of
\\( \textbf{l}_\infty = (0,0,1)^T \\).

Consider a given image where we have identified 2 pairs of parallel lines in homogenous coordinates -
\\( \textbf{l}_1 \parallel \textbf{l}_2 \\) and \\( \textbf{m}_1 \parallel \textbf{m}_2 \\).

To calculate the *line of infinity* in the image space,

\\[ \textbf{p}_l = \textbf{l}_1 \times \textbf{l}_2 \\]
\\[ \textbf{p}_m = \textbf{m}_1 \times \textbf{m}_2 \\]
\\[ {\textbf{l}^\prime}\_\infty = \textbf{p}_l \times \textbf{p}_m \\]

where \\( \textbf{p}_l \\) and \\( \textbf{p}_m \\) are the *ideal points*
from respective pair of parallel lines. \\( {\textbf{l}^\prime}\_\infty \\) is the
*line of infinity* constructed via the *ideal points*. Using this line, we need
to find a projective matrix which converts it into the canonical line at infinity
\\( (0,0,1)^T \\).

\\[ H_1 = \begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ l_1 & l_2 & l_3 \end{bmatrix} \\]

where \\( (l_1,l_2,l_3)^T = {\textbf{l}^\prime}\_\infty \\). It is verifiable that
\\( {H_1}^\text{-T}{\textbf{l}^\prime}\_\infty = \textbf{l}\_\infty \\).

If we now apply the same transformation matrix to all points on the image, the image
will be rectified to actually show parallel edges as parallel.


---

The above discussion introduces the basic matrices and invariant properties which
we look for while processing images for geometric scene understanding. A more
practical approach to the rectification problem above and more complex problems
like *2D Homography* and *Stereo Matching* will be discussed in another post.
