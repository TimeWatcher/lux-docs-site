---
title: GitHub Pages
description: Build and publish the Rspress Lux documentation site on GitHub Pages.
---

# GitHub Pages

Rspress outputs static files, so GitHub Pages deployment can be a simple CI
workflow.

## Local build

```powershell
cd docs-site
npm ci
npm run build
```

The generated site is written to `docs-site/doc_build/`.

## Base path

For a user or organization site such as `https://name.github.io/`, no special
base path is required.

For a project site such as `https://name.github.io/lux/`, set `base: '/lux/'` in
`rspress.config.ts` before deployment. Public assets such as `/lux-mark.svg`
must still resolve under that base.

## GitHub Actions shape

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  pages:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: docs-site/package-lock.json
      - run: npm ci
        working-directory: docs-site
      - run: npm run build
        working-directory: docs-site
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs-site/doc_build
      - uses: actions/deploy-pages@v4
```
