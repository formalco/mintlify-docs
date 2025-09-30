#!/usr/bin/env node

/*
 * This script injects:
 *   "servers": [
 *     {
 *       "url": "https://v2api.formalcloud.net"
 *     }
 *   ]
 * into all .json files found in the 'gen-openapi' directory (recursively),
 * but ONLY if the 'servers' array is not already there with the same URL.
 *
 * Usage:
 *   node injectServers.js
 */

const fs = require("fs");
const path = require("path");

// The servers array we want to inject.
const newServersValue = [
  {
    url: "https://api.joinformal.com",
  },
];

// The directory where our .json files reside.
const rootDir = path.join(__dirname, "../api-reference/gen-openapi");

// Recursively walk through the directory and process JSON files
function walkDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkDirectory(fullPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".json")) {
      injectServersIntoFile(fullPath);
    }
  });
}

function injectServersIntoFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    let jsonData = JSON.parse(fileContent);

    // Check if servers array already contains "https://api.joinformal.com"
    const alreadyInjected =
      Array.isArray(jsonData.servers) &&
      jsonData.servers.some(
        (server) => server.url === "https://api.joinformal.com"
      );

    if (alreadyInjected) {
      console.log(`Skipping ${filePath} (servers already injected).`);
      return;
    }

    // Inject/replace the 'servers' property
    jsonData.servers = newServersValue;

    // Write the updated JSON back to the file (with pretty formatting)
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    console.log(`Injected 'servers' into ${filePath}`);
  } catch (err) {
    console.error(`Failed to process ${filePath}:`, err);
  }
}

// Start walking from the root directory
walkDirectory(rootDir);
