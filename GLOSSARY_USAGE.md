# Using Glossary Terms in Documentation

## How It Works

Link terms to the glossary using a simple underlined link component. Just wrap any term with `<G>` and specify which glossary section to link to.

## Usage

Import the component and wrap terms:

```mdx
---
title: "My Documentation Page"
---

import { G } from "/snippets/glossary-terms.mdx";

## Overview

When users connect through a <G anchor="connector">Connector</G>, their queries are evaluated by <G anchor="policy">policies</G>. The <G anchor="resource">resource</G> sees the connection from a <G anchor="native-user">native user</G>, but logs attribute it to the actual <G anchor="end-user-identity">end-user</G>.
```

**Result:** Terms appear as normal text with an underline, linking to the glossary section.

## Syntax

```mdx
<G anchor="section-id">term text</G>
```

- `anchor`: The glossary section ID (e.g., `"connector"`, `"policy"`, `"end-user-identity"`)
- Content: The text to display (can be anything)

## Common Glossary Anchors

Reference these anchor IDs when linking to glossary terms:

### Core Concepts
- `connector` - Security gateway
- `resource` - Protected system
- `policy` - Access rules
- `session` - Recorded connection
- `space` - Isolated environment
- `satellite` - Add-on features
- `listener` - Port configuration

### Access & Auth
- `end-user-identity` - Real person attribution
- `native-user` - Resource credential
- `sso-single-sign-on` - Single sign-on
- `mfa-multi-factor-authentication` - Multi-factor auth
- `just-in-time-access` - Temporary access
- `dynamic-secrets` - Ephemeral credentials

### Policy & Data
- `rego` - Policy language
- `opa-open-policy-agent` - Policy engine
- `masking` - Data redaction
- `pii-personally-identifiable-information` - Personal data
- `data-label` - Auto-detected sensitive data
- `policy-data-loader` - External data connector

### Platform
- `control-plane` - Management console
- `data-plane` - Data flow layer

## Example Usage

### Before (plain text):
```mdx
End users connect to resources through connectors. Policies enforce access control.
```

### After (with glossary links):
```mdx
import { G } from "/snippets/glossary-terms.mdx";

<G anchor="end-user-identity">End users</G> connect to <G anchor="resource">resources</G> through <G anchor="connector">connectors</G>. <G anchor="policy">Policies</G> enforce access control.
```

## Best Practices

1. **First Mention Only**: Link terms the first time they appear on a page
2. **Key Concepts**: Highlight important architectural terms users need to understand
3. **Natural Text**: The text inside `<G>` can be anything - use natural language
4. **Consistency**: Use the same anchor for the same concept across all docs

## Examples

```mdx
import { G } from "/snippets/glossary-terms.mdx";

{/* Link with exact term */}
The <G anchor="connector">Connector</G> enforces policies.

{/* Link with different text */}
Deploy a <G anchor="connector">security gateway</G> in your network.

{/* Link with plural */}
All <G anchor="policy">policies</G> are written in <G anchor="rego">Rego</G>.

{/* Link with lowercase */}
Users authenticate through the <G anchor="control-plane">control plane</G>.
```

## Finding Anchor IDs

To find the correct anchor ID for a term:

1. Open `/docs/glossary/index.mdx`
2. Find the term's heading (e.g., `### Connector`)
3. The anchor is the lowercase, hyphenated version of the heading
   - `Connector` → `connector`
   - `End-user Identity` → `end-user-identity`
   - `PII (Personally Identifiable Information)` → `pii-personally-identifiable-information`
