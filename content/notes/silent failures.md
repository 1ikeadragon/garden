---
date: '2026-04-18'
title: silent failures
description: systems that fail without telling anyone
draft: true
tags:
  - notes
  - engineering
  - observability
---

The most dangerous failures are the ones that do not look like failures. The system keeps running. The metrics stay green. The dashboards show normal throughput. Somewhere inside, a component is producing wrong results, and nothing downstream is checking.

Examples, from personal experience and from watching other people's incidents:

**Embedding truncation.** A model with a 512-token context window receives a 800-token chunk. The last 288 tokens are silently dropped. The resulting vector is valid — it just represents a different document than the one you stored. [[embedding pipelines]] covers this in detail. The fix is trivial (count tokens, log truncations), but the failure is invisible without it.

**Stale caches.** A feature flag changes. The cache does not invalidate. The system serves the old value for hours or days. The flag change "worked" in the control plane. The data plane disagrees. Nobody checks the data plane because the control plane said it worked.

**Schema drift.** A producer changes a field from required to optional. The consumer handles `null` by substituting a default. The default is wrong for 3% of cases. The 3% manifests as slightly degraded recommendations, which manifests as a 0.2% drop in click-through, which is within normal variance, which is therefore ignored.

**DNS resolution.** A service moves to a new IP. The old IP is decommissioned. A client with aggressive DNS caching continues to resolve the old IP. The connection times out. The client retries. The retry succeeds because the cache has expired by then. The timeout is logged at `debug` level. Nobody reads debug logs in production.

The pattern: every silent failure is a failure of ==observability at the boundary==. The component that fails does not report the failure. The component downstream does not validate its input. The monitoring system watches throughput and latency but not correctness.

> [!warning] If your system can produce wrong results without any metric changing, your metrics are measuring the wrong thing.

The operational principle: validate at every boundary where data crosses a trust domain. Not because the upstream is adversarial — because the upstream is software, and software has bugs, and bugs are silent until someone listens.

Related: [[securing RL environments]] — RL training is a system with almost no observability at the boundaries that matter. [[the-cost-of-shortcuts]] — every silent failure was a shortcut someone took on validation.
