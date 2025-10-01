#!/usr/bin/env bun

/**
 * Check for dead links in Mintlify documentation
 * Scans MDX files and JSON configs for broken internal links
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, normalize, basename } from 'path';
import { Glob } from 'bun';

// Colors for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
} as const;

const DOCS_ROOT = join(import.meta.dir, '..');
const DOCS_JSON = join(DOCS_ROOT, 'docs.json');

interface DeadLink {
  path: string;
  location: string;
  sourceFile?: string;
}

// Track all valid file paths
const deadLinks: DeadLink[] = [];
let filesScanned = 0;

/**
 * Check if a file path exists (with or without extension)
 */
function fileExists(filePath: string): boolean {
  const fullPath = join(DOCS_ROOT, filePath);

  // Check exact path
  if (existsSync(fullPath)) return true;

  // Check with .mdx extension
  if (existsSync(`${fullPath}.mdx`)) return true;

  // Check with .md extension
  if (existsSync(`${fullPath}.md`)) return true;

  // Check if it's a directory with index
  if (existsSync(join(fullPath, 'index.mdx'))) return true;
  if (existsSync(join(fullPath, 'index.md'))) return true;

  return false;
}

/**
 * Extract all page references from docs.json
 */
function extractDocsJsonLinks(): DeadLink[] {
  console.log(`${colors.blue}📋 Scanning docs.json...${colors.reset}`);

  try {
    const docsJson = JSON.parse(readFileSync(DOCS_JSON, 'utf-8'));
    const links: DeadLink[] = [];

    function extractLinks(obj: any, path = ''): void {
      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => extractLinks(item, `${path}[${idx}]`));
      } else if (obj && typeof obj === 'object') {
        // Check for page references
        if (obj.pages && Array.isArray(obj.pages)) {
          obj.pages.forEach((page: string) => {
            if (typeof page === 'string' && !page.endsWith('.json')) {
              links.push({ path: page, location: `${path}.pages` });
            }
          });
        }

        // Check for url references
        if (obj.url && typeof obj.url === 'string' && obj.url.startsWith('docs/')) {
          links.push({ path: obj.url, location: `${path}.url` });
        }

        // Recurse
        Object.entries(obj).forEach(([key, value]) => {
          extractLinks(value, path ? `${path}.${key}` : key);
        });
      }
    }

    extractLinks(docsJson);
    return links;
  } catch (error) {
    console.error(`${colors.red}❌ Error reading docs.json: ${(error as Error).message}${colors.reset}`);
    return [];
  }
}

/**
 * Extract markdown/MDX links from file content
 */
function extractMarkdownLinks(content: string, filePath: string): DeadLink[] {
  const links: DeadLink[] = [];

  // Match [text](link) style links
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = markdownLinkRegex.exec(content)) !== null) {
    const link = match[2];

    // Only check internal links (not http/https/mailto/etc)
    if (!link.startsWith('http') && !link.startsWith('mailto:') && !link.startsWith('#')) {
      // Remove anchor fragments
      const cleanLink = link.split('#')[0];
      if (cleanLink) {
        links.push({ path: cleanLink, location: `markdown link in ${filePath}` });
      }
    }
  }

  // Match <Link href="..."> style links
  const jsxLinkRegex = /<Link\s+(?:[^>]*\s+)?href=["']([^"']+)["']/g;

  while ((match = jsxLinkRegex.exec(content)) !== null) {
    const link = match[1];

    if (!link.startsWith('http') && !link.startsWith('mailto:') && !link.startsWith('#')) {
      const cleanLink = link.split('#')[0];
      if (cleanLink) {
        links.push({ path: cleanLink, location: `JSX Link in ${filePath}` });
      }
    }
  }

  return links;
}

/**
 * Scan all MDX files for broken links
 */
async function scanMdxFiles(): Promise<DeadLink[]> {
  console.log(`${colors.blue}📄 Scanning MDX files...${colors.reset}`);

  const links: DeadLink[] = [];
  const glob = new Glob('**/*.mdx');

  for await (const file of glob.scan({
    cwd: DOCS_ROOT,
    onlyFiles: true,
  })) {
    // Skip node_modules and .next directories
    if (file.includes('node_modules') || file.includes('.next') || file.includes('legacy-')) {
      continue;
    }

    filesScanned++;
    const fullPath = join(DOCS_ROOT, file);
    const content = readFileSync(fullPath, 'utf-8');
    const fileLinks = extractMarkdownLinks(content, file);

    fileLinks.forEach((link) => {
      // Resolve relative paths
      let resolvedPath = link.path;

      if (link.path.startsWith('/')) {
        // Absolute path from docs root
        resolvedPath = link.path.substring(1);
      } else if (link.path.startsWith('./') || link.path.startsWith('../')) {
        // Relative path
        const dir = dirname(file);
        resolvedPath = normalize(join(dir, link.path));
      }

      links.push({
        ...link,
        path: resolvedPath,
        sourceFile: file
      });
    });
  }

  return links;
}

/**
 * Check all collected links
 */
function checkLinks(links: DeadLink[]): void {
  console.log(`${colors.blue}🔍 Checking ${links.length} links...${colors.reset}\n`);

  links.forEach((link) => {
    if (!fileExists(link.path)) {
      deadLinks.push(link);
    }
  });
}

/**
 * Report results
 */
function reportResults(): number {
  console.log(`\n${colors.blue}═══════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}           Dead Link Check Report${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}\n`);

  console.log(`📊 Scanned: ${filesScanned} files`);

  if (deadLinks.length === 0) {
    console.log(`${colors.green}✅ No dead links found!${colors.reset}\n`);
    return 0;
  }

  console.log(`${colors.red}❌ Found ${deadLinks.length} dead links:${colors.reset}\n`);

  deadLinks.forEach((link, idx) => {
    console.log(`${idx + 1}. ${colors.yellow}${link.path}${colors.reset}`);
    console.log(`   Location: ${link.location}`);
    if (link.sourceFile) {
      console.log(`   Source: ${link.sourceFile}`);
    }
    console.log('');
  });

  return 1;
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  console.log(`${colors.blue}🔗 Dead Link Checker for Mintlify Docs${colors.reset}\n`);

  // Collect all links
  const docsJsonLinks = extractDocsJsonLinks();
  const mdxLinks = await scanMdxFiles();

  const allLinks = [...docsJsonLinks, ...mdxLinks];

  // Check links
  checkLinks(allLinks);

  // Report results
  const exitCode = reportResults();

  process.exit(exitCode);
}

// Run if called directly
if (import.meta.main) {
  main().catch((error) => {
    console.error(`${colors.red}❌ Fatal error: ${error.message}${colors.reset}`);
    console.error(error.stack);
    process.exit(1);
  });
}

export { fileExists, extractMarkdownLinks, checkLinks };
