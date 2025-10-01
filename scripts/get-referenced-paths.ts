#!/usr/bin/env bun

import { getReferencedFiles } from "./get-referenced-files";

// Output just the file paths, one per line
const files = getReferencedFiles();
files.forEach((file) => console.log(file));
