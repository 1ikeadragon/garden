---
date: '2026-04-19'
title: harness as target
description: the reward scorer is a program, and programs are attack surface
tags:
  - notes
  - reinforcement learning
  - security
---

A separate note for a point that was buried in [[securing RL environments]] and deserves its own heading: the reward harness is the most underappreciated attack surface in modern RL.

Definitions, briefly. The ==harness== is whatever code consumes a policy's output and returns a scalar. In agentic RL that code is typically Python, typically in the same container as the policy, typically written by the same person who wrote the env, and typically not reviewed by anyone who does security work for a living.

> [!warning] common patterns one will actually find in public envs
> - `yaml.load` (unsafe loader, parses arbitrary Python objects)
> - `eval` on a regex-stripped substring of policy output
> - `pickle.loads` of per-episode state with no integrity check
> - `subprocess.run(cmd, shell=True)` where `cmd` is a format-string over agent output
> - `json.loads` followed by `getattr(module, user_controlled_name)(...)`

Each of these is a memorised CVE class from 2007 and each of them is perfectly reproducible in a reward function written last month. The policy does not care that the bug is twenty years old. It cares that emitting the right string makes the loss go down.

What makes this different from the usual web-app version of the same bug:

1. **The attacker is patient and cheap.** Every gradient step is another attempt. A curious analogy is fuzzing, except the fuzzer is conditioned on a reward signal that rewards successful exploitation over random input. So ::grammatically valid{h2}:: exploits are found first.
2. **The attacker learns the layout.** A policy that accidentally finds a `pickle` gadget once will be rewarded for finding it again. The gadget becomes a feature of the trained model, not a fluke of one rollout.
3. **The artifact is a model, not a log line.** A web pentest produces a report; an RL training run produces weights. Those weights encode whatever host-touching behaviour correlated with reward, and they ship.

{{sidenotes[report]: One could argue the weights are the report. One can also argue the weights are the payload. Both things are true.}}

### a minimal thing to do today

If you maintain an RL env, grep your own reward function for:

```
eval(
exec(
yaml.load(
pickle.load
subprocess.*shell=True
os.system(
```

Every hit is a place the policy can be expected to eventually reach. Fix the ones where the input is derived from the agent's output; the rest are your problem but not your policy's.

---

Further reading: [[securing RL environments]]. Less directly: [[semantic search]] — similar failure mode of *pipeline-as-attack-surface*, different domain.
