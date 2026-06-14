# Lux Documentation Site

This repository contains the public Lux documentation site.

- Live site: <https://timewatcher.github.io/lux-docs-site/>
- Main repository: <https://github.com/TimeWatcher/lux>
- Built-in packages: <https://github.com/TimeWatcher/lux-packages>

The site is built with Rspress and maintained as the `docs-site/` submodule of
the main Lux repository.

## Local Development

Install dependencies:

```powershell
npm install
```

Start the dev server:

```powershell
npm run dev -- --host 127.0.0.1 --port 4173
```

Build the static site:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview -- --host 127.0.0.1 --port 4174
```

Production files are written to `doc_build/`.

## Repository Layout

```text
docs/en/        English documentation
docs/zh/        Simplified Chinese documentation
theme/          Rspress theme overrides and global MDX components
theme/LuxLuaPair.tsx
                Code tab component for Lux and generated Lua examples
theme/luxLanguage.ts
                Lux grammar for Shiki highlighting
```

## Writing Rules

Lux documentation is bilingual. When changing a conceptual page, update the
English and Simplified Chinese versions together.

For code examples that explain Lux behavior, include both Lux source and the
generated Lua shape using `LuxLuaPair`:

~~~mdx
<LuxLuaPair title="Export alias" luxLabel="Lux" luaLabel="Generated Lua">

```lux
local player_inventory = {}
export { p_inv = player_inventory }
```

```lua
local player_inventory = {}
__lux_exports.p_inv = player_inventory
```

</LuxLuaPair>
~~~

Use plain Markdown code fences only when the example is not about Lux-to-Lua
behavior, such as command output, TOML configuration, or conceptual text.

## GitHub Pages

The site is deployed by `.github/workflows/pages.yml`.

For local builds, `rspress.config.ts` uses `/` as the base path. In GitHub
Actions, the workflow sets `GITHUB_PAGES=true`, which switches the base path to
`/lux-docs-site/`.

Manual deployment is not needed. Push to `main` and GitHub Actions publishes the
site to:

<https://timewatcher.github.io/lux-docs-site/>

## Useful Commands

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4174
```

## License

The documentation site uses a split license model:

- Site source code, theme components, examples, and build scripts are licensed
  under `MIT OR Apache-2.0`.
- Documentation prose is licensed under `CC-BY-4.0`.
- Code examples and generated-code snippets inside documentation are licensed
  under `MIT OR Apache-2.0`.
- Documentation about MGFX describes a separately licensed package: MGFX is
  licensed for non-commercial use only, and commercial use requires a separate
  written license from the copyright holder.
- The Lux name, logo, icon, and other branding assets are not licensed for
  reuse by these open source licenses.

See [LICENSE](LICENSE), [LICENSE-MIT](LICENSE-MIT),
[LICENSE-APACHE](LICENSE-APACHE), [LICENSE-DOCS](LICENSE-DOCS), and
[NOTICE](NOTICE).
