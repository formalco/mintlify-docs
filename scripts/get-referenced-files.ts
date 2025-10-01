#!/usr/bin/env bun

import { readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const DOCS_ROOT = resolve(__dirname, "..");

interface DocsJson {
  tabs?: Array<{
    url?: string;
    groups?: Array<{
      pages?: string[];
    }>;
  }>;
}

function getAllMDXFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (
        !item.startsWith(".") &&
        !["node_modules", "dist", "build", "legacy-docs"].includes(item)
      ) {
        files.push(...getAllMDXFiles(fullPath));
      }
    } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function getReferencedFilesFromDocsJson(): Set<string> {
  const docsJsonPath = join(DOCS_ROOT, "docs.json");
  const docsJson: DocsJson = JSON.parse(readFileSync(docsJsonPath, "utf-8"));
  const referenced = new Set<string>();

  if (docsJson.tabs) {
    for (const tab of docsJson.tabs) {
      // Add tab URL if it's an MDX file
      if (tab.url && !tab.url.startsWith("http")) {
        referenced.add(join(DOCS_ROOT, `${tab.url}.mdx`));
      }

      // Add all pages from groups
      if (tab.groups) {
        for (const group of tab.groups) {
          if (group.pages) {
            for (const page of group.pages) {
              if (!page.startsWith("http")) {
                referenced.add(join(DOCS_ROOT, `${page}.mdx`));
              }
            }
          }
        }
      }
    }
  }

  return referenced;
}

function getReferencedFilesFromMDX(mdxFiles: string[]): Set<string> {
  const referenced = new Set<string>();

  for (const file of mdxFiles) {
    const content = readFileSync(file, "utf-8");

    // Match markdown links: [text](/path/to/page)
    const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = mdLinkRegex.exec(content)) !== null) {
      const link = match[2];

      // Skip external links, anchors, and fragments
      if (
        link.startsWith("http") ||
        link.startsWith("#") ||
        link.startsWith("mailto:")
      ) {
        continue;
      }

      // Remove anchor/fragment
      const cleanLink = link.split("#")[0];

      // Convert to absolute path
      if (cleanLink.startsWith("/")) {
        const possiblePath = join(DOCS_ROOT, `${cleanLink}.mdx`);
        referenced.add(possiblePath);
      }
    }

    // Match MDX imports: import ... from "/path/to/file"
    const importRegex = /import\s+.*?\s+from\s+["']([^"']+)["']/g;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (importPath.startsWith("/") && !importPath.startsWith("http")) {
        const possiblePath = join(DOCS_ROOT, `${importPath}.mdx`);
        referenced.add(possiblePath);
      }
    }
  }

  return referenced;
}

export function getReferencedFiles(): string[] {
  // Get all MDX files
  const allFiles = getAllMDXFiles(DOCS_ROOT);

  // Get files referenced in docs.json
  const referencedInDocsJson = getReferencedFilesFromDocsJson();

  // Get files referenced in MDX files (iteratively until no new files found)
  let allReferenced = new Set(referencedInDocsJson);
  let previousSize = 0;

  // Keep iterating until we find no new references
  while (allReferenced.size > previousSize) {
    previousSize = allReferenced.size;
    const currentlyReferenced = Array.from(allReferenced);
    const newReferences = getReferencedFilesFromMDX(currentlyReferenced);

    for (const ref of newReferences) {
      allReferenced.add(ref);
    }
  }

  // Always include special files
  const specialFiles = [
    join(DOCS_ROOT, "README.md"),
    join(DOCS_ROOT, "CLAUDE.md"),
    join(DOCS_ROOT, "AGENTS.md"),
  ];

  for (const file of specialFiles) {
    allReferenced.add(file);
  }

  return Array.from(allReferenced);
}

// If run directly, output the list
if (import.meta.main) {
  const referenced = getReferencedFiles();
  console.log(JSON.stringify(referenced, null, 2));
}
