+++
title = "Codeforces 484A"
description = "Solution to Codeforces Problem 484A: Bits"
date = "2017-04-05T09:04:45+05:30"
thumbnail = ""
categories = [
  "problem solving",
]
tags = [
  "problem solving",
  "algorithms"
]

[distill]
  [[distill.authors]]
  author = "Sanyam Kapoor"
  authorURL = "http://www.sanyamkapoor.com/"
+++

I was recently solving this problem on Codeforces titled
[Bits](http://codeforces.com/problemset/problem/484/A). It was a fairly
interesting problem considering a few new learnings I had.

To be simply put, the aim of the problem is to get the number with the maximum
number of bits (`popcount(x)`) within the range `[l, r]`.

### Approach

The problem can be approached as follows.

For any given number from `1` to `n`, the maximum number of bits will be in
a number of the form `2^b - 1`, or in other words, a number one less than power
of two. For instance, for `n = 8 (binary: 1000)`, the maximum number of bits are
in the number `7 (binary: 111)`.

But is this always possible? The answer is no because the range of numbers
`[l ,r]` does not start from `1` and it is possible that no power of
`2` exists in the given range of numbers.

To solve this case, the starting approach can be extended to work in a recursive
manner by bringing down the problem size to `current number of bits - 1`.

For instance, consider the range `[9, 14]`. Writing all the numbers in binary
form

```
9   = 1001
10  = 1010
11  = 1011
12  = 1100
13  = 1101
14  = 1110
```

There exists no power of two in the given range (i.e. no number with only the
most significant bit set) and the problem can be reduced to solving for the
range `[1, 6]`.

```
1 = 001
2 = 010
3 = 011
4 = 100
5 = 101
6 = 110
```

If you observe, this is simply dropping the first bit and solving a smaller
sub-problem. We keep stripping down the most significant bit until we find a
range where a power of two exists. Removing the most significant bit is as
simple as `2^b - n`, where `b` is the number of bits in `n`.

This range fortunately has a largest power of two as `4` and hence the maximum
number of bits are in the number `3 (binary: 011)`. Now adding the bit back, final
answer is `11 (binary: 1011)`.

### Solution

Here is the solution in `C++14`.

```c++
#include <bits/stdc++.h>
using namespace std;

// types
typedef long long ll;
typedef vector<ll> vl;
typedef vector<string> vs;
typedef map<string, ll> msl;
typedef map<ll, ll> mll;
typedef set<int> sl;
typedef set<string> ss;
typedef pair<ll,ll> pll;

// helpers
#define REP(i,a,b) for (int i = a; i <= b; i++)
#define REPN(i,a,b) for (int i = a; i >= b; i--)
#define MP make_pair
#define PB push_back
#define I insert
#define E erase
#define L length()
#define SZ size()

// count number of bits in "n"
ll bitc(ll n) {
  ll c = 0;
  while (n) {
    ++c;
    n /= 2;
  }
  return c;
}

ll solve(ll l, ll r) {
  if (l == r) {
    return l;
  }

  // find largest power of 2 <= r
  ll bcr = bitc(r);
  ll p2r = 1LL << (bcr - 1LL);

  // if no power of two in the range, solve for one less bit and add the bit to the final result
  if (p2r <= l) {
    return solve(l - p2r, r - p2r) + p2r;
  }

  // the next two conditions help identify the largest power of two available in range

  // if (largest power of two - 1) in range
  ll mp2r = 1LL << bcr;
  if (mp2r - 1LL <= r) {
    return mp2r;
  }

  // p2r > l after above conditions fail
  return p2r - 1LL;
}

int main() {
  ios_base::sync_with_stdio(0);
  cin.tie(0);

  ll n; cin >> n;
  while (n--) {
    ll l, r; cin >> l >> r;
    cout << solve(l, r) << endl;
  }

  return 0;
}
```

### Learnings

One small thing that one could miss out is implicit type-casting of constants
in C++. If you write `1 << n` and `n > 32`, this will cause an
integer overflow and wrap around because all constants have datatype as 32-bit
integer (`int`) by default. To explicitly tell the compiler, one should suffix it with
the `LL` identifier. This caused me two wrong submissions unfortunately.
