# Documentation Structure Plan

## Proposed Structure Analysis

### Your Proposed Sections:

1. **Formal Objects** (Connectors, Resources, Users, Groups, Data Loaders)
2. **Policy Engine** (Policies/Permissions/Evaluation/Enforcement/Structure)
3. **Integrations** (Technologies/MFA/MDM/Cloud Accounts)
4. **Web Configuration** (through the Formal console)
5. **API First Configuration** (terraform/pulumi/go/python sdk)
6. **Usage** (desktop app, CLI/API)

---

## Content Mapping from Legacy Docs (71 files total)

### ✅ 1. FORMAL OBJECTS (Core Concepts)

**Purpose:** Understanding and managing Formal's core entities

#### Connectors (10 files)

- `deploying-a-connector/introduction.mdx`
- `deploying-a-connector/control-plane-configuration.mdx`
- `deploying-a-connector/control-plane-configuration-with-terraform.mdx`
- `deploying-a-connector/deployment.mdx`
- `deploying-a-connector/deployment-on-aws-ecs-fargate-terraform.mdx`
- `deploying-a-connector/deployment-on-kubernetes-helm.mdx`
- `deploying-a-connector/environment-variables.mdx`
- `deploying-a-connector/hostname-and-tls-configuration.mdx`
- `deploying-a-connector/logs-configuration.mdx`
- `deploying-a-connector/measuring-connector-health.mdx`

#### Resources (2 files)

- `adding-resource/introduction.mdx`
- `settings/resources.mdx`

#### Users (2 files)

- `settings/users.mdx`
- `adding-resource/native-users.mdx`

#### Groups (1 file)

- `settings/groups.mdx`

#### Satellites (3 files)

- `deploying-a-satellite/introduction.mdx`
- `deploying-a-satellite/deployment.mdx`
- `settings/satellites.mdx`
- `settings/satellites/pii-entities.mdx`

#### Policy Data Loaders (1 file)

- `settings/policy-data-loaders.mdx`

#### Spaces (1 file)

- `settings/spaces.mdx`

#### Sessions (1 file)

- `security/sessions.mdx`

**Total: 21 files**

---

### ✅ 2. POLICY ENGINE

**Purpose:** Understanding and writing policies for access control

#### Core Policy Docs (5 files)

- `security/policies/introduction.mdx`
- `security/policies/policy-structure.mdx`
- `security/policies/policy-evaluation.mdx`
- `security/policies/policy-enforcement.mdx`
- `security/policies/examples.mdx`

#### Access & Permissions (1 file)

- `security/access.mdx`

#### Application Permission System (1 file)

- `application-permission-system.mdx`

**Total: 7 files**

---

### ✅ 3. INTEGRATIONS

**Purpose:** Connecting Formal with external systems and technologies

#### Data Technologies (12 files) - **SHOULD THIS BE SEPARATE?**

- `using-formal-connector/index.mdx`
- `using-formal-connector/postgres.mdx`
- `using-formal-connector/mongodb.mdx`
- `using-formal-connector/snowflake.mdx`
- `using-formal-connector/bigquery.mdx`
- `using-formal-connector/clickhouse.mdx`
- `using-formal-connector/dynamodb.mdx`
- `using-formal-connector/s3.mdx`
- `using-formal-connector/http.mdx`
- `using-formal-connector/ssh.mdx`
- `using-formal-connector/kubernetes.mdx`
- `using-formal-connector/smart-routing.mdx`

#### BI & Analytics (1 file)

- `integrations/BI-apps.mdx`

#### MFA (1 file)

- `integrations/mfa/duo.mdx`

#### Cloud Providers (2 files)

- `integrations/cloud/introduction.mdx`
- `integrations/cloud/aws.mdx`

#### Data Catalog (1 file)

- `integrations/data-catalog/datahub.mdx`

#### SIEM & Logging (1 file)

- `integrations/SIEM.mdx`

#### ChatOps (1 file)

- `integrations/chatops/slack.mdx`

#### DevOps (1 file)

- `integrations/devops/github.mdx`

#### Encryption Keys (1 file)

- `integrations/encryption-keys.mdx`

**Total: 21 files**

---

### ⚠️ 4. WEB CONFIGURATION (Console UI)

**Purpose:** Managing Formal through the web interface

**Currently scattered across:**

- `settings/*` (10 files) - **Already mapped to Formal Objects**
- Some overlap with Formal Objects section

**Suggestion:** Instead of a separate "Web Configuration" section, add "Configure via Console" subsections within each Formal Objects page.

**Alternative:** Keep a small "Console Guide" section for:

- Dashboard overview
- SSO setup (`settings/sso.mdx`)
- Directory sync (`settings/directory-sync.mdx`)
- Termination protection (`settings/termination-protection.mdx`)
- API keys (`tools/api-keys.mdx`)

**Total: 4 files for console-specific features**

---

### ✅ 5. API FIRST CONFIGURATION (Infrastructure as Code)

**Purpose:** Automating Formal configuration with code

#### Terraform (2 files already in other sections)

- `using-terraform.mdx` (general guide)
- `deploying-a-connector/control-plane-configuration-with-terraform.mdx`

**Note:** Currently minimal. Should add:

- Pulumi examples
- SDK guides (Go, Python)
- API reference (already have OpenAPI specs in `/docs/api/`)

**Total: 1 standalone file + examples embedded elsewhere**

---

### ✅ 6. USAGE

**Purpose:** Using Formal's client tools

#### Desktop App (2 files)

- `desktop-app/introduction.mdx`
- `desktop-app/usage.mdx`

#### Chrome Extension (1 file)

- `chrome-extension.mdx`

**Note:** No CLI documentation found in legacy docs. Needs to be added.

**Total: 3 files**

---

## ⚠️ MISSING CATEGORIES IN YOUR PROPOSAL

### 7. DATA OBSERVABILITY & DISCOVERY

**Purpose:** Understanding and monitoring your data landscape

- `data/discovery.mdx`
- `data/observability.mdx`
- `security/logs.mdx`

**Suggestion:** Add as new section "Observability" or fold into "Formal Objects > Satellites"

**Total: 3 files**

---

### 8. HOW-TO GUIDES

**Purpose:** Task-based guides for common scenarios

- `guides/how-to-alert-triggered-policies.mdx`
- `guides/how-to-enable-end-user-identity-propagation.mdx`
- `guides/how-to-encrypt-data-with-custom-key.mdx`
- `guides/how-to-enforce-mfa-sessions.mdx`
- `guides/how-to-mask-json-object.mdx`
- `guides/how-to-restrict-connections-to-resource.mdx`
- `guides/how-to-set-native-user-password.mdx`
- `guides/how-to-set-up-rds-iam-authentication.mdx`

**Suggestion:** Keep as separate "How-To Guides" section for practical, task-focused content

**Total: 8 files**

---

### 9. TROUBLESHOOTING

**Purpose:** Debugging and resolving common issues

- `troubleshooting/connector/ssh.mdx`
- `troubleshooting/deployment/connector.mdx`
- `troubleshooting/deprecation-policy.mdx`

**Suggestion:** Keep as separate "Troubleshooting" section

**Total: 3 files**

---

## RECOMMENDED FINAL STRUCTURE

```
/docs/guides/

├── getting-started/          [DONE]
│   ├── index.mdx            [DONE - Documentation homepage]
│   ├── what-is-formal.mdx   [DONE - Migrated]
│   ├── architecture.mdx     [DONE - Migrated]
│   ├── quickstart.mdx       [DONE - Rewritten]
│   └── development.mdx      [Existing]

├── core-concepts/           [NEW - "Formal Objects"]
│   ├── connectors/
│   │   ├── introduction.mdx
│   │   ├── configuration.mdx
│   │   ├── deployment.mdx
│   │   ├── aws-ecs.mdx
│   │   ├── kubernetes.mdx
│   │   ├── environment-variables.mdx
│   │   ├── tls-configuration.mdx
│   │   ├── logging.mdx
│   │   └── health-monitoring.mdx
│   ├── resources/
│   │   ├── introduction.mdx
│   │   ├── native-users.mdx
│   │   └── management.mdx
│   ├── satellites/
│   │   ├── introduction.mdx
│   │   ├── deployment.mdx
│   │   ├── data-classifier.mdx
│   │   └── pii-entities.mdx
│   ├── users.mdx
│   ├── groups.mdx
│   ├── spaces.mdx
│   ├── sessions.mdx
│   └── policy-data-loaders.mdx

├── policies/                [NEW - "Policy Engine"]
│   ├── introduction.mdx
│   ├── structure.mdx
│   ├── evaluation.mdx
│   ├── enforcement.mdx
│   ├── examples.mdx
│   ├── access-control.mdx
│   └── permissions.mdx

├── data-technologies/       [NEW - Split from Integrations]
│   ├── index.mdx
│   ├── postgres.mdx
│   ├── mongodb.mdx
│   ├── snowflake.mdx
│   ├── bigquery.mdx
│   ├── clickhouse.mdx
│   ├── dynamodb.mdx
│   ├── s3.mdx
│   ├── http.mdx
│   ├── ssh.mdx
│   ├── kubernetes.mdx
│   └── smart-routing.mdx

├── integrations/            [External systems only]
│   ├── bi-tools.mdx
│   ├── mfa/
│   │   └── duo.mdx
│   ├── cloud/
│   │   ├── introduction.mdx
│   │   └── aws.mdx
│   ├── data-catalog/
│   │   └── datahub.mdx
│   ├── siem.mdx
│   ├── chatops/
│   │   └── slack.mdx
│   ├── devops/
│   │   └── github.mdx
│   └── encryption-keys.mdx

├── observability/           [NEW]
│   ├── logs.mdx
│   ├── discovery.mdx
│   └── monitoring.mdx

├── configuration/           [NEW - Combines Web + API]
│   ├── console/
│   │   ├── sso.mdx
│   │   ├── directory-sync.mdx
│   │   ├── api-keys.mdx
│   │   └── termination-protection.mdx
│   ├── terraform/
│   │   ├── getting-started.mdx
│   │   └── examples.mdx
│   ├── pulumi/             [TO BE ADDED]
│   └── sdks/               [TO BE ADDED]
│       ├── go.mdx
│       └── python.mdx

├── client-tools/            [NEW - "Usage"]
│   ├── desktop-app/
│   │   ├── introduction.mdx
│   │   └── usage.mdx
│   ├── chrome-extension.mdx
│   └── cli.mdx             [TO BE ADDED]

├── how-to/                  [NEW]
│   ├── alert-triggered-policies.mdx
│   ├── enable-identity-propagation.mdx
│   ├── encrypt-with-custom-key.mdx
│   ├── enforce-mfa.mdx
│   ├── mask-json.mdx
│   ├── restrict-connections.mdx
│   ├── set-native-user-password.mdx
│   └── rds-iam-authentication.mdx

├── troubleshooting/
│   ├── connector-issues.mdx
│   ├── ssh-issues.mdx
│   └── deprecation-policy.mdx

└── [existing]
    ├── customization/
    ├── writing-content/
    └── ai-tools/
```

---

## KEY RECOMMENDATIONS

### 1. Split "Integrations" into two sections:

- **Data Technologies**: Protocol-specific guides (PostgreSQL, MongoDB, etc.)
- **Integrations**: External system integrations (MFA, SIEM, Cloud, etc.)

### 2. Merge "Web Configuration" and "API First Configuration":

- Create unified **Configuration** section
- Include both console UI and IaC approaches
- Side-by-side examples (Console vs Terraform)

### 3. Add missing sections:

- **Observability**: Data discovery, monitoring, logs
- **How-To Guides**: Task-focused practical guides
- **Troubleshooting**: Debugging and issue resolution

### 4. Rename "Formal Objects" to "Core Concepts":

- More intuitive for new users
- Better reflects the content (not just data objects)

### 5. Add placeholder sections for missing content:

- CLI documentation
- Pulumi examples
- SDK guides (Go, Python)

---

## NAVIGATION STRUCTURE IN docs.json

```json
{
  "tabs": [
    {
      "tab": "Documentation",
      "groups": [
        {"group": "Getting Started", "pages": [...]},
        {"group": "Core Concepts", "pages": [...]},
        {"group": "Policy Engine", "pages": [...]},
        {"group": "Data Technologies", "pages": [...]},
        {"group": "Integrations", "pages": [...]},
        {"group": "Observability", "pages": [...]},
        {"group": "Configuration", "pages": [...]},
        {"group": "Client Tools", "pages": [...]},
        {"group": "How-To Guides", "pages": [...]},
        {"group": "Troubleshooting", "pages": [...]}
      ]
    },
    {
      "tab": "API Reference",
      "groups": [...]
    },
    {
      "tab": "Changelog",
      "groups": [...]
    }
  ]
}
```

---

## SUMMARY

**Your original proposal covers most content**, but I recommend:

✅ **Keep:** Formal Objects (as "Core Concepts"), Policy Engine, Integrations, Usage (as "Client Tools")

🔄 **Modify:**

- Merge "Web Configuration" + "API First Configuration" → "Configuration"
- Split "Integrations" → "Data Technologies" + "Integrations"

➕ **Add:**

- Observability (data discovery, logs, monitoring)
- How-To Guides (practical task-based content)
- Troubleshooting (debugging and issues)

**Total Coverage:** All 71 legacy files are accounted for in this structure.
