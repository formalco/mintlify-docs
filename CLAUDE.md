# Formal Documentation - AI Agent Guide

## Project Overview

This is a Mintlify documentation site for Formal, structured with MDX documentation pages, reusable snippets, and configured via `docs.json`. All automation scripts are written in TypeScript and run with Bun for optimal performance.

## Technical Stack

- **Framework**: Mintlify (Next.js based)
- **Runtime**: Bun 1.2.21+ (for all scripts)
- **Languages**: TypeScript (scripts), MDX (documentation)
- **Package Manager**: pnpm 9.0.0
- **API Generation**: protoc + protoc-gen-connect-openapi + Buf Registry

---

# Authoring Rules & Conventions

> **Guide how to write pages right the first time. Surface as suggestions, not blockers.**

## 1. Page Purpose & Scope

**One outcome per page.** If a doc has two distinct outcomes, make two pages.

Start every page with:

```mdx
> **Outcome:** After this guide, you can <do the thing>.  
> **Prerequisites:** <account/role>, <tool versions>, <API access>.
```

## 2. Frontmatter Schema (Mintlify)

Keep title ≤ 65 chars (imperative voice). Slug ≤ 60 chars (kebab-case).

Always include `icon`. Add `redirect_from` when moving pages.

```mdx
---
title: Deploy on Vercel
description: Deploy a Next.js app on Vercel using Formal APIs.
icon: rocket
---
```

**Rules:**

- Title is imperative (no gerunds): "Deploy", not "Deploying"
- When renaming, add all old paths to `redirect_from`

## 3. Headings & Structure

Exactly one H1 (from the title). No skipped heading levels.

**Sections ordered:**

1. Why / Outcome
2. Prerequisites
3. Steps (numbered)
4. Verification (prove it worked)
5. Troubleshooting
6. Next steps

**Example:**

```mdx
## Steps

1. Configure OAuth app
2. Set environment variables
3. Deploy to Vercel

## Verify

\`\`\`bash
curl -I https://api.joinformal.com/health
\`\`\`

## Troubleshooting

<AccordionGroup>
  <Accordion title="Connection timeout">
    **Cause:** Firewall blocking port 443 **Fix:** Whitelist api.joinformal.com
  </Accordion>
</AccordionGroup>
```

## 4. Language & Voice

- Use **second person** ("you"), **present tense**, **active voice**
- Sentences ≤ **20 words**. Prefer examples over adjectives
- **UI text in bold**, paths/flags in `code`, filenames in `code`

**Good:** "Click **Create Connector** and enter your hostname."
**Bad:** "You will then be clicking on the Create Connector button and subsequently entering the hostname."

## 5. Links

**Internal links:** Use absolute paths from root

```mdx
See [Configure OAuth](/docs/guides/integrations/sso)
```

**External links:** Add 5-10 word reason

```mdx
See [Vercel build limits](https://vercel.com/docs/limits) (size & concurrency)
```

## 6. Images & Media

Include only if it adds non-obvious info. **Crop** to relevant UI. Hide PII.

- **SVG** for diagrams
- **PNG** for UI screenshots
- **MP4** for short flows (≤30s)

**Alt text** describes **purpose** (≥ 3 meaningful words).

```mdx
![Create OAuth app with callback URL](/assets/images/logs.png)
```

## 7. Code Blocks

Every fenced block declares a language and is **copy-pastable**.

Prefer one minimal complete snippet over many partials.

Use placeholders like `<YOUR_API_KEY>`; never real secrets.

Show expected output when it proves success.

```bash
export NEXT_PUBLIC_API_URL="https://api.joinformal.com"
curl -s "$NEXT_PUBLIC_API_URL/health" | jq .
# Expected: {"status":"ok"}
```

**Multi-language parity:** If you show tabs, ensure identical step parity.

Order: **curl → JS/TS → Python → Go**

<function_calls>
<invoke name="Tabs">
<Tab title="curl">
`bash
    curl -H "Authorization: Bearer <YOUR_API_KEY>" \
      https://api.joinformal.com/v1/users
    `
</Tab>
<Tab title="JavaScript">
``ts
    const res = await fetch("/v1/users", {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    ``
</Tab>
</Tabs>

## 8. API-Backed Accuracy

Names must match **OpenAPI and UI literals exactly**.

When APIs/UI change, annotate with **Since/Deprecated** and link migration notes.

```mdx
<Note>**Since v1.26:** `includePolicies` defaults to `false`.</Note>
```

## 9. Quickstarts vs. Deep Guides

**Quickstart:** Finishes in ≤ 10 minutes with a working result. Every step changes state and is verifiable.

**Deep guides:** Explain trade-offs and alternatives, but keep a runnable path.

## 10. SEO & Navigation

- Unique title + description per page
- Include 1 primary keyword once
- Keep URL depth ≤ 3 segments
- Update `docs.json` when adding pages

## 11. Style Conventions

- **Numbers:** Words for one–nine, numerals for 10+ (unless units)
- **Timezones:** Absolute times with timezone ("02:00 UTC")
- **Avoid:** "soon", "later", "we will"—be concrete or omit

## 12. Changelog & Glossary

- User-visible behavior changes → add changelog entry same PR
- Glossary terms: Define in 1-2 sentences, cross-link first uses with `<G>` component

---

# MDX Patterns (Copy-Ready)

## Admonitions

```mdx
<Warning>
  Rotating keys invalidates existing sessions. Schedule a maintenance window.
</Warning>

<Tip>Use a service account in CI; avoid personal tokens.</Tip>

<Note>
  Formal stores logs indefinitely unless custom retention is specified.
</Note>
```

## Tabs (Language Parity)

````mdx
<Tabs>
  <Tab title="curl">
    ```bash
    curl -H "Authorization: Bearer <KEY>" https://api.joinformal.com/v1/users
    ```
  </Tab>
  <Tab title="JavaScript">
    ```ts
    const res = await fetch("/v1/users", {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    ```
  </Tab>
</Tabs>
````

## Glossary Terms

```mdx
import { G } from "/snippets/glossary-terms.mdx";

Users connect through the <G anchor="connector">Connector</G> which enforces <G anchor="policy">policies</G>.
```

## Structured Step with Verify

````mdx
### 2. Create the OAuth app

1. Go to **Settings → Developer settings → OAuth Apps**
2. Click **New OAuth App**, set callback to `https://app.formal.com/callback`

**Verify**

```bash
curl -I https://app.formal.com/callback/test
```
````

````

---

# Repository-Specific Rules

## Folder & Naming

- **All MDX under `/docs`** (except `/legacy-docs` and `/snippets`)
- Filenames: `kebab-case.mdx`
- Index pages use `index.mdx`
- Images in `/assets/images` with **absolute paths** from root: `/assets/images/file.png`
- Use `/assets/logos/dark.svg` and `/assets/logos/light.svg` for theming

## OpenAPI Content

- Do **not** list OpenAPI-generated pages in `pages` arrays
- Error responses included: **400, 401, 403, 404, 500** (enforced by script)
- Code samples: curl, JS, Python, Go—**keep them runnable**

## docs.json Rules

**Tabs:** Documentation, API Reference, Glossary, Changelog

**Groups** nest as needed; keep names imperative or noun-phrase.

Only add explicit `pages` for **hand-written** docs; OpenAPI is auto-added.

**Example:**

```json
{
  "tab": "Documentation",
  "groups": [
    {
      "group": "Getting Started",
      "pages": [
        "docs/guides/getting-started/index",
        "docs/guides/getting-started/quickstart"
      ]
    }
  ]
}
````

---

# Pre-Commit Checks

The repository uses Husky to run automated checks before each commit on `/docs`, `/assets`, and `/snippets` folders:

## Automated Checks

1. **Prettier Formatting** - Checks formatting in content folders (`.md`, `.mdx` files)
2. **Spell Checking** - Validates spelling in documentation (cspell)
3. **Link Validation** - Ensures no broken internal links
4. **Asset Verification** - Checks that all referenced images exist

## Running Checks Manually

```bash
# Run all pre-commit checks (same as pre-commit hook)
pnpm precommit

# Individual checks:
# Format content files
pnpm format

# Check formatting without modifying
pnpm format-check

# Check spelling
pnpm check-spelling

# Check for broken links
pnpm check-links

# Check for missing assets
pnpm check-assets
```

## Adding Custom Words to Spell Checker

Edit `cspell.json` and add words to the `words` array.

---

# API Documentation Generation

## Overview

API documentation is automatically generated from protobuf definitions in the Buf Registry:

```
Buf Registry → protoc → OpenAPI v3 → Enhancement → Mintlify
```

## Process

1. **Export Proto Files**: `buf export buf.build/formal/core`
2. **Generate OpenAPI**: `protoc` with `protoc-gen-connect-openapi` plugin
3. **Enhance Specs**: Add error responses and code samples
4. **Update Navigation**: Regenerate `docs.json` with all services
5. **Render**: Mintlify auto-generates pages from OpenAPI specs

## Running API Sync

```bash
# Full API sync (runs all steps above)
bash scripts/sync-api-docs.sh

# Or via npm script
bun run sync-api-docs
```

## Scripts

### 1. enhance-openapi-specs.ts

**Purpose:** Add error responses and improve OpenAPI specs

**What it does:**

- Adds standard error responses (400, 401, 403, 404, 500)
- Ensures all operations have unique `operationId`
- Sets proper `info.title` for each service

**Run:** `bun run scripts/enhance-openapi-specs.ts`

### 2. generate-api-navigation.ts

**Purpose:** Update `docs.json` with API navigation structure

**What it does:**

- Scans `docs/api/openapi/*.json` files
- Creates a group for each service
- Updates the API Reference tab in `docs.json`

**Run:** `bun run scripts/generate-api-navigation.ts`

### 3. check-dead-links.ts

**Purpose:** Find broken internal links

**What it does:**

- Scans all MDX files for links
- Validates links against `docs.json` and file system
- Reports broken links with file locations

**Run:** `bun run scripts/check-dead-links.ts`

### 4. check-assets.ts

**Purpose:** Verify all referenced images exist

**What it does:**

- Scans MDX files for image references
- Checks if image files exist in repository
- Reports missing assets

**Run:** `bun run scripts/check-assets.ts`

---

# Navigation Structure

## Current Tabs

1. **Documentation** - User guides, concepts, integrations, how-to
2. **API Reference** - Auto-generated from 24 OpenAPI specs
3. **Glossary** - 40+ terms with definitions
4. **Changelog** - Product release notes (Connector, API, Desktop App, Terraform)

## Documentation Groups

- Getting Started (4 pages)
- Core Concepts (6 pages)
- Policy Engine (4 pages)
- Integrations (7 pages)
- Observability (1 page)
- Configuration (4 pages)
- Client Tools (3 pages)
- How-To Guides (7 pages)

---

# Quick Reference

- **Mintlify Docs**: https://mintlify.com/docs
- **Buf Registry**: https://buf.build/formal/core
- **Repository**: GitHub (formal/mint/docs)
- **Main Branch**: main
- **Runtime**: Bun 1.2.21+
- **Package Manager**: pnpm 9.0.0

---

# AI Agent Instructions

## When Creating/Editing Pages

1. **Suggest (don't block)** concrete improvements with one example per suggestion
2. **Ensure** page follows Authoring Rules & Conventions
3. **Check:**
   - One outcome per page
   - Title ≤65 chars (imperative), description present
   - Steps are numbered and verifiable
   - Code blocks are typed and copy-pastable
   - Images have meaningful alt text
   - Navigation updated if new page
   - Changelog updated if behavior changed

4. **Prefer fixes that reduce words while increasing certainty and verifiability**

## Inline Suggestions

- Add outcome/prerequisite block if missing
- Suggest "Verify" steps for each numbered step
- Improve alt-text with purpose-focused descriptions
- Add multi-language parity for code examples
- Flag missing redirects on moved pages

## Key Reminders

1. **Always use Bun** to run TypeScript scripts
2. **All MDX files must be in `/docs`** for centralization (except `/legacy-docs` and `/snippets`)
3. **Don't duplicate OpenAPI files** in `pages` arrays
4. **Run `bun run sync-api-docs`** after proto changes
5. **Pre-commit hooks will auto-format and validate** - fix any errors before committing
6. **All scripts are TypeScript** - no more JavaScript files
7. **Use `<G>` component** for glossary term links
8. **Images use absolute paths** from root: `/assets/images/file.png`

---

# First Draft Checklist

Quick checklist for new pages:

- [ ] Outcome & prerequisites added
- [ ] Single clear outcome; short intro
- [ ] Steps (numbered) with verify commands
- [ ] Code typed, runnable, minimal complete example
- [ ] Internal links absolute, external links justified
- [ ] Images (if any) cropped, alt meaningful, asset exists
- [ ] Title/description/frontmatter set
- [ ] If behavior changed: changelog + callouts
- [ ] Glossary terms linked with `<G>` component
- [ ] Navigation updated in `docs.json`
