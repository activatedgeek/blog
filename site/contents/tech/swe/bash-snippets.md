---
title: Bash code snippets
date: Jul 05 2020, 15:29 -0700
area: tech
cat: swe
---

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
