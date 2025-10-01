# API Documentation Generation

This guide explains how to automatically sync API documentation from Buf protobuf definitions to Mintlify.

## Overview

The API documentation is generated from protobuf definitions using the following workflow:

```
Buf Registry (@buf/npm) → protoc-gen-connect-openapi → OpenAPI v3 specs → Mintlify
```

## Prerequisites

1. **Protocol Buffers Compiler** (`protoc`)
   ```bash
   # macOS
   brew install protobuf

   # Linux
   apt-get install -y protobuf-compiler

   # Or download from: https://github.com/protocolbuffers/protobuf/releases
   ```

2. **Go** (for protoc-gen-connect-openapi)
   ```bash
   # macOS
   brew install go

   # Or download from: https://go.dev/dl/
   ```

3. **protoc-gen-connect-openapi plugin**
   ```bash
   go install github.com/sudorandom/protoc-gen-connect-openapi@latest
   ```

## Configuration

### 1. Buf Registry Setup

The `.npmrc` file configures npm to use Buf's registry for `@buf` scoped packages:

```ini
@buf:registry=https://buf.build/gen/npm/v1
```

### 2. Buf Token Authentication

Ensure your Buf token is configured for accessing the private registry. The token should be set in your user-level `.npmrc`:

```bash
# Add to ~/.npmrc (not project .npmrc)
//buf.build/gen/npm/v1/:_authToken=YOUR_BUF_TOKEN
```

Or set as environment variable:

```bash
export BUF_TOKEN=your_token_here
```

### 3. Formal Core Buf Packages

The project uses three Formal Core packages from Buf Registry:

```json
{
  "dependencies": {
    "@buf/formal_core.bufbuild_es": "1.10.0-20250924174544-f58d6116b8d6.1",
    "@buf/formal_core.connectrpc_es": "1.4.0-20250924174544-f58d6116b8d6.3",
    "@buf/formal_core.connectrpc_query-es": "1.4.1-20250924174544-f58d6116b8d6.1"
  }
}
```

**Version Format**: `<semver>-<timestamp>-<commit-hash>.<build>`

To update to latest protobuf definitions, **only update the timestamp portion**, not the semver.

### 3. Configure Generation Script

Edit `scripts/generate-api-docs.sh` and update:

1. **Buf module name** - Replace `YOUR_ORG_YOUR_MODULE` with your module
2. **Proto file paths** - Point to your service proto files
3. **protoc command** - Customize the generation command

Example:

```bash
protoc \
  --proto_path=node_modules/@buf/formalco_core.bufbuild_es/src \
  --connect-openapi_out=docs/api/openapi \
  --connect-openapi_opt=paths=source_relative \
  --connect-openapi_opt=base_openapi=scripts/openapi-base.yaml \
  core/v1/connector_service.proto \
  core/v1/resource_service.proto
```

## Manual Generation

To generate API docs locally:

```bash
# Generate OpenAPI specs from protobuf definitions
npm run generate-api-docs

# Generate and start dev server
npm run docs:sync

# Generate and build for production
npm run docs:build
```

## Automated Sync (GitHub Actions)

The `.github/workflows/sync-api-docs.yml` workflow automatically:

1. **Triggers on**:
   - Pushes to `main` that modify proto files
   - Daily schedule (2 AM UTC) to catch Buf Registry updates
   - Manual workflow dispatch

2. **Generates** OpenAPI v3 specs from latest protobuf definitions

3. **Creates** a Pull Request with updated documentation

### Workflow Steps

```yaml
Install protoc → Install protoc-gen-connect-openapi →
Install Buf module → Generate OpenAPI specs →
Check for changes → Create PR if changed
```

## Directory Structure

```
docs/
├── .npmrc                          # Buf Registry configuration
├── package.json                     # npm scripts
├── scripts/
│   └── generate-api-docs.sh        # Generation script
├── docs/api/openapi/               # Generated OpenAPI specs
│   ├── connectors_openapi.json
│   ├── resource_openapi.json
│   └── ...
├── docs/api/                       # Mintlify API pages
│   ├── introduction.mdx
│   ├── connectors.mdx              # References OpenAPI operations
│   └── ...
└── .github/workflows/
    └── sync-api-docs.yml           # Automation workflow
```

## Mintlify Integration

API pages reference specific OpenAPI operations using frontmatter:

```yaml
---
title: 'Connectors'
openapi: 'POST /core.v1.ConnectorService/CreateConnector'
---
```

Mintlify automatically:
- Generates request/response documentation
- Creates interactive API playground
- Supports curl, fetch, Python, Go examples
- Shows parameter descriptions and schemas

## Customization

### Base OpenAPI Configuration

Create `scripts/openapi-base.yaml` to customize generated OpenAPI specs:

```yaml
openapi: 3.1.0
info:
  title: Formal API
  version: 1.0
  description: |
    The Formal API provides...
  contact:
    name: Formal Support
    email: support@joinformal.com
    url: https://www.joinformal.com
servers:
  - url: https://api.joinformal.com
    description: Production
security:
  - ApiKeyAuth: []
```

Pass it to protoc:

```bash
--connect-openapi_opt=base_openapi=scripts/openapi-base.yaml
```

### Adding New Services

1. Add protobuf definition to Buf module
2. Push to Buf Registry
3. Update `scripts/generate-api-docs.sh` to include new proto file
4. Run `npm run generate-api-docs`
5. Create corresponding MDX page in `docs/api/`
6. Add to `docs.json` navigation

## Troubleshooting

### protoc not found

```bash
# Install Protocol Buffers compiler
brew install protobuf  # macOS
apt-get install protobuf-compiler  # Linux
```

### protoc-gen-connect-openapi not found

```bash
# Install the plugin
go install github.com/sudorandom/protoc-gen-connect-openapi@latest

# Ensure $GOPATH/bin is in PATH
export PATH="$PATH:$(go env GOPATH)/bin"
```

### Buf module not found

```bash
# Check .npmrc configuration
cat .npmrc

# Install your Buf module
npm install @buf/YOUR_ORG_YOUR_MODULE.bufbuild_es@latest
```

### OpenAPI spec not updating

```bash
# Clear npm cache
npm cache clean --force

# Reinstall Buf module to get latest
npm install @buf/YOUR_ORG_YOUR_MODULE.bufbuild_es@latest

# Regenerate
npm run generate-api-docs
```

## Benefits

✅ **Single source of truth** - Proto files define API contract
✅ **Auto-sync** - Docs update when proto changes
✅ **Type safety** - Generated from typed proto definitions
✅ **No manual maintenance** - Schemas stay accurate
✅ **Version control** - Track API changes via git
✅ **CI/CD integration** - Automated PR creation

## Next Steps

1. ✏️ Configure your Buf module in `scripts/generate-api-docs.sh`
2. 🔨 Run `npm run generate-api-docs` to test generation
3. 👀 Review generated OpenAPI specs in `docs/api/openapi/`
4. 🚀 Push to trigger automated workflow
5. ✅ Review and merge PR with updated docs

## Resources

- [Buf Schema Registry Docs](https://buf.build/docs/bsr/)
- [protoc-gen-connect-openapi](https://github.com/sudorandom/protoc-gen-connect-openapi)
- [Mintlify OpenAPI Setup](https://mintlify.com/docs/api-playground/openapi/setup)
- [Protocol Buffers](https://protobuf.dev/)
