# Formal Documentation - AI Agents Guide

> **Purpose:** This guide helps AI coding assistants (Claude, Cursor, Copilot, etc.) write high-quality Formal documentation that follows our standards.

---

## Quick Start for AI Agents

When asked to create or edit documentation:

1. ✅ Follow the **Authoring Rules** below (suggest, don't block)
2. ✅ Use **MDX patterns** from this guide
3. ✅ Ensure **one outcome per page**
4. ✅ Make code **copy-pastable** with examples
5. ✅ Add **verification steps** for each major action
6. ✅ Keep sentences ≤ **20 words**

---

## Authoring Rules

### Page Structure

Every page should have:

```mdx
---
title: Deploy Connector on AWS
description: Deploy a Formal Connector on AWS ECS Fargate with Terraform
icon: aws
---

> **Outcome:** After this guide, you can deploy a Connector on AWS ECS.  
> **Prerequisites:** AWS account, Terraform CLI, Formal API key.

## Overview

[Brief 2-3 sentence explanation]

## Steps

### 1. Configure Terraform

[Instructions]

**Verify:**
\`\`\`bash
terraform plan
\`\`\`

### 2. Deploy Stack

[Instructions]

**Verify:**
\`\`\`bash
terraform apply
curl -I https://connector.example.com/health
\`\`\`

## Troubleshooting

<AccordionGroup>
  <Accordion title="Deployment fails">
    **Cause:** IAM permissions **Fix:** Add `ecs:CreateService` permission
  </Accordion>
</AccordionGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="Configure Policies" href="/docs/guides/policies/policies">
    Write access control rules
  </Card>
</CardGroup>
```

### Language Style

- **Voice:** Second person ("you"), present tense, active
- **Sentences:** ≤ 20 words
- **UI elements:** **Bold** ("Click **Create Connector**")
- **Code:** `inline code` for paths, flags, filenames
- **Numbers:** One-nine as words, 10+ as numerals

**Good Example:**

```mdx
Go to [Connectors](https://app.joinformal.com/connectors) and click **New Connector**. Enter your hostname in the **Name** field.
```

**Bad Example:**

```mdx
You will then proceed to navigate to the Connectors page where you will subsequently be clicking on the New Connector button and then entering the hostname into the name field.
```

### Code Blocks

Every code block must:

- Declare a language
- Be fully copy-pastable
- Use placeholders for secrets: `<YOUR_API_KEY>`
- Show expected output when it proves success

```bash
export FORMAL_API_KEY="<YOUR_API_KEY>"
curl -s https://api.joinformal.com/health | jq .
# Expected: {"status":"ok"}
```

**Multi-language tabs** (keep parity across all tabs):

````mdx
<Tabs>
  <Tab title="curl">
    ```bash
    curl -H "Authorization: Bearer <KEY>" \
      https://api.joinformal.com/v1/users
    ```
  </Tab>
  <Tab title="JavaScript">
    ```ts
    const res = await fetch("/v1/users", {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const users = await res.json();
    ```
  </Tab>
  <Tab title="Python">
    ```python
    import requests
    
    response = requests.get(
        "https://api.joinformal.com/v1/users",
        headers={"Authorization": f"Bearer {API_KEY}"}
    )
    users = response.json()
    ```
  </Tab>
</Tabs>
````

### Links

**Internal links:** Absolute paths from root

```mdx
See [Connector configuration](/docs/guides/core-concepts/connectors)
```

**External links:** Add brief context (5-10 words)

```mdx
See [AWS ECS task definitions](https://docs.aws.amazon.com/ecs/task-definitions.html) (CPU and memory limits)
```

### Images

Only include if adding non-obvious information.

- Crop to relevant UI
- Hide PII
- Use meaningful alt text (≥3 words describing purpose)
- Formats: SVG (diagrams), PNG (UI), MP4 (flows ≤30s)

```mdx
![Create Connector with listener on port 5432](/assets/images/formal_connector.png)
```

### Glossary Terms

Use the `<G>` component to link terms to the glossary:

```mdx
import { G } from "/snippets/glossary-terms.mdx";

The <G anchor="connector">Connector</G> enforces <G anchor="policy">policies</G> and logs all <G anchor="session">sessions</G>.
```

Available anchors: `connector`, `resource`, `policy`, `session`, `space`, `satellite`, `end-user-identity`, `native-user`, `rego`, `masking`, `pii`, `sso`, `mfa`, `control-plane`, `data-plane`

---

## MDX Component Patterns

### Admonitions

```mdx
<Warning>
  Rotating keys invalidates existing sessions. Schedule a maintenance window.
</Warning>

<Tip>Use a service account in CI; avoid personal tokens.</Tip>

<Note>**Since v1.26:** `includePolicies` defaults to `false`.</Note>
```

### Steps with Verification

````mdx
<Steps>
  <Step title="Create API Key">
    Go to [API Keys](https://app.joinformal.com/api-keys) and click **Create API
    Key**. **Verify:** ```bash export FORMAL_API_KEY="your-key-here" curl -H
    "Authorization: Bearer $FORMAL_API_KEY" \
    https://api.joinformal.com/v1/users ```
  </Step>
  <Step title="Configure Connector">
    Add the API key to your Connector environment variables. **Verify:** ```bash
    docker logs formal-connector | grep "Connected to Control Plane" ```
  </Step>
</Steps>
````

### Accordion (Troubleshooting)

```mdx
<AccordionGroup>
  <Accordion title="Connection timeout">
    **Possible causes:** - Firewall blocking port 443 - DNS not resolving
    **Solution:** 1. Whitelist `api.joinformal.com` 2. Verify DNS: `nslookup
    api.joinformal.com`
  </Accordion>

  <Accordion title="Authentication failed">
    **Possible causes:** - API key expired - Invalid key format **Solution:** 1.
    Generate new API key 2. Ensure no whitespace in key
  </Accordion>
</AccordionGroup>
```

### Card Groups (Next Steps)

```mdx
<CardGroup cols={2}>
  <Card
    title="Write Policies"
    icon="shield-check"
    href="/docs/guides/policies/policies"
  >
    Create access control rules
  </Card>
  <Card
    title="View Logs"
    icon="file-lines"
    href="/docs/guides/observability/logs"
  >
    Monitor all queries
  </Card>
  <Card
    title="Configure SSO"
    icon="right-to-bracket"
    href="/docs/guides/integrations/sso"
  >
    Enable single sign-on
  </Card>
  <Card
    title="Deploy Connector"
    icon="server"
    href="/docs/guides/core-concepts/connectors"
  >
    Set up infrastructure
  </Card>
</CardGroup>
```

---

## File Organization

### All MDX files go in `/docs`

```
/docs/
├── guides/
│   ├── getting-started/
│   ├── core-concepts/
│   ├── policies/
│   ├── integrations/
│   ├── configuration/
│   └── how-to/
├── api/
│   ├── introduction.mdx
│   └── openapi/          # Auto-generated, don't edit
├── glossary/
│   └── index.mdx
└── changelog/
    ├── index.mdx
    ├── connector.mdx
    ├── api.mdx
    └── desktop-app.mdx
```

**Exceptions:**

- `/legacy-docs` - Historical docs (reference only)
- `/snippets` - Reusable components (not pages)

### Filenames

- Use `kebab-case.mdx`
- Index pages: `index.mdx`
- No spaces, underscores, or capital letters

**Good:** `deploy-on-aws.mdx`, `what-is-formal.mdx`
**Bad:** `Deploy_On_AWS.mdx`, `what is formal.mdx`

### Images

- Store in `/assets/images/`
- Use absolute paths: `/assets/images/connector-create.png`
- Organize by feature: `/assets/images/connectors/`, `/assets/images/policies/`

---

## Frontmatter

Required fields:

```mdx
---
title: Deploy Connector on AWS
description: Deploy a Formal Connector on AWS ECS Fargate using Terraform
icon: aws
---
```

**Rules:**

- Title ≤ 65 characters, imperative voice
- Description ≤ 160 characters
- Icon from [Font Awesome](https://fontawesome.com/icons) or [Simple Icons](https://simpleicons.org/)

**Optional fields:**

```mdx
---
title: Page Title
description: Page description
icon: rocket
sidebarTitle: Short Title # For sidebar (if different)
---
```

---

## Navigation (docs.json)

### Adding a New Page

1. Create MDX file in `/docs/guides/...`
2. Add to `docs.json`:

```json
{
  "group": "Getting Started",
  "pages": [
    "docs/guides/getting-started/index",
    "docs/guides/getting-started/quickstart",
    "docs/guides/getting-started/your-new-page"
  ]
}
```

3. Do **not** add file extension (`.mdx`)
4. Use full path from root

### OpenAPI Pages

**Never** add OpenAPI-generated pages to `pages` arrays. They're auto-added by `scripts/generate-api-navigation.ts`.

---

## Verification Steps

Every major action should have a verification step:

````mdx
### 2. Deploy Connector

```bash
terraform apply
```
````

**Verify:**

```bash
# Check service is running
aws ecs describe-services --cluster formal --services formal-connector

# Test health endpoint
curl -I https://connector.example.com/health
# Expected: HTTP/1.1 200 OK
```

````

---

## When to Create New Pages

**Create a new page when:**
- The page has a single, distinct outcome
- Content is ≥ 300 words
- Topic deserves its own navigation entry

**Add to existing page when:**
- Content is a small variation of existing topic
- ≤ 2 paragraphs
- Closely related to existing content

---

## API Documentation

API pages are auto-generated from OpenAPI specs. To update:

```bash
bun run sync-api-docs
````

This:

1. Exports protobufs from Buf Registry
2. Generates OpenAPI v3 specs
3. Enhances with error codes and examples
4. Updates navigation in `docs.json`

**Don't manually edit** files in `/docs/api/openapi/`

---

## Pre-Commit Checks

Before committing, these checks run automatically:

1. **Prettier** - Auto-formats code
2. **cspell** - Checks spelling
3. **Link checker** - Finds broken links
4. **Asset checker** - Verifies images exist

Fix errors before committing.

**Manual checks:**

```bash
pnpm check-spelling    # Spell check
pnpm check-links       # Link validation
pnpm check-assets      # Image verification
```

---

## AI Agent Behavior

### Suggestions (Not Blockers)

When reviewing or creating content, **suggest** improvements but don't block:

- "Consider adding a verify step after deployment"
- "This sentence is 32 words; consider splitting"
- "Code block missing language tag"
- "Alt text could be more descriptive"

### Auto-Fixes

These can be applied automatically:

- Formatting (Prettier handles this)
- Adding language tags to code blocks
- Converting relative to absolute links
- Fixing heading hierarchy

### Flags (Require User Decision)

These need user input:

- Missing outcome/prerequisites
- Duplicate content across pages
- Missing verification steps
- Unclear instructions

---

## Quick Checklist

Use this when creating/editing pages:

- [ ] One clear outcome stated at top
- [ ] Title ≤65 chars, imperative voice
- [ ] Prerequisites minimal and linked
- [ ] Steps numbered with verification
- [ ] Code blocks typed and copy-pastable
- [ ] Images cropped, meaningful alt text
- [ ] Internal links absolute paths
- [ ] Glossary terms linked with `<G>`
- [ ] Navigation updated in `docs.json`
- [ ] Changelog updated (if behavior changed)

---

## Common Pitfalls

❌ **Don't:**

- Use gerunds in titles ("Deploying" → "Deploy")
- Leave code blocks untyped
- Use relative links ("../guides" → "/docs/guides/...")
- Include real API keys or secrets
- Skip verification steps
- Use passive voice
- Write sentences > 20 words

✅ **Do:**

- Use imperative titles
- Type all code blocks
- Use absolute links
- Use placeholders for secrets
- Add verify commands
- Use active voice
- Keep sentences concise

---

## Support

- **Mintlify Docs:** https://mintlify.com/docs
- **Questions:** Ask in #docs Slack channel
- **Issues:** GitHub Issues on formal/mint/docs

---

_Last updated: 2025-10-01_
