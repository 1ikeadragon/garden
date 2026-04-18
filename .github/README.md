Garden forked from Aaron Pham's design. I suck at design but I have taste so making the most of the fork button. Credit where due.

## Writing

All content lives under `content/` as Markdown files.

### Content types

| Type | Location | Purpose |
|------|----------|---------|
| Posts | `content/posts/*.md` | Blog posts, essays |
| Thoughts | `content/thoughts/*.md` | Longer reflections and ideas |
| On my mind | `content/on-my-mind/*.md` | What I'm currently thinking about |
| Letters | `content/letters/*.md` | Letter-format writing (`layout: letter` in front matter) |
| Library | `content/library/*.md` | Book notes and reviews |
| Projects | `content/projects/*.md` | Project documentation |
| Canvas | `content/*.canvas` | Visual knowledge maps (Obsidian Canvas JSON) |
| Base | `content/*.base` | Database views (Obsidian Bases YAML) |

### Front matter

Every file needs YAML front matter at the top:

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
| `tags` | no | List of tags — auto-generates tag pages and populates the grid on folder pages |
| `description` | no | Short summary, used in previews and meta tags |
| `draft` | no | Set to `true` to hide from listings |
| `layout` | no | Use `letter` for letter-format pages |
| `noindex` | no | Set to `true` to hide from folder listings |

### Type-specific examples

**Post** (`content/posts/my-post.md`):
```yaml
---
date: '2026-04-18'
title: My Post Title
tags:
  - essay
  - technical
---
Content here.
```

**Letter** (`content/letters/jan-2026.md`):
```yaml
---
date: '2026-01-01'
title: January Letter
layout: letter
tags:
  - letter
---
Content here.
```

**Library entry** (`content/library/book-name.md`):
```yaml
---
date: '2026-04-18'
title: "Book Title"
description: Author Name
tags:
  - book
---
Notes and highlights.
```

**Canvas** (`content/my-map.canvas`):
```json
{
  "nodes": [
    { "id": "a", "type": "text", "text": "Node content", "x": 0, "y": 0, "width": 400, "height": 200 }
  ],
  "edges": []
}
```

**Base** (`content/my-view.base`):
```yaml
views:
  - type: table
    name: All
    order:
      - title
      - date
      - tags
filters:
  and:
    - file.ext == "md"
```

### Tag grid behavior

Folder pages (e.g. `/posts/`, `/thoughts/`) automatically display a tag grid in the sidebar. The grid collects all tags from files in that folder and renders them as clickable tag links. As you add more tagged posts, the grid populates itself — no config changes needed.

### Content features

Standard Markdown plus:
- **Wikilinks**: `[[other-page]]` links to another content file
- **Callouts**: `> [!note]` / `> [!warning]` / `> [!info]` (Obsidian-style)
- **LaTeX**: `$inline$` and `$$block$$`
- **Code blocks**: triple backticks with language identifier
- **Sidenotes**: `{{sidenotes[label]: content}}`
- **Canvas embeds**: `![[my-map.canvas]]` embeds an interactive canvas in any page

### Workflow

1. Create or edit a `.md` file in the appropriate content directory
2. Push to `main`
3. GitHub Actions builds and deploys to GitHub Pages automatically

### Local dev

```
pnpm install
pnpm swarm
```
