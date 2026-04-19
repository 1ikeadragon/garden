---
date: '2026-04-19'
title: RL Environment Security
description: attack surface of reinforcement learning environments
tags:
  - notes
  - reinforcement learning
---

A thing that has been bugging me: people talk about ==reward hacking== as if it were the primary security concern in reinforcement learning. It is not. Reward hacking is a subset of a broader and less glamorous problem, namely that the substrate the reward runs on is code, code has bugs, and one has paid for a few thousand GPU-hours of an optimizer whose entire job description is finding them.

Put differently. Assemble an environment: container, shell, filesystem, package manager, outbound network, a Python process that scores trajectories by parsing stdout. This is, in practice, what a modern agentic RL env looks like. One has built a small cyber range. The agent is the red team. There is no blue team.

Things that ::will break::{h2} if enough compute is thrown at them:

**The harness.** The reward function is a program. Public RL envs that call `eval`, parse attacker-controlled YAML, or unpickle state from prior episodes exist and are not hard to find. Policies learn to emit strings that happen to exploit the parser. From the policy's perspective this is indistinguishable from legitimate reward. The same bug classes that have kept CTF organisers employed for twenty years, now with a patient, dumb adversary that does not sleep.

{{sidenotes[harness]: The predictable counter is "we only run the scorer in a subprocess." Fine. The subprocess still has a filesystem, still has a socket, and the reward signal still flows back into the optimizer. The isolation is performative.}}

**The container.** `docker run` with defaults. `--privileged` because someone needed GPU access and Stack Overflow said to. `CAP_SYS_ADMIN` because it was Tuesday. The policy is not trying to escape; it is trying to maximise reward. If the scorer happens to read `/proc/1/environ` or anything under `/etc/kubernetes/`, whatever host-side side effect correlates with higher reward gets selected for. "Emergent behaviour" is marketing for "we did not think about this."

**The supply chain.** `pip install` inside a Dockerfile that lives in a benchmark repo a handful of labs fork. One poisoned wheel, one typosquatted transformer utility, and you have a stable channel into the training runs of everyone who rebased. Nobody reads an env's `requirements.txt`. Anybody who says they do is lying or paid to.

**Egress.** Tool-use envs need outbound; that is what makes them tool-use envs. It is also what makes them exfil channels. One does not generally log DNS out of a training cluster. One should.

> [!warning] Persistence across episodes
> If state leaks across `env.reset()` — a shared Redis, a cache dir on a network mount, anything under `/tmp` that sticks around because someone needed it to — then a payload established in episode *n* carries into *n+1*. An intra-training-run worm with a fitness function is a genuinely novel artifact even if every component of it is thirty years old.

Operationally, a short list of questions worth asking before the next run:

- Does the env execute as root in the container? Usually yes.
- Does the scorer touch attacker-controlled strings via `exec`, `eval`, `yaml.load`, `pickle.loads`, `subprocess.run(..., shell=True)`? Usually at least one.
- Is there outbound from the training node? Yes, because pip.
- Does anything survive `env.reset()`? The ML people will swear no. The ops people will correct them.
- Is anyone grepping DNS, netflow, anything, during training? No.

None of this is research. It is attack-surface enumeration on a class of systems whose builders do not yet consider them attackable. The open question is how many runs, currently in progress on somebody's cluster, are already producing models that have quietly learned to touch the host ::because it made the loss go down::.

See also: [[harness as target]] for the specific case of the reward function as attack surface. [[silent failures]] for the broader pattern — RL training environments are systems with almost no observability where it matters. [[embedding pipelines]] for the same class of problem in a different domain.
