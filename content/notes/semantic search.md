---
date: '2026-04-19'
description: how lexical and semantic search end up fighting each other
tags:
  - notes
  - search
  - retrieval
title: semantic search
---

Search in a garden like this one is a small problem wearing a trenchcoat. There is not that much content, queries are short, the corpus is English, and nobody is going to issue a query of the form *"show me every note that mentions jacobians but not GPUs"*. So the temptation is to reach for the biggest embedding model one can afford, embed everything, and call it a day.

That is mostly wrong. It is wrong for the same reason production search systems end up with hybrid retrieval: ==embeddings and lexical indexes have different failure modes==, and the union is smaller than either alone.

### what ::lexical search{h2}:: is good at

- exact phrases, rare tokens, identifiers — `env.reset()`, `libAFL`, `0xdeadbeef`
- typos caught by BM25's IDF dominance when the rare term is still present
- anything the author wrote in the same words they still use

### what lexical search is bad at

- paraphrase — the query says "reward hacking" but the note says "objective gaming"
- synonyms and compounds
- queries that describe a concept the note does not name explicitly

### what ::semantic search{h2}:: is good at

- paraphrase, obviously
- cross-language, to the extent the model was trained for it
- finding notes that are *about* the topic even when the topic word never appears

### what semantic search is bad at

- rare tokens and identifiers — the model has never seen the string and embeds it as whichever cluster of byte-pair tokens vaguely resemble it
- short queries — `e5-large` and `embeddinggemma` both degrade fast under ten tokens, and garden queries are always short
- drift across time as the corpus and the model age apart

So the practical answer is reciprocal rank fusion{{sidenotes[rrf]: `1 / (k + rank_lex) + 1 / (k + rank_sem)`, pick `k = 60`, stop thinking about it.}} over a small lexical index and a small ANN index. HNSW is fine at this scale; so is `ivfflat`. The model does not matter much — `e5-large` or `embeddinggemma-300m` both work — so long as the pipeline is honest about what each retriever is responsible for.

> [!tip] If one retriever disagrees with the other on the top result, trust the lexical side for identifiers and the semantic side for concepts.

Related: [[securing RL environments]] and [[harness as target]] — the same chunking bug that makes a scorer exploitable also makes an embedding pipeline silently drop tokens. An unlogged truncation in an embedding shard is a ::quiet loss of signal::{h3}, and quiet losses of signal are how production systems stop working without anyone noticing.
