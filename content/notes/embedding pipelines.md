---
date: '2026-04-19'
title: embedding pipelines
draft: true
description: where embedding pipelines silently lose information
tags:
  - notes
  - search
  - ml
---

The pipeline between raw text and a stored vector has more joints than most people audit. Each joint is a place where information can be silently dropped, and silent drops are the worst kind of bug because the system keeps working — just worse.

A typical pipeline:

1. **Chunking.** Split the document into segments. Fixed-size windows, sentence boundaries, or semantic breaks. Every strategy has a failure mode: fixed windows split mid-sentence, sentence boundaries produce chunks of wildly varying length, semantic breaks depend on a model that is itself imperfect.

2. **Tokenisation.** The embedding model's tokeniser has a vocabulary. Tokens outside that vocabulary are split into byte-pair fragments. Rare identifiers — `env.reset()`, `CAP_SYS_ADMIN`, `0xdeadbeef` — become noise. This is the same failure mode [[semantic search]] describes for lexical-semantic disagreement, but it happens earlier and is harder to detect.

3. **Truncation.** Every model has a context window. If a chunk exceeds it, the tail is silently clipped. No error, no warning, no metric. The vector represents a prefix of the chunk and the rest is gone. At scale this is ==the most common source of retrieval degradation== and the least monitored.

4. **Normalisation.** L2-normalise the vector before storage. This is correct for cosine similarity but destroys magnitude information. If magnitude carried signal — and for some models it does — that signal is now gone.

5. **Quantisation.** Compress from float32 to int8 or binary. At small corpus sizes the quality loss is negligible. At large corpus sizes the quality loss is negligible. In between, there is a regime where it matters and nobody checks.

The operational lesson: instrument every joint. Count tokens before and after truncation. Log chunk lengths. Compare retrieval quality on a held-out set before and after each pipeline change. The alternative is [[harness as target|the harness-as-target problem]] applied to your own infrastructure: the pipeline is a program, programs have bugs, and the bugs are invisible because the output is a float vector that always looks plausible.

> [!tip] A truncation that drops the last 20% of a chunk is equivalent to a 20% data loss that never shows up in any dashboard.

Related: [[securing RL environments]] — the same class of silent failure, different domain. In RL the silent failure is a reward signal that includes host-side information; in search the silent failure is a vector that represents half a document.
