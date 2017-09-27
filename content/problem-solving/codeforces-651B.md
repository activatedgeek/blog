---
date: 2017-05-04T09:04:45+05:30
description: 'Solution to Codeforces Problem 651B: Beautiful Paintings'
title: Codeforces 651B
categories: []
tags:
  - problem-solving
  - algorithms
---

I was recently solving this problem on Codeforces titled
[Beautiful Paintings](http://codeforces.com/problemset/problem/651/B). The
problem seems easy at first but has interesting approaches - one easier but
longer and one slightly harder but shorter.

### Approach 1

On the first read, the problem is fairly straightforward and all we need is
sorting because that is how we achieve `a(i) <= a(i + 1)` (mind the equality).

Using this approach, solving the following problem

```
5
20 30 10 50 40
```

will give us a sorted array as

```
10 20 30 40 50
```

and the total instances where `a(i) < a(i + 1)` is `4` (the answer).

But there's one catch - what if there exists an `i` such that `a(i) = a(i + 1)`.
To convince yourself that a simple sorting will not return the optimal solution
if the input numbers are not unique, consider the following case.

```
4
200 100 100 200
```

By simply sorting,
```
100 100 200 200
```
the total instances where `a(i) < a(i + 1)` is satisfied is `1`. But consider the
following arrangement:
```
100 200 100 200
```
Here the total instances are `2` (which is in fact the answer).

Quoting from the question **we are allowed to rearrange elements of a in any order**.
Keeping all these things in mind, you can convince yourself that the actual
problem that needs to be solved is the following:

> Find the set of sorted segments with greater than one unique elements and count
> the number of happy instances in each sorted segment.

Sorted because we need to satisfy `a(i) < a(i + 1)` and segments with unique elements
so that we don't end up with a less optimal solution (as seen above).

From here, the solution approach should be fairly simple after putting in a little
thought.

1. Sort the input array
2. Pick the next larger number
3. Repeat 2 until the end of the array and store in an array A (one segment)
4. Repeat 3 until no number is left to be picked
5. Count the number of occurrences of `a(i) < a(i + 1)` in each segment from 3

This approach takes `O(nlgn)` time.

### Approach 2

In continuation of the above approach, there is a linear time `O(n)` approach
possible because of the fact that we only need to count the number of happy
occurrences. This was a slightly harder thought to come by and was the
interesting part of this problem.

To start with, let us convince ourselves with the fact that if the most frequently
occurring number occurs `m` times, then there are only exactly `m` sorted segments
possible with more than one unique numbers. Also, each segment boundary causes us to lose
one happy instance or in general we lose `m - 1` happy instances. Seeing with an example,
```
4
200 100 100 200
```
The maximum frequency of any number is `2`, shared by both `100` and `200` (convince
yourself why a shared maximum doesn't affect the claim). According to the claim
above, there are exactly `2` segments possible.
```
100 200
100 200
```
Aligning these segments one after the other, we lose one (`2 - 1`) happy transition (the
transition from `100` to `200` from first to the second segment).

For the rough proof, consider to the contrary that there can be `m - 1` or `m + 1` segments.

If there are `m - 1` segments, consider that the `kth` segment is discarded and all
its elements are randomly distribution among the remaining `m - 1` segments. By
definition of the segments, we will have introduced a non-unique element into
at least of the remaining `m - 1` segments. This is a contradiction to the
initial claim that the sorted segments must have unique numbers.

On the other side, if there are `m + 1` segments, we are already introducing
an additional unhappy transition without gaining a happy one. Hence, this increase
in number of segments cannot be optimal, a contradiction.

So, among a total of `n - 1` possible happy transitions, we lose `m - 1` unhappy
transitions at the segment boundaries. So, the optimal result is

`(n - 1) - (m - 1)` = `n - m`.

### Solution

The Approach 2 implementation is presented here in `C++14`.

```c++
#include <bits/stdc++.h>
using namespace std;

// types
typedef long long ll;
typedef vector<ll> vl;
typedef vector<bool> vb;
typedef vector<string> vs;
typedef map<char, ll> mcl;
typedef map<string, ll> msl;
typedef map<ll, ll> mll;
typedef set<ll> sl;
typedef set<char> sc;
typedef set<string> ss;
typedef pair<ll,ll> pll;

// helpers
#define iosync ios_base::sync_with_stdio(0); cin.tie(0);
#define REP(i,a,b) for (ll i = a; i <= b; i++)
#define REPN(i,a,b) for (ll i = a; i >= b; i--)
#define MP make_pair
#define PB push_back
#define I insert
#define E erase
#define L length()
#define SZ size()

int main() {
  iosync;

  ll n; cin >> n;
  mll m;
  ll res = 0;
  REP(i,1,n) {
    ll a; cin >> a;
    m[a]++;
    res = max(m[a], res);
  }

  cout << n - res << endl;
  return 0;
}
```
