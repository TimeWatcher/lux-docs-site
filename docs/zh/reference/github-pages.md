---
title: GitHub Pages
description: 在 GitHub Pages 上构建和发布 Lux Rspress 文档站。
---

# GitHub Pages

Rspress 输出静态文件，因此 GitHub Pages 部署可以用简单 CI workflow 完成。

## 本地构建

```powershell
cd docs-site
npm ci
npm run build
```

生成结果在 `docs-site/doc_build/`。

## Base path

如果是 `https://name.github.io/` 这种用户或组织站点，不需要特殊 base path。

如果是 `https://name.github.io/lux/` 这种项目站点，部署前在 `rspress.config.ts`
里设置 `base: '/lux/'`。`/lux-mark.svg` 这类 public asset 也必须能在该 base 下
解析。

## GitHub Actions 形状

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
