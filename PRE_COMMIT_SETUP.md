# Pre-Commit Checks Setup

This repository has comprehensive pre-commit checks to ensure documentation quality.

## What Gets Checked

### 1. **Code Formatting** (Prettier)
- Auto-formats all staged `.md`, `.mdx`, `.json`, `.ts`, `.tsx`, `.js`, `.jsx` files
- Ensures consistent code style across the project
- Runs automatically via `lint-staged`

### 2. **Spell Checking** (cspell)
- Validates spelling in all `.md` and `.mdx` files
- Uses custom dictionary for Formal-specific terms
- Configuration in `cspell.json`

### 3. **Link Validation**
- Scans all documentation for broken internal links
- Checks links in both markdown and navigation config
- Script: `scripts/check-dead-links.ts`

### 4. **Asset Verification**
- Ensures all referenced images exist in the repository
- Checks both markdown (`![](path)`) and HTML (`<img src="path">`) images
- Script: `scripts/check-assets.ts`

## Installation

Install dependencies:

```bash
pnpm install
```

The pre-commit hook will be automatically set up via Husky.

## Manual Usage

Run individual checks:

```bash
# Format all files
pnpm prettier --write "**/*.{md,mdx,json,ts,tsx,js,jsx}"

# Check spelling
pnpm check-spelling

# Check links
pnpm check-links

# Check assets
pnpm check-assets

# Run lint-staged (format + spell check)
pnpm precommit
```

## How It Works

### On Commit

When you run `git commit`, the pre-commit hook (`.husky/pre-commit`) automatically:

1. ✅ Formats staged files with Prettier
2. ✅ Spell checks staged files with cspell
3. ✅ Validates all internal links
4. ✅ Verifies all image assets exist

If any check fails, the commit is aborted with a clear error message.

### Lint-Staged Configuration

Defined in `package.json`:

```json
{
  "lint-staged": {
    "*.{md,mdx}": [
      "prettier --write",
      "cspell --no-must-find-files"
    ],
    "*.{json,ts,tsx,js,jsx}": [
      "prettier --write"
    ]
  }
}
```

## Customization

### Adding Custom Words (Spell Checker)

Edit `cspell.json` and add words to the `words` array:

```json
{
  "words": [
    "Formal",
    "PostgreSQL",
    "YourCustomTerm"
  ]
}
```

### Ignoring Paths

Add paths to `ignorePaths` in `cspell.json`:

```json
{
  "ignorePaths": [
    "node_modules",
    "your-folder/**"
  ]
}
```

### Skipping Pre-Commit Checks

**Not recommended**, but if you need to skip:

```bash
git commit --no-verify -m "Your message"
```

## Troubleshooting

### Spell Check Fails

1. Check if the word is correctly spelled
2. If it's a technical term, add it to `cspell.json`
3. Run `pnpm check-spelling` to verify

### Link Check Fails

1. Review the broken link path
2. Update to the correct path (use `/docs/...` format)
3. Run `pnpm check-links` to verify

### Asset Check Fails

1. Ensure the image file exists in `/assets`, `/images`, or `/img`
2. Update the image path in the markdown
3. Or add the missing image file
4. Run `pnpm check-assets` to verify

### Format Issues

The pre-commit hook auto-fixes formatting, so just:
1. Add the changes: `git add .`
2. Commit again: `git commit -m "Your message"`

## Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| Format | `pnpm prettier --write "**/*.{md,mdx,json,ts,tsx,js,jsx}"` | Format all files |
| Spell Check | `pnpm check-spelling` | Check spelling in docs |
| Link Check | `pnpm check-links` | Validate internal links |
| Asset Check | `pnpm check-assets` | Verify image references |
| Lint Staged | `pnpm precommit` | Format + spell check staged files |

## CI/CD Integration

These checks should also run in CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Check Links
  run: pnpm check-links

- name: Check Spelling
  run: pnpm check-spelling

- name: Check Assets
  run: pnpm check-assets
```

## Benefits

✅ **Consistent Quality** - All documentation meets the same standards
✅ **No Broken Links** - Users never hit 404s
✅ **Professional Appearance** - Proper spelling and formatting
✅ **Fast Feedback** - Catch issues before they reach main branch
✅ **Automated** - No manual effort required

