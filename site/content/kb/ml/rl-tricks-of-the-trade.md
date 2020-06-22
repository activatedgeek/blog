---
title: "RL: Tricks of the Trade"
menuLabel: Machine Learning
---

Raw collection of random things I've read around for better RL but now forgotten the sources. Hopefully, I can refine this sometime.

### Deadly triad

- Off-policy learning
- Flexible function approx.
- Bootstrapping

### Stabilization

- Experience replay buffer + mini-batch SGD
- Target network
- TD-error clipping
- Double Q-Learning - reduce maximization bias
- Average Q-Learning - reduce variance

Optimistic initializations - initialize to upper bound of Q-values
