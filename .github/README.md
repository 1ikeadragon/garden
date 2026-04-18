Garden forked from Aaron Pham's design. I suck at design but I have taste so making the most of the fork button. Credit where due.

## Writing

Posts live in `content/posts/` as Markdown files.

### Creating a post

Create a `.md` file in `content/posts/`. The filename becomes the URL slug (e.g., `my-post.md` → `/posts/my-post`).

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

| Field   | Required | Notes                                              |
|---------|----------|----------------------------------------------------|
| `title` | yes      | Displayed as the page heading                      |
| `date`  | yes      | `YYYY-MM-DD` format                                |
| `tags`  | no       | List of tags — used for filtering and tag pages     |
| `description` | no | Short summary, used in previews and meta tags  |
| `draft` | no       | Set to `true` to hide from listings                |

### Tag conventions

Use whatever makes sense. Some starting points: `essay`, `research`, `technical`, `personal`.

### Content features

Standard Markdown plus:
- **Wikilinks**: `[[other-page]]` links to another content file
- **Callouts**: `> [!note]` / `> [!warning]` / `> [!info]` (Obsidian-style)
- **LaTeX**: `$inline$` and `$$block$$`
- **Code blocks**: triple backticks with language identifier

### Workflow

1. Create or edit a `.md` file in `content/posts/`
2. Push to `main`
3. GitHub Actions builds and deploys to GitHub Pages automatically
