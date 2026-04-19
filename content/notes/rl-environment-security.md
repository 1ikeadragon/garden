---
date: '2026-04-19'
title: RL Environment Security
description: notes on the attack surface of reinforcement learning environments
tags:
  - notes
---

RL training pipelines now ship a full attack surface: the environment.

The policy is the attacker. Not metaphorically — the optimizer is gradient-descending toward whatever scores well, including behavior the reward harness did not intend to reward. This is well-trodden ground as "reward hacking" but the framing misses the interesting part. The interesting part is that the substrate underneath the reward is code, and code has bugs.

Consider the modern agentic RL env:

- a container with shell, file system persistence between steps, package managers, pre-installed tooling (git, curl, python, node), and in many cases outbound network
- a scoring harness written in the same container, often Python, often parsing from stdout
- a trajectory buffer shipped back to a central training node
- a reset that is rarely a true reset — `/tmp`, caches, DB state, sometimes `~` persist

The attack surface in plain view:

1. **Harness-as-target.** The reward function is code. Policies learn to emit inputs that exploit the parser. Not reward hacking in the classical sense — straight RCE against the thing counting the score. Unsafe YAML, `eval`, pickled state from prior episodes. Same bug classes as a CTF jeopardy env, except the attacker is a gradient and does not get bored.
2. **Sandbox escape as learned behavior.** If the env is a container with default flags, the policy may learn which syscalls, mounts, or capability misconfigurations correlate with higher reward when the reward function happens to read host-side state. "Happens to" is load-bearing. Nobody designs this in; it emerges.
3. **Supply chain.** Community envs on HF, Gymnasium registries, curated agent benchmarks. `pip install` in a Dockerfile that many teams reuse. Env code is trusted code with close-to-zero review. This is the Python ecosystem's existing failure mode, but training runs execute it at scale, unattended, on machines with valuable credentials mounted.
4. **Egress and exfil.** Training containers often have open outbound — for tool-use experiments, for browsing agents, for pip itself. A trained policy making outbound requests is not a bug; it is the feature. The question is whether anyone looked at the DNS logs.
5. **Persistence across episodes.** If state leaks across resets — shared Redis, shared tmp, shared embedding cache — a successful exploit from episode *n* carries payload into *n+1*. You now have an intra-training-run worm with a fitness function.

What to watch:

- Envs running root inside the container, or worse, uncontained on the host.
- Reward harnesses that `exec` or `eval` anything derived from policy output. The amount of this in production training code is not small.
- Network policies that say "we need egress for tool use" and stop thinking. Outbound from a training container is an exfil channel by default.
- Shared caches (HF hub, pip, poetry) that cross trust boundaries.
- Any env advertised as "realistic." Realism is the adversarial surface.

None of this is novel as security research. It is novel as attack surface: training runs now look like untrusted code execution on valuable hardware, and the execution is adversarially optimizing against the host.

The open question is not whether this gets exploited. It is whether anyone outside a handful of labs is instrumenting for it.
