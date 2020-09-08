---
title: Bash code snippets
date: Jul 5 2020, 15:29 -0700
updated: Sep 8 2020, 14:10 +0530
area: tech
cat: swe
---

## Articles

- [Bash Pitfalls](https://mywiki.wooledge.org/BashPitfalls)

## Snippets

### Multiline strings

Always forgetting this very important utility.

```bash
strvar=$(cat << EOF

# all content goes here, bash variables work.

EOF
)
```

To directly put the output into a file

```bash
cat << EOF > /path/to/file

# all content goes here, bash variables work.

EOF
)
```
