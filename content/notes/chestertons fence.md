---
date: '2026-04-18'
title: chesterton's fence
draft: true
description: the principle of not removing things you don't understand
tags:
  - notes
  - engineering
  - principles
---

The principle: do not remove a fence until you understand why it was put there. G.K. Chesterton, 1929. The engineering corollary: do not delete code until you understand why it was written.

This sounds obvious. It is not practiced. The failure mode is always the same: someone reads a block of code, decides it is unnecessary, removes it, and three weeks later a production incident reveals the block was compensating for a bug elsewhere in the system. The fence was ugly. The fence was load-bearing.

The subtlety is that Chesterton's fence is ==not an argument against ever removing anything==. It is an argument against removing things you do not understand. If you understand the fence — you know why it was built, you know the constraint it was satisfying, and you know that constraint no longer holds — then tear it down. The principle demands comprehension, not conservation.

In codebases this maps to:

- **Before deleting a workaround**, find the bug it works around. If the bug is fixed, delete. If the bug is not fixed, the workaround is the fix.
- **Before removing an error handler**, trace every code path that reaches it. If none can, delete. If one can, the handler is doing real work.
- **Before simplifying a retry loop**, understand what failure it was retrying against. If the failure class no longer exists, simplify. If it does, the "complexity" is load-bearing.

The inverse is equally important: code that exists only because someone was afraid to remove it is technical debt with a preservation instinct. [[the-cost-of-shortcuts|The cost of shortcuts]] includes the cost of shortcuts you keep paying for long after the original reason expired.

The connection to [[harness as target]]: a reward function that calls `eval()` on policy output was probably not written by someone who wanted an RCE. It was written by someone who needed to parse a dynamic expression and did not think about the security boundary. Understanding *why* the eval is there — what problem it was solving — is the first step to replacing it safely.
