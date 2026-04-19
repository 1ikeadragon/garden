# garden

Quartz-based digital garden. Forked and rearranged from [aarnphm/aarnphm.github.io](https://github.com/aarnphm/aarnphm.github.io). Custom plugins, Cloudflare Worker backend, a handful of markdown extensions that Obsidian users will recognize plus a few of Aaron's own.

Local dev: `./quartz/dev.ts`.

---

## Markdown reference

This file exists to remember what actually works in content. Nothing below is aspirational — every syntax here is wired up in [quartz/plugins/transformers/](quartz/plugins/transformers/) or [quartz/extensions/](quartz/extensions/).

### Frontmatter

```yaml
---
date: '2026-04-19'
title: Page title
description: one-line page summary
tags:
  - tag-one
  - tag-two
---
```

`date` and `title` are the only real load-bearing fields. Everything else is optional.

### Links

| Syntax | What it is |
|---|---|
| `[[Page]]` | Obsidian-style wikilink, resolves by slug |
| `[[Page\|alias]]` | Wikilink with display text |
| `[[Page#Heading]]` | Wikilink to a heading inside another page |
| `[[#Heading]]` | Section link inside current page |
| `[text](url)` | Regular markdown link |
| `![[path/image.webp]]` | Image / asset transclusion |
| `![[Page]]` | Full-page transclusion |

### Highlights and markers

`==text==` → yellow highlight (`<mark>`). Standard Obsidian.

`::text::` → "crayon" marker — the hand-drawn-looking underline Aaron uses for soft emphasis. Defaults to intensity `h3`.

`::text{h1}::` through `::text{h7}::` → crayon at explicit intensity. Pick based on how loud you want it; `h1` is strongest, `h7` is barely there.

Examples:

```markdown
Standard thinking is that ==reward hacking== is the main risk.
The interesting part is that the substrate is ::code::, and code has ::bugs{h1}::.
```

### Callouts

Obsidian callout syntax. Prefix is `> [!type]` on the first line.

| Type | Aliases |
|---|---|
| `note` | — |
| `abstract` | `summary`, `tldr` |
| `info` | — |
| `todo` | — |
| `tip` | `hint`, `important` |
| `success` | `check`, `done` |
| `question` | `help`, `faq` |
| `warning` | `attention`, `caution` |
| `failure` | `missing`, `fail` |
| `danger` | `error` |
| `bug` | — |
| `example` | — |
| `quote` | `cite` |

Modifiers:

- `> [!note]+` — open by default (collapsible)
- `> [!note]-` — collapsed by default
- `> [!note] Custom title` — override the default title

```markdown
> [!warning] Trust boundary
> Reward harnesses that `exec` policy output are RCE targets by construction.

> [!quote]-
> "All is built on sand but we must build as if the sand were stone."
```

### Sidenotes

Tufte-style margin notes via the custom `micromark-extension-ofm-sidenotes` extension.

```markdown
The optimizer is the attacker{{sidenotes[case]: not metaphorically — the gradient genuinely searches for exploits.}}, and the reward function is code.
```

Inline variant (forces rendering inline instead of in the margin):

```markdown
The env{{sidenotes<inline: true>[env]: container, shell, network, persistence.}} has a wide surface.
```

Split form — reference first, body elsewhere in the document:

```markdown
something happens here{{sidenotes[^later]}} ... later on ... {{sidenotes[later]}}:
the long explanation lives down here.
```

### Footnotes

Standard pandoc-style:

```markdown
The policy learns to exploit the parser[^harness].

[^harness]: See `harness.py::score` — it calls `eval` on policy output.
```

Inline footnote (gets auto-lifted to a numbered def):

```markdown
The egress channel ^[outbound DNS from the training container] is the exfil path.
```

### Citations

Pandoc bibliography style, pulls from [content/References.bib](content/References.bib).

```markdown
Per [@shao2024deepseekmathpushinglimitsmathematical], GRPO removes the critic.
Multiple: [@kierkegaard1847worksoflove; @fromm1956art].
```

### Tags

Inline hashtags get picked up as page tags:

```markdown
Relevant to #reinforcement-learning and #security/offensive.
```

Slash-separated tags (`#security/offensive`) nest in the tag tree.

### Block references

Attach an id to a block so it can be transcluded:

```markdown
This sentence is the target. ^key-observation
```

Then reference from anywhere: `![[page#^key-observation]]`.

### Comments

Content between `%%` is stripped at parse time — won't render, won't show in search.

```markdown
%% this is a private note to myself and will not ship %%
```

### Math

Inline: `$f(x) = x^2$`. Display:

```markdown
$$
\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}\left[\sum_t \nabla_\theta \log \pi_\theta(a_t | s_t) \, R(\tau)\right]
$$
```

KaTeX under the hood. `customMacros` in [quartz.config.ts](quartz.config.ts) lets you define shortcuts.

### Arrows

Typographic shortcuts, rewritten at transform time:

| Source | Renders |
|---|---|
| `->` | → |
| `-->` | ⇒ |
| `=>` | ⇒ |
| `==>` | ⇒ |
| `<-` | ← |
| `<--` | ⇐ |
| `<=` | ⇐ |
| `<==` | ⇐ |

### Code

Fenced blocks with [Shiki](https://shiki.style) highlighting — standard `` ```lang `` works. Language hints beyond the common set: `mermaid`, `tikz`, `pseudo` (pseudocode rendering via [quartz/plugins/transformers/pseudocode.ts](quartz/plugins/transformers/pseudocode.ts)).

### Telescopic text

Progressively-expanding prose via [quartz/plugins/transformers/telescopic.ts](quartz/plugins/transformers/telescopic.ts) — port of [jackyzha0/telescopic-text](https://github.com/jackyzha0/telescopic-text). Useful for layering detail without losing the through-line.

---

## Credit

The heavy lifting — OFM extensions, sidenotes, telescopic, the callout styling, the crayon marker — is all [Aaron Pham's](https://github.com/aarnphm/aarnphm.github.io) work. This repo rearranges and extends.
