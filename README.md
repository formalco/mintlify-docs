# Formal Documentation

Official documentation for [Formal](https://joinformal.com) - AI-powered Privileged Access Management (PAM) for modern data infrastructure.

**Live Site:** https://docs.joinformal.com

---

## 📚 What's Inside

- **43 documentation pages** covering getting started, core concepts, policies, integrations, and how-to guides
- **24 auto-generated API reference pages** from protobuf definitions
- **40+ glossary terms** with cross-linking
- **Product changelogs** for Connector, API, Desktop App, and Terraform Provider

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Bun 1.2.21+
- pnpm 9.0.0

### Installation

```bash
pnpm install
```

### Local Development

```bash
# Start Mintlify dev server
mintlify dev
# or
pnpm dev

# View at http://localhost:3000
```

### Sync API Documentation

```bash
# Generate API docs from Buf Registry
bun run sync-api-docs
```

---

## 📖 For Documentation Authors

We have comprehensive authoring guidelines for AI assistants and human writers:

### Agent Rules (AI Assistants)

- **[CLAUDE.md](./CLAUDE.md)** - Comprehensive guide for Claude and other AI agents
- **[AGENTS.md](./AGENTS.md)** - Quick reference for all AI coding assistants
- **[.cursorrules](./.cursorrules)** - Cursor AI specific rules

### Key Principles

1. **One outcome per page** - Every page should have a single, clear goal
2. **Verify every step** - Include verification commands after major actions
3. **Copy-pastable code** - All code blocks must be runnable with placeholders for secrets
4. **20-word sentences** - Keep writing concise and scannable
5. **Absolute links** - Use `/docs/guides/...` format for internal links

### Quick Checklist

When creating a new page:

- [ ] Outcome & prerequisites stated at top
- [ ] Title ≤65 chars, imperative voice
- [ ] Steps numbered with verify commands
- [ ] Code blocks typed and copy-pastable
- [ ] Images have meaningful alt text
- [ ] Glossary terms linked with `<G>` component
- [ ] Navigation updated in `docs.json`

See [AGENTS.md](./AGENTS.md) for full authoring guidelines.

---

## 🗂️ File Structure

```
/
├── docs.json                      # Navigation, theme, colors
├── .cursorrules                   # Cursor AI rules
├── CLAUDE.md                      # Claude AI guide
├── AGENTS.md                      # AI agents guide
├── PRE_COMMIT_SETUP.md           # Pre-commit hooks documentation
├── package.json                   # Scripts (use Bun)
├── cspell.json                    # Spell checker config
├── scripts/
│   ├── sync-api-docs.sh          # API sync orchestrator
│   ├── check-dead-links.ts       # Link validator
│   ├── check-assets.ts           # Image verification
│   ├── enhance-openapi-specs.ts  # OpenAPI post-processor
│   └── generate-api-navigation.ts # Navigation generator
├── docs/
│   ├── guides/                   # User documentation
│   │   ├── getting-started/      # 4 pages
│   │   ├── core-concepts/        # 6 pages
│   │   ├── policies/             # 4 pages
│   │   ├── integrations/         # 7 pages
│   │   ├── observability/        # 1 page
│   │   ├── configuration/        # 4 pages
│   │   ├── client-tools/         # 3 pages
│   │   └── how-to/               # 7 pages
│   ├── api/
│   │   ├── introduction.mdx      # API overview
│   │   └── openapi/              # 24 auto-generated services
│   ├── glossary/
│   │   └── index.mdx             # 40+ terms
│   └── changelog/
│       ├── index.mdx
│       ├── connector.mdx
│       ├── api.mdx
│       ├── desktop-app.mdx
│       └── terraform-provider.mdx
├── assets/
│   ├── images/                   # Screenshots, diagrams
│   └── logos/                    # Dark/light logos
├── snippets/
│   ├── snippet-intro.mdx
│   └── glossary-terms.mdx        # Glossary link component
└── legacy-docs/                   # Historical docs (reference only)
```

---

## 🛠️ Available Scripts

### Development

```bash
pnpm dev                # Start Mintlify dev server
bun run sync-api-docs   # Sync API docs from Buf Registry
```

### Quality Checks

```bash
pnpm check-links        # Find broken internal links
pnpm check-spelling     # Check spelling with cspell
pnpm check-assets       # Verify all images exist
pnpm precommit          # Run lint-staged (format + spell)
```

### Formatting

```bash
pnpm prettier --write "**/*.{md,mdx,json,ts,tsx,js,jsx}"
```

---

## 🔍 Pre-Commit Checks

Husky runs automated checks before each commit:

1. ✅ **Prettier formatting** - Auto-formats staged files
2. ✅ **Spell checking** - Validates spelling (cspell)
3. ✅ **Link validation** - Ensures no broken links
4. ✅ **Asset verification** - Checks images exist

**If any check fails, the commit is aborted.**

See [PRE_COMMIT_SETUP.md](./PRE_COMMIT_SETUP.md) for details.

### Adding Custom Words

Edit `cspell.json` and add to the `words` array:

```json
{
  "words": [
    "PostgreSQL",
    "YourCustomTerm"
  ]
}
```

---

## 📝 Writing Documentation

### Creating a New Page

1. **Create MDX file** in `/docs/guides/category/`

```mdx
---
title: Deploy Connector on AWS
description: Deploy a Formal Connector on AWS ECS Fargate
icon: aws
---

> **Outcome:** After this guide, you can deploy a Connector on AWS ECS.  
> **Prerequisites:** AWS account, Terraform CLI, Formal API key.

## Steps

### 1. Configure Infrastructure

[Instructions]

**Verify:**
\`\`\`bash
terraform plan
\`\`\`
```

2. **Add to navigation** in `docs.json`:

```json
{
  "group": "Category Name",
  "pages": [
    "docs/guides/category/your-new-page"
  ]
}
```

3. **Test locally:**

```bash
pnpm dev
```

### Using MDX Components

#### Glossary Terms

```mdx
import { G } from "/snippets/glossary-terms.mdx";

The <G anchor="connector">Connector</G> enforces <G anchor="policy">policies</G>.
```

#### Admonitions

```mdx
<Warning>
Rotating keys invalidates sessions.
</Warning>

<Tip>
Use service accounts in CI.
</Tip>
```

#### Code Tabs

```mdx
<Tabs>
  <Tab title="curl">
    ```bash
    curl https://api.joinformal.com/v1/users
    ```
  </Tab>
  <Tab title="JavaScript">
    ```ts
    const res = await fetch("/v1/users");
    ```
  </Tab>
</Tabs>
```

---

## 🤖 API Documentation

API docs are **auto-generated** from protobuf definitions in the [Buf Registry](https://buf.build/formal/core).

### Update Process

```bash
bun run sync-api-docs
```

This:
1. Exports protobufs from `buf.build/formal/core`
2. Generates OpenAPI v3 specs (24 services)
3. Enhances with error codes and examples
4. Updates navigation in `docs.json`

**Never manually edit** files in `/docs/api/openapi/`

### Scripts

- `scripts/enhance-openapi-specs.ts` - Adds error responses (400, 401, 403, 404, 500)
- `scripts/generate-api-navigation.ts` - Updates `docs.json` with API groups
- `scripts/sync-api-docs.sh` - Orchestrates the full sync process

---

## 🏗️ Project Architecture

### Tech Stack

- **Mintlify** - Documentation framework (Next.js based)
- **MDX** - Markdown with React components
- **TypeScript** - All scripts
- **Bun** - Script runtime
- **pnpm** - Package manager
- **Husky** - Pre-commit hooks
- **Prettier** - Code formatting
- **cspell** - Spell checking

### Navigation Structure

Defined in `docs.json`:

- **Documentation** - User guides (8 groups, 43 pages)
- **API Reference** - Auto-generated (24 services)
- **Glossary** - Terms and definitions
- **Changelog** - Product release notes

---

## 🚢 Deployment

Changes are deployed automatically when pushed to `main`:

1. Push to `main` branch
2. GitHub App triggers Mintlify build
3. Deployed to production

**Live URL:** https://docs.joinformal.com

---

## 🆘 Troubleshooting

### Dev server not running

```bash
# Update Mintlify CLI
npm i -g mintlify@latest

# Restart dev server
pnpm dev
```

### Page shows 404

- Ensure page is added to `docs.json`
- Check file path matches navigation path
- File must be in `/docs/` directory

### API docs outdated

```bash
# Re-sync from Buf Registry
bun run sync-api-docs
```

### Pre-commit checks failing

```bash
# Run checks manually
pnpm check-spelling
pnpm check-links
pnpm check-assets

# Format code
pnpm prettier --write "**/*.{md,mdx,json,ts}"
```

---

## 📚 Resources

- **Mintlify Docs:** https://mintlify.com/docs
- **Buf Registry:** https://buf.build/formal/core
- **Formal Website:** https://joinformal.com
- **Formal App:** https://app.joinformal.com

---

## 📞 Support

- **Issues:** GitHub Issues on this repo
- **Questions:** #docs Slack channel
- **Email:** support@joinformal.com

---

## 📄 License

See [LICENSE](./LICENSE) file.

---

_For AI assistants: See [CLAUDE.md](./CLAUDE.md), [AGENTS.md](./AGENTS.md), or [.cursorrules](./.cursorrules) for comprehensive authoring guidelines._
