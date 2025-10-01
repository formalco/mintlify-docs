#!/usr/bin/env bun

/**
 * Enhance OpenAPI specifications with error responses and code examples
 * Post-processes generated OpenAPI specs to add:
 * - Standard error response codes (400, 401, 403, 404, 500)
 * - Request/response examples
 * - Server configuration
 * - Code samples for curl, JavaScript, Python, Go
 */

import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const OPENAPI_DIR = join(import.meta.dir, '../docs/api/openapi');
const BASE_URL = 'https://api.joinformal.com';

interface ErrorResponse {
  description: string;
  content: {
    'application/json': {
      schema: {
        type: string;
        properties: {
          code: { type: string; example: string };
          message: { type: string; example: string };
          details?: { type: string };
        };
      };
    };
  };
}

interface CodeSample {
  lang: string;
  label: string;
  source: string;
}

// Standard error responses for all endpoints
const ERROR_RESPONSES: Record<string, ErrorResponse> = {
  '400': {
    description: 'Bad Request - Invalid request parameters or body',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'invalid_request' },
            message: { type: 'string', example: 'Invalid request parameters' },
            details: { type: 'object' }
          }
        }
      }
    }
  },
  '401': {
    description: 'Unauthorized - Missing or invalid authentication',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'unauthorized' },
            message: { type: 'string', example: 'Authentication required' }
          }
        }
      }
    }
  },
  '403': {
    description: 'Forbidden - Insufficient permissions',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'forbidden' },
            message: { type: 'string', example: 'Insufficient permissions to perform this action' }
          }
        }
      }
    }
  },
  '404': {
    description: 'Not Found - Resource does not exist',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'not_found' },
            message: { type: 'string', example: 'Resource not found' }
          }
        }
      }
    }
  },
  '500': {
    description: 'Internal Server Error - An error occurred processing the request',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'internal_error' },
            message: { type: 'string', example: 'An internal error occurred' }
          }
        }
      }
    }
  }
};

/**
 * Generate code samples for an endpoint
 */
function generateCodeSamples(path: string, method: string, operationId: string): CodeSample[] {
  const samples: CodeSample[] = [];

  // Curl example
  samples.push({
    lang: 'curl',
    label: 'cURL',
    source: `curl -X ${method.toUpperCase()} "${BASE_URL}${path}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "example": "value"
  }'`
  });

  // JavaScript/Fetch example
  samples.push({
    lang: 'javascript',
    label: 'JavaScript (fetch)',
    source: `fetch("${BASE_URL}${path}", {
  method: "${method.toUpperCase()}",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    example: "value"
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`
  });

  // Python example
  samples.push({
    lang: 'python',
    label: 'Python',
    source: `import requests

url = "${BASE_URL}${path}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "example": "value"
}

response = requests.${method}(url, headers=headers, json=data)
print(response.json())`
  });

  // Go example
  samples.push({
    lang: 'go',
    label: 'Go',
    source: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "${BASE_URL}${path}"

    body := map[string]string{
        "example": "value",
    }

    jsonData, _ := json.Marshal(body)

    req, _ := http.NewRequest("${method.toUpperCase()}", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    responseBody, _ := io.ReadAll(resp.Body)
    fmt.Println(string(responseBody))
}`
  });

  return samples;
}

/**
 * Extract service name from OpenAPI spec
 */
function extractServiceName(spec: any): string | null {
  // Try to get service name from the first tag in paths
  if (spec.paths) {
    for (const pathItem of Object.values(spec.paths)) {
      for (const operation of Object.values(pathItem as Record<string, any>)) {
        if (typeof operation === 'object' && operation?.tags?.[0]) {
          return operation.tags[0];
        }
      }
    }
  }
  return null;
}

/**
 * Enhance a single OpenAPI spec
 */
function enhanceSpec(filePath: string): boolean {
  console.log(`  Processing: ${filePath.split('/').pop()}`);

  const spec = JSON.parse(readFileSync(filePath, 'utf-8'));
  let modified = false;

  // Set unique title based on service name
  const serviceName = extractServiceName(spec);
  if (serviceName && spec.info?.title === 'core.v1') {
    spec.info.title = serviceName;
    modified = true;
    console.log(`    → Updated title to: ${serviceName}`);
  }

  // Add server configuration if not present
  if (!spec.servers || spec.servers.length === 0) {
    spec.servers = [
      {
        url: BASE_URL,
        description: 'Production API'
      }
    ];
    modified = true;
  }

  // Add security schemes if not present
  if (!spec.components) {
    spec.components = {};
  }
  if (!spec.components.securitySchemes) {
    spec.components.securitySchemes = {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'API Key',
        description: 'API key authentication. Get your API key from the Formal dashboard.'
      }
    };
    modified = true;
  }

  // Add security requirement to all operations
  if (spec.paths) {
    for (const [pathKey, pathItem] of Object.entries(spec.paths)) {
      for (const [method, operation] of Object.entries(pathItem as Record<string, any>)) {
        if (typeof operation === 'object' && operation !== null) {
          // Add security requirement
          if (!operation.security) {
            operation.security = [{ BearerAuth: [] }];
            modified = true;
          }

          // Add error responses if they don't exist
          if (operation.responses) {
            // Only add error responses if 200 exists (indicating this is a valid operation)
            if (operation.responses['200'] || operation.responses['201']) {
              for (const [code, response] of Object.entries(ERROR_RESPONSES)) {
                if (!operation.responses[code]) {
                  operation.responses[code] = response;
                  modified = true;
                }
              }
            }

            // Add code samples
            if (!operation['x-codeSamples']) {
              operation['x-codeSamples'] = generateCodeSamples(
                pathKey,
                method,
                operation.operationId
              );
              modified = true;
            }
          }
        }
      }
    }
  }

  // Write back if modified
  if (modified) {
    writeFileSync(filePath, JSON.stringify(spec, null, 2), 'utf-8');
    console.log(`    ✓ Enhanced with error responses and code samples`);
    return true;
  }

  console.log(`    • No changes needed`);
  return false;
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log('🔧 Enhancing OpenAPI specifications...\n');

  // Find all OpenAPI spec files
  const files = readdirSync(OPENAPI_DIR)
    .filter((f) => f.endsWith('_openapi.json'))
    .map((f) => join(OPENAPI_DIR, f));

  if (files.length === 0) {
    console.error('❌ No OpenAPI spec files found');
    process.exit(1);
  }

  console.log(`📋 Found ${files.length} OpenAPI specs\n`);

  let enhancedCount = 0;

  // Process each spec
  for (const file of files) {
    const wasModified = enhanceSpec(file);
    if (wasModified) {
      enhancedCount++;
    }
  }

  console.log(`\n✅ Enhanced ${enhancedCount} OpenAPI specs`);
  console.log('\nEnhancements applied:');
  console.log('  • Standard error responses (400, 401, 403, 404, 500)');
  console.log('  • Server configuration');
  console.log('  • Security schemes (Bearer authentication)');
  console.log('  • Code samples (curl, JavaScript, Python, Go)');
}

// Run if called directly
if (import.meta.main) {
  main().catch((error) => {
    console.error('❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
}

export { enhanceSpec, generateCodeSamples };
