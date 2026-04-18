Garden forked from Aaron Pham's design. I suck at design but I have taste so making the most of the fork button. Credit where due.

## Writing

All content lives under `content/` as Markdown files.

### Content types

| Type | Location | Purpose |
|------|----------|---------|
| Posts | `content/posts/*.md` | Blog posts, essays |
| Thoughts | `content/thoughts/*.md` | Longer reflections and ideas |
| On my mind | `content/on-my-mind.md` | What I'm currently thinking about |
| Letters | `content/letters/*.md` | Letter-format writing (`layout: letter`) |
| Library | `content/library/*.md` | Book notes and reviews |
| Projects | `content/projects/*.md` | Project documentation |
| Canvas | `content/*.canvas` | Visual knowledge maps (Obsidian Canvas JSON) |
| Base | `content/*.base` | Database views (Obsidian Bases YAML) |

### Front matter

Every post needs YAML front matter at the top:

```yaml
---
date: '2026-03-15'
title: Post Title Here
tags:
  - essay
---
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Displayed as the page heading |
| `date` | yes | `YYYY-MM-DD` format |
| `tags` | no | List of tags, used for filtering and tag pages |
| `description` | no | Short summary, used in previews and meta tags |
| `draft` | no | Set to `true` to hide from listings |

### Content features

Standard Markdown plus:
- **Wikilinks**: `[[other-page]]` links to another content file
- **Callouts**: `> [!note]` / `> [!warning]` / `> [!info]` (Obsidian-style)
- **LaTeX**: `$inline$` and `$$block$$`
- **Code blocks**: triple backticks with language identifier
- **Sidenotes**: `{{sidenotes[label]: content}}`

### Workflow

1. Create or edit a `.md` file in the appropriate content directory
2. Push to `main`
3. GitHub Actions builds and deploys to GitHub Pages automatically

### Local dev

```
pnpm install
pnpm swarm
```
