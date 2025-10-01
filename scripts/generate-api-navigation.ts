#!/usr/bin/env bun

/**
 * Generate Mintlify API navigation structure grouped by service
 * Reads OpenAPI specs and creates logical service groupings
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const OPENAPI_DIR = join(import.meta.dir, '../docs/api/openapi');
const DOCS_JSON_PATH = join(import.meta.dir, '../docs.json');

// Service categorization - maps service names to logical groups
const SERVICE_CATEGORIES: Record<string, string[]> = {
  'Infrastructure': [
    'connectors',
    'resource',
    'sidecar',
    'satellite'
  ],
  'Identity & Access': [
    'user',
    'group',
    'spaces',
    'permissions'
  ],
  'Security & Governance': [
    'policies',
    'policy_data_loaders',
    'sessions',
    'logs',
    'monitors'
  ],
  'Data Management': [
    'inventory',
    'trackers',
    'graph'
  ],
  'Integrations': [
    'integration_bi',
    'integration_cloud',
    'integration_data_catalog',
    'integration_log',
    'integration_mdm',
    'integration_mfa'
  ],
  'Automation': [
    'workflow',
    'scenario_monitoring'
  ]
};

/**
 * Get friendly service name from filename
 */
function getFriendlyServiceName(filename: string): string {
  const name = filename.replace('_openapi.json', '');

  // Convert snake_case to Title Case
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate navigation structure
 */
function generateNavigation(): void {
  console.log('🔄 Generating API navigation structure...\n');

  // Get all OpenAPI spec files
  const files = readdirSync(OPENAPI_DIR)
    .filter(f => f.endsWith('_openapi.json'))
    .sort();

  if (files.length === 0) {
    console.error('❌ No OpenAPI spec files found');
    process.exit(1);
  }

  console.log(`📋 Found ${files.length} OpenAPI specs\n`);

  // Build openapi array (all specs at top level for Mintlify to parse)
  const openapiArray = files.map(f => `docs/api/openapi/${f}`);

  // Build service groups
  // Mintlify auto-generates pages from the top-level "openapi" array
  // We just need an introduction page - Mintlify handles the rest
  const groups = [
    {
      group: 'API Documentation',
      pages: ['docs/api/introduction']
    }
  ];

  // Log which services were found for verification
  console.log('\n📦 Services found by category:\n');
  for (const [category, services] of Object.entries(SERVICE_CATEGORIES)) {
    const foundServices = services.filter(service =>
      files.includes(`${service}_openapi.json`)
    );
    if (foundServices.length > 0) {
      console.log(`  ${category}: ${foundServices.length} services`);
      foundServices.forEach(service => {
        const filename = `${service}_openapi.json`;
        const friendlyName = getFriendlyServiceName(filename);
        console.log(`    - ${friendlyName}`);
      });
    }
  }

  // Read current docs.json
  const docsJson = JSON.parse(readFileSync(DOCS_JSON_PATH, 'utf-8'));

  // Find the API reference tab
  const apiTab = docsJson.navigation.tabs.find((tab: any) => tab.tab === 'API reference');

  if (!apiTab) {
    console.error('❌ Could not find API reference tab in docs.json');
    process.exit(1);
  }

  // Update the API tab configuration
  apiTab.openapi = openapiArray;
  apiTab.groups = groups;

  // Write back to docs.json
  writeFileSync(DOCS_JSON_PATH, JSON.stringify(docsJson, null, 2), 'utf-8');

  console.log('\n✅ Navigation structure generated successfully!');
  console.log(`\n📊 Summary:`);
  console.log(`   - ${openapiArray.length} OpenAPI specs`);
  console.log(`   - ${groups.length - 1} service categories`);
  console.log(`   - ${groups.reduce((acc, g) => acc + (g.pages?.length || 0), 0)} total pages`);
}

// Run the generator
try {
  generateNavigation();
} catch (error) {
  console.error('❌ Error:', (error as Error).message);
  console.error((error as Error).stack);
  process.exit(1);
}
