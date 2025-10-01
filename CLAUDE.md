# Mintlify Documentation Project - Claude Guide

## Project Overview

This is a Mintlify documentation site for Formal, structured with MDX documentation pages, reusable snippets, and configured via `docs.json`. All automation scripts are written in TypeScript and run with Bun for optimal performance.

## Technical Stack

- **Framework**: Mintlify (Next.js based)
- **Runtime**: Bun (for all scripts)
- **Languages**: TypeScript (scripts), MDX (documentation)
- **Package Manager**: pnpm
- **API Generation**: protoc + protoc-gen-connect-openapi + Buf Registry

## File Structure

```
/
├── docs.json                      # Main configuration (navigation, theme, colors)
├── package.json                   # Scripts use Bun
├── scripts/
│   ├── sync-api-docs.sh          # Main API sync orchestrator (Bash)
│   ├── check-dead-links.ts       # Dead link checker (TypeScript/Bun)
│   ├── enhance-openapi-specs.ts  # Add error codes & examples (TypeScript/Bun)
│   └── generate-api-navigation.ts # Update docs.json navigation (TypeScript/Bun)
├── docs/
│   ├── guides/                   # User guides
│   ├── api/
│   │   ├── introduction.mdx      # API overview
│   │   └── openapi/              # Generated OpenAPI specs (24 services)
│   ├── glossary/
│   │   └── index.mdx             # 40+ terms defined
│   └── changelog/                # Product changelogs (4 products)
├── legacy-docs/                   # Historical documentation
└── snippets/                      # Reusable MDX components
```

**IMPORTANT**: All MDX documentation files MUST be placed inside the `/docs` folder for centralization. This includes guides, API documentation, glossary, and changelogs. The only exceptions are:

- `/legacy-docs` - Historical documentation (for reference only)
- `/snippets` - Reusable MDX components (not standalone pages)

## Development Workflow

### Running Scripts with Bun

All TypeScript scripts must be run with Bun:

```bash
# Check for dead links
bun run scripts/check-dead-links.ts

# Enhance OpenAPI specs
bun run scripts/enhance-openapi-specs.ts

# Generate API navigation
bun run scripts/generate-api-navigation.ts

# Or use npm scripts (which use Bun internally)
bun run check-links
bun run sync-api-docs
```

### Local Development

```bash
# Start Mintlify dev server
mintlify dev
# or
bun run dev

# Sync API docs and start dev server
bun run docs:sync

# Build for production
bun run docs:build
```

## API Documentation Generation

### Overview

API documentation is automatically generated from protobuf definitions in the Buf Registry:

```
Buf Registry → protoc → OpenAPI v3 → Enhancement → Mintlify
```

### Process

1. **Export Proto Files**: `buf export buf.build/formal/core`
2. **Generate OpenAPI**: `protoc` with `protoc-gen-connect-openapi` plugin
3. **Enhance Specs**: Add error responses (400, 401, 403, 404, 500) and code samples
4. **Update Navigation**: Regenerate `docs.json` with all services
5. **Render**: Mintlify auto-generates pages from OpenAPI specs

### Running API Sync

```bash
# Full API sync (runs all steps above)
bash scripts/sync-api-docs.sh
# or
bun run sync-api-docs
```

### Generated Content

- **24 OpenAPI Specs**: One per service (connectors, users, policies, etc.)
- **All Response Codes**: 200, 400, 401, 403, 404, 500
- **Code Examples**: curl, JavaScript, Python, Go
- **Auto-generated Pages**: Mintlify creates pages for all operations

### Service Categories

Services are automatically organized into 6 categories:

- Infrastructure (4 services)
- Identity & Access (4 services)
- Security & Governance (5 services)
- Data Management (3 services)
- Integrations (6 services)
- Automation (2 services)

## Configuration (`docs.json`)

### Current Setup

- **Theme**: mint
- **Name**: Formal
- **Colors**: Primary (#3D6EFF), Light (#345DD9), Dark (#2847A6)
- **Navigation**: 5 tabs (Guides, API Reference, Glossary, Changelog, Legacy Docs)
- **API Version**: v1
- **Base URL**: https://api.joinformal.com

### OpenAPI Configuration

```json
{
  "tab": "API Reference",
  "openapi": [
    "docs/api/openapi/connectors_openapi.json",
    "docs/api/openapi/user_openapi.json"
    // ... 22 more services
  ],
  "groups": [
    {
      "group": "API Documentation",
      "pages": ["docs/api/introduction"]
    }
  ]
}
```

**Important**: Mintlify auto-generates pages from the `openapi` array. Don't manually list them in `pages` arrays.

## Common Tasks

### 1. Add a New Documentation Page

1. Create the MDX file:

   ```bash
   touch docs/guides/new-guide.mdx
   ```

2. Add frontmatter:

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
     "pages": ["docs/guides/getting-started/index", "docs/guides/new-guide"]
   }
   ```

### 2. Update API Documentation

When protobuf definitions change:

```bash
# Sync from Buf Registry
bun run sync-api-docs

# This will:
# - Export latest proto files
# - Regenerate OpenAPI specs
# - Add error responses & code samples
# - Update docs.json navigation
```

### 3. Check for Dead Links

```bash
# Run link checker
bun run check-links

# Scans:
# - All MDX files for broken links
# - docs.json for invalid page references
# - Both absolute and relative paths
```

### 4. Update Changelog

Edit the appropriate changelog file:

```mdx
---
title: "Connector"
---

<Update label="January 15, 2025" tags={["New Features", "Bug Fixes"]}>

## 1.26.0

**New**

- Added support for new database type

**Fixed**

- Fixed connection timeout issue

</Update>
```

Files:

- `docs/changelog/connector.mdx`
- `docs/changelog/api.mdx`
- `docs/changelog/desktop-app.mdx`
- `docs/changelog/terraform-provider.mdx`

### 5. Update Glossary

Edit `docs/glossary/index.mdx` with new terms. Terms are organized into sections:

- Getting Started
- Deployment & Architecture
- Access & Authentication
- Policies & Rules
- Data Governance
- Logging & Compliance
- Integrations
- Advanced Concepts

### 6. Use Reusable Snippets

**Create snippet** (`snippets/my-snippet.mdx`):

```mdx
export const companyName = "Formal";

This is reusable content about {props.topic}.
```

**Use snippet** in any page:

```mdx
import { companyName } from "/snippets/my-snippet.mdx";
import MySnippet from "/snippets/my-snippet.mdx";

Welcome to {companyName}!

<MySnippet topic="documentation" />
```

## Automation & CI/CD

### GitHub Actions

Two workflows in `.github/workflows/`:

**1. Sync API Docs** (`sync-api-docs.yml`)

- Triggers: Daily at 2 AM UTC, manual, on proto changes
- Exports proto from Buf Registry
- Generates OpenAPI specs
- Enhances with error codes and examples
- Creates PR with changes

**2. Check Links** (`check-links.yml`)

- Triggers: On PR with doc changes
- Scans all files for dead links
- Reports failures as PR comments

### Scripts Reference

| Script                       | Language   | Purpose                     |
| ---------------------------- | ---------- | --------------------------- |
| `sync-api-docs.sh`           | Bash       | Orchestrates API generation |
| `check-dead-links.ts`        | TypeScript | Finds broken links          |
| `enhance-openapi-specs.ts`   | TypeScript | Adds errors & examples      |
| `generate-api-navigation.ts` | TypeScript | Updates docs.json           |

**All TypeScript scripts run with Bun** for maximum performance.

## Navigation Patterns

### Tabs (Top-level navigation)

```json
{
  "tab": "Guides",
  "url": "docs/guides/getting-started/index",
  "groups": [...]
}
```

### Groups (Sidebar sections)

```json
{
  "group": "Getting started",
  "icon": "rocket",
  "expanded": true,
  "pages": ["docs/guides/getting-started/index"]
}
```

### OpenAPI Auto-generation

Mintlify automatically generates pages for all operations in OpenAPI specs listed in the `openapi` array. No need to manually create pages.

## Important Notes

### General

- All scripts use **Bun** as the runtime (not Node.js)
- Scripts are written in **TypeScript** with Bun-specific APIs
- Page paths in `docs.json` don't need `.mdx` extension
- Navigation is recursive—groups can nest infinitely
- Hidden pages (not in `docs.json`) are still searchable

### API Documentation

- Mintlify reads OpenAPI specs from the `openapi` array
- Don't list OpenAPI files again in `pages` arrays (causes warnings)
- All services get error responses (400, 401, 403, 404, 500) automatically
- Code samples (curl, JS, Python, Go) are auto-injected

### File Organization

- **All MDX files must be in `/docs`** - This is a centralization requirement for all documentation
- `/api` is reserved by Next.js - use `/docs/api` instead
- Files in `/snippets/` won't render as standalone pages
- `/legacy-docs` is the only exception for historical documentation
- Store images in `/images/` or `/assets/`
- Use `/logo/dark.svg` and `/logo/light.svg` for theme switching

## Troubleshooting

### Dead Links Found

```bash
bun run check-links
# Review output and fix broken links
```

### API Generation Fails

```bash
# Check Buf access
buf registry login

# Check protoc is installed
brew install protobuf

# Check protoc-gen-connect-openapi is installed
go install github.com/sudorandom/protoc-gen-connect-openapi@latest
```

### Mintlify Warnings

If you see "Converting circular structure to JSON" warnings, check that OpenAPI specs are valid JSON:

```bash
jq -e . docs/api/openapi/*.json
```

## MCP Integration

Use the Context7 MCP server for Mintlify documentation:

```bash
mcp__context7__resolve-library-id --libraryName "mintlify"
mcp__context7__get-library-docs --context7CompatibleLibraryID "/mintlify/docs"
```

## Quick Reference

- **Mintlify Docs**: https://mintlify.com/docs
- **Buf Registry**: https://buf.build/formal/core
- **Context7 Library ID**: `/mintlify/docs`
- **Repository**: GitHub (formal/mint/docs)
- **Main Branch**: main
- **Runtime**: Bun 1.2.21+
- **Package Manager**: pnpm 9.0.0

## Pre-Commit Checks

The repository uses Husky to run automated checks before each commit:

### Automated Checks
1. **Prettier Formatting** - Auto-formats all staged `.md`, `.mdx`, `.json`, `.ts` files
2. **Spell Checking** - Validates spelling in documentation (cspell)
3. **Link Validation** - Ensures no broken internal links
4. **Asset Verification** - Checks that all referenced images exist

### Running Checks Manually

```bash
# Format code
pnpm prettier --write "**/*.{md,mdx,json,ts,tsx,js,jsx}"

# Check spelling
pnpm check-spelling

# Check for broken links
pnpm check-links

# Check for missing assets
pnpm check-assets

# Run all staged file checks
pnpm precommit
```

### Adding Custom Words to Spell Checker

Edit `cspell.json` and add words to the `words` array.

## Key Reminders

1. **Always use Bun** to run TypeScript scripts
2. **All MDX files must be in `/docs`** for centralization (except `/legacy-docs` and `/snippets`)
3. **Don't duplicate OpenAPI files** in `pages` arrays
4. **Run `bun run sync-api-docs`** after proto changes
5. **Pre-commit hooks will auto-format and validate** - fix any errors before committing
6. **All scripts are TypeScript** - no more JavaScript files
