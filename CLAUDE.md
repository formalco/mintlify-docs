# Mintlify Documentation Project - Claude Guide

## Project Overview

This is a Mintlify documentation site for Formal, structured with MDX documentation pages, reusable snippets, and configured via `docs.json`.

## File Structure

```
/
├── docs.json              # Main configuration file (navigation, theme, colors, etc.)
├── index.mdx              # Homepage
├── quickstart.mdx         # Getting started guide
├── development.mdx        # Local development instructions
├── favicon.svg            # Site favicon
├── logo/
│   ├── dark.svg          # Dark theme logo
│   └── light.svg         # Light theme logo
├── images/               # Screenshots and graphics
│   ├── hero-light.png
│   ├── hero-dark.png
│   └── checks-passed.png
├── snippets/             # Reusable content components
│   └── snippet-intro.mdx # Example snippet
├── essentials/           # Core customization documentation
│   ├── settings.mdx
│   ├── navigation.mdx
│   ├── markdown.mdx
│   ├── code.mdx
│   ├── images.mdx
│   └── reusable-snippets.mdx
├── api-reference/        # API documentation
│   ├── introduction.mdx
│   ├── openapi.json     # OpenAPI specification
│   └── endpoint/
│       ├── create.mdx
│       ├── get.mdx
│       ├── delete.mdx
│       └── webhook.mdx
└── ai-tools/            # AI tool integration guides
    ├── cursor.mdx
    ├── claude-code.mdx
    └── windsurf.mdx
```

## Configuration (`docs.json`)

### Current Setup

- **Theme**: mint
- **Name**: Formal
- **Colors**: Primary (#3D6EFF), Light (#345DD9), Dark (#2847A6)
- **Navigation Structure**: 3 tabs (Guides, API reference, Changelog)

### Navigation Structure

```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "Guides",
        "groups": [
          {
            "group": "Getting started",
            "pages": ["index", "quickstart", "development"]
          }
        ]
      }
    ],
    "global": {
      "anchors": [
        {
          "anchor": "Documentation",
          "href": "https://mintlify.com/docs",
          "icon": "book-open-cover"
        }
      ]
    }
  }
}
```

## Common Tasks

### 1. Add a New Page

1. Create the MDX file in the appropriate directory:

   ```bash
   # Example: Create a new guide page
   touch new-guide.mdx
   ```

2. Add frontmatter to the MDX file:

   ```mdx
   ---
   title: "Your Page Title"
   description: "Your page description"
   icon: "rocket"
   ---

   # Your content here
   ```

3. Add to `docs.json` navigation:
   ```json
   {
     "group": "Getting started",
     "pages": ["index", "quickstart", "development", "new-guide"]
   }
   ```

### 2. Create Nested Navigation

```json
{
  "group": "Parent Group",
  "pages": [
    "page1",
    {
      "group": "Nested Group",
      "icon": "folder",
      "pages": ["nested-page1", "nested-page2"]
    }
  ]
}
```

### 3. Use Reusable Snippets

**Create snippet** (`snippets/my-snippet.mdx`):

```mdx
export const companyName = "Formal";

This is reusable content about {props.topic}.
```

**Use snippet** in any page:

```mdx
---
title: "My Page"
---

import { companyName } from "/snippets/my-snippet.mdx";
import MySnippet from "/snippets/my-snippet.mdx";

Welcome to {companyName}!

<MySnippet topic="documentation" />
```

### 4. Organize with Folders

- Create folder: `mkdir my-folder`
- Create MDX file: `my-folder/my-page.mdx`
- Reference in `docs.json`: `"my-folder/my-page"`
- **Warning**: Cannot use `/api` as top-level folder (reserved by Next.js)

### 5. Add External Links

```json
{
  "tab": "Blog",
  "icon": "newspaper",
  "href": "https://external-link.com/blog"
}
```

### 6. Configure OpenAPI Endpoints

```json
{
  "group": "API reference",
  "openapi": "/api-reference/openapi.json",
  "pages": ["api-reference/introduction", "GET /users", "POST /users"]
}
```

### 7. Add Icons to Groups

```json
{
  "group": "Getting started",
  "icon": "rocket",
  "expanded": true,
  "pages": ["quickstart"]
}
```

### 8. Create Hidden Pages

- Create MDX file but don't add to `docs.json`
- Accessible via search and direct links only
- Useful for internal/reference pages

## Snippet Best Practices

### Types of Snippets

**1. Default Export (with props):**

```mdx
Hello world! This content uses {props.word}.
```

**2. Variable Export:**

```mdx
export const myName = "Formal";
export const myObject = { fruit: "strawberries" };

;
```

**3. Component Export:**

```mdx
export const MyComponent = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <p>Snippet content</p>
  </div>
);

;
```

**Important**: MDX doesn't compile inside arrow functions—use HTML or default exports for MDX syntax.

## Navigation Patterns

### Tabs (Top-level navigation)

- Create distinct sections with separate URL paths
- Display as horizontal navigation bar
- Can link to external URLs

### Groups (Sidebar sections)

- Organize pages into labeled sections
- Can be nested
- Support icons, tags, and expanded state

### Anchors (Persistent sidebar items)

- Always visible at top of sidebar
- Can link to pages or external resources
- Support global anchors (external only)

### Dropdowns (Expandable menus)

- Collapsible navigation sections
- Support nested groups

## Global Settings

### Contextual Options (Current Config)

```json
"contextual": {
  "options": [
    "copy",      // Copy code blocks
    "view",      // View source
    "chatgpt",   // ChatGPT integration
    "claude",    // Claude integration
    "perplexity",// Perplexity integration
    "mcp",       // MCP integration
    "cursor",    // Cursor integration
    "vscode"     // VS Code integration
  ]
}
```

### Footer Configuration

```json
"footer": {
  "socials": {
    "x": "https://x.com/joinformal",
    "github": "https://github.com/formalco",
    "linkedin": "https://linkedin.com/company/formalhq"
  }
}
```

### Navbar Configuration

```json
"navbar": {
  "links": [
    {
      "label": "Support",
      "href": "mailto:hi@mintlify.com"
    }
  ],
  "primary": {
    "type": "button",
    "label": "Dashboard",
    "href": "https://app.joinformal.com"
  }
}
```

## Development Workflow

1. **Local Development**: Run `mintlify dev` to preview changes
2. **Add Pages**: Create MDX files and update `docs.json`
3. **Use Snippets**: Store reusable content in `/snippets/`
4. **Test Navigation**: Verify all links work locally
5. **Commit Changes**: Git commit and push
6. **Deploy**: Auto-deploys via Mintlify platform

## Important Notes

- Files in `/snippets/` won't render as standalone pages
- Page paths in `docs.json` don't need `.mdx` extension
- Navigation is recursive—groups can nest infinitely
- Hidden pages (not in `docs.json`) are still accessible via search
- Use `/logo/dark.svg` and `/logo/light.svg` for theme switching
- Store images in `/images/` directory
- Use relative paths like `/images/my-image.png` in MDX

## MCP Integration

Use the Context7 MCP server for Mintlify documentation:

```bash
mcp__context7__resolve-library-id --libraryName "mintlify"
mcp__context7__get-library-docs --context7CompatibleLibraryID "/mintlify/docs"
```

## Quick Reference Links

- **Mintlify Docs**: https://mintlify.com/docs
- **Context7 Library ID**: `/mintlify/docs`
- **Current Branch**: main
- **Repository**: GitHub (formal/mint/docs)
