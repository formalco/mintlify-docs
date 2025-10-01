#!/usr/bin/env bun

import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join, resolve } from "path";

const DOCS_ROOT = resolve(__dirname, "..");
const ASSETS_DIRS = ["assets", "images", "img"];

interface MissingAsset {
  file: string;
  assetPath: string;
  line: number;
}

// ANSI color codes
const colors = {
  blue: "\x1b[34m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  reset: "\x1b[0m",
};

function findMDXFiles(dir: string): string[] {
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
        files.push(...findMDXFiles(fullPath));
      }
    } else if (item.endsWith(".mdx") || item.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractImagePaths(content: string): { path: string; line: number }[] {
  const images: { path: string; line: number }[] = [];
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    // Match markdown images: ![alt](/path/to/image.ext)
    const mdImageRegex = /!\[.*?\]\(([^)]+)\)/g;
    let match;
    while ((match = mdImageRegex.exec(line)) !== null) {
      const path = match[1].split(" ")[0]; // Remove any width/height attributes
      if (path.startsWith("/") && !path.startsWith("http")) {
        images.push({ path, line: index + 1 });
      }
    }

    // Match HTML img tags: <img src="/path/to/image.ext" />
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/g;
    while ((match = htmlImageRegex.exec(line)) !== null) {
      const path = match[1];
      if (path.startsWith("/") && !path.startsWith("http")) {
        images.push({ path, line: index + 1 });
      }
    }
  });

  return images;
}

function checkAssetExists(assetPath: string): boolean {
  // Remove leading slash
  const relativePath = assetPath.startsWith("/")
    ? assetPath.slice(1)
    : assetPath;

  // Check in root
  if (existsSync(join(DOCS_ROOT, relativePath))) {
    return true;
  }

  // Check in common asset directories
  for (const dir of ASSETS_DIRS) {
    const fullPath = join(DOCS_ROOT, dir, relativePath);
    if (existsSync(fullPath)) {
      return true;
    }
  }

  return false;
}

function main() {
  console.log(`${colors.blue}🖼️  Asset Checker for Documentation${colors.reset}\n`);

  const mdxFiles = findMDXFiles(DOCS_ROOT);
  const missingAssets: MissingAsset[] = [];

  console.log(`${colors.blue}📄 Scanning ${mdxFiles.length} files...${colors.reset}`);

  for (const file of mdxFiles) {
    const content = readFileSync(file, "utf-8");
    const images = extractImagePaths(content);

    for (const { path, line } of images) {
      if (!checkAssetExists(path)) {
        missingAssets.push({
          file: file.replace(DOCS_ROOT + "/", ""),
          assetPath: path,
          line,
        });
      }
    }
  }

  console.log("\n");
  console.log(`${colors.blue}${"═".repeat(50)}${colors.reset}`);
  console.log(`${colors.blue}           Asset Check Report${colors.reset}`);
  console.log(`${colors.blue}${"═".repeat(50)}${colors.reset}\n`);

  if (missingAssets.length === 0) {
    console.log(`${colors.green}✅ All image assets found!${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`${colors.red}❌ Found ${missingAssets.length} missing assets:${colors.reset}\n`);

  missingAssets.forEach((asset, index) => {
    console.log(`${index + 1}. ${colors.yellow}${asset.assetPath}${colors.reset}`);
    console.log(`   File: ${asset.file}:${asset.line}`);
    console.log();
  });

  process.exit(1);
}

main();

