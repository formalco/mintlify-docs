#!/bin/bash
set -e

echo "🔄 Syncing API documentation from Buf protobuf definitions..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
OUTPUT_DIR="docs/api/openapi"
PROTO_DIR="proto"

# Check if protoc is installed
if ! command -v protoc &> /dev/null; then
    echo -e "${YELLOW}⚠️  protoc is not installed. Please install Protocol Buffers compiler:${NC}"
    echo "   macOS: brew install protobuf"
    echo "   Linux: apt-get install -y protobuf-compiler"
    echo "   Or download from: https://github.com/protocolbuffers/protobuf/releases"
    exit 1
fi

# Ensure Go bin is in PATH
export PATH="$PATH:$(go env GOPATH)/bin"

# Check if protoc-gen-connect-openapi is installed
if ! command -v protoc-gen-connect-openapi &> /dev/null; then
    echo -e "${YELLOW}⚠️  protoc-gen-connect-openapi is not installed. Installing...${NC}"
    go install github.com/sudorandom/protoc-gen-connect-openapi@latest

    if ! command -v protoc-gen-connect-openapi &> /dev/null; then
        echo -e "${YELLOW}⚠️  Failed to install protoc-gen-connect-openapi${NC}"
        echo "Please install manually: go install github.com/sudorandom/protoc-gen-connect-openapi@latest"
        exit 1
    fi
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo -e "${BLUE}📦 Fetching protobuf definitions from Buf Registry...${NC}"

# Check if buf CLI is installed
if ! command -v buf &> /dev/null; then
    echo -e "${YELLOW}⚠️  buf CLI is not installed. Installing...${NC}"
    # Install buf CLI
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install bufbuild/buf/buf
    else
        echo "Please install buf CLI: https://buf.build/docs/installation"
        exit 1
    fi
fi

# Create temporary directory for proto files
TEMP_PROTO_DIR="$(mktemp -d)"
trap "rm -rf $TEMP_PROTO_DIR" EXIT

# Export proto files from Buf module
echo -e "${BLUE}🔽 Exporting proto files from buf.build/formal/core...${NC}"
buf export buf.build/formal/core --output "$TEMP_PROTO_DIR"

if [ ! -d "$TEMP_PROTO_DIR" ] || [ -z "$(ls -A $TEMP_PROTO_DIR)" ]; then
    echo -e "${YELLOW}⚠️  Failed to export proto files from Buf${NC}"
    echo "Make sure you have access to buf.build/formal/core"
    echo "And your Buf token is configured: buf registry login"
    exit 1
fi

echo -e "${BLUE}🔨 Generating OpenAPI v3 specifications...${NC}"

# Find all proto files with service definitions
SERVICE_PROTOS=$(grep -l "^service " "$TEMP_PROTO_DIR"/core/v1/*.proto 2>/dev/null || true)

if [ -z "$SERVICE_PROTOS" ]; then
    echo -e "${YELLOW}⚠️  No service definitions found in proto files${NC}"
    echo "Available proto files:"
    ls -1 "$TEMP_PROTO_DIR"/core/v1/*.proto 2>/dev/null || echo "None"
    exit 1
fi

# Generate OpenAPI specs from proto files
for proto_file in $SERVICE_PROTOS; do
    BASENAME=$(basename "$proto_file" .proto)
    echo "  Processing: $BASENAME.proto"

    # Generate to temp directory first
    TEMP_OUTPUT_DIR="$(mktemp -d)"
    protoc \
      --proto_path="$TEMP_PROTO_DIR" \
      --connect-openapi_out="$TEMP_OUTPUT_DIR" \
      --connect-openapi_opt=format=json \
      "$proto_file"

    # Find and rename the generated file to match expected format
    # protoc-gen-connect-openapi generates files as core/v1/service_name.openapi.json
    GENERATED_FILE=$(find "$TEMP_OUTPUT_DIR" -name "*.json" -type f | head -n 1)
    if [ -n "$GENERATED_FILE" ]; then
        # Rename from service_name.openapi.json to service_name_openapi.json
        mv "$GENERATED_FILE" "$OUTPUT_DIR/${BASENAME}_openapi.json"
    fi

    rm -rf "$TEMP_OUTPUT_DIR"
done

echo -e "${BLUE}🔧 Enhancing OpenAPI specs with error responses and examples...${NC}"

# Enhance OpenAPI specs
bun run scripts/enhance-openapi-specs.ts

echo -e "${BLUE}🏗️  Generating navigation structure...${NC}"

# Run the navigation generator
bun run scripts/generate-api-navigation.ts

echo -e "${GREEN}✅ API documentation synced successfully!${NC}"
echo ""
echo "📊 Summary:"
echo "   - Generated OpenAPI specs in: $OUTPUT_DIR"
echo "   - Updated navigation in: docs.json"
echo ""
echo "To update to latest protobuf definitions:"
echo "  1. Update package.json with new timestamp version"
echo "  2. Run: pnpm install"
echo "  3. Run: pnpm run sync-api-docs"
echo ""
echo "Example version format: 1.10.0-20250924174544-f58d6116b8d6.1"
echo "                         ^^^^^  ^^^^^^^^^^^^^^ ^^^^^^^^^^^^^ ^"
echo "                         semver timestamp      commit-hash   build"
