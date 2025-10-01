#!/usr/bin/env bun

import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { getReferencedFiles } from "./get-referenced-files";

const DOCS_ROOT = resolve(__dirname, "..");

// ANSI color codes
const colors = {
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  reset: "\x1b[0m",
};

function getAllMDXFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (
        !item.startsWith(".") &&
        !["node_modules", "dist", "build"].includes(item)
      ) {
        files.push(...getAllMDXFiles(fullPath));
      }
    } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  const allFiles = getAllMDXFiles(DOCS_ROOT);
  const referencedFiles = new Set(getReferencedFiles());

  const unreferenced = allFiles.filter((file) => !referencedFiles.has(file));

  if (unreferenced.length === 0) {
    console.log("✅ All MDX files are referenced!");
    process.exit(0);
  }

  console.log(
    `${colors.yellow}⚠️  Found ${unreferenced.length} unreferenced MDX files:${colors.reset}\n`
  );

  unreferenced.forEach((file, index) => {
    const relativePath = file.replace(DOCS_ROOT + "/", "");
    console.log(`  ${index + 1}. ${relativePath}`);
  });

  console.log(
    `\n${colors.blue}ℹ️  These files are not linked in docs.json or other MDX files${colors.reset}`
  );
  console.log(
    `${colors.blue}ℹ️  They will be skipped in pre-commit checks${colors.reset}\n`
  );

  // Exit with 0 (success) - this is just a warning
  process.exit(0);
}

main();
