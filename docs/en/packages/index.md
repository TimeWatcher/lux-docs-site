---
title: Packages
description: Runtime, compile-time, and host package conventions for Lux package sets.
---

# Packages

Lux packages are discovered by directory convention. There is no per-package
manifest for normal packages; the package id is the directory path under a
package root.

```text
packages/lux/ui/
  src/module.lux
  host/module.lux
```

## Phases

```text
src/          runtime Lux compiled into Lua when imported
compiletime/  macro/helper Lux evaluated by luxc
host/         host transform Lux evaluated by luxc
```

A package can combine phases. `@lux/ui` currently acts as a syntax-facing layer
with host transforms. `@lux/macros` exposes compile-time macros. Runtime
package code is not embedded in Rust codegen.

## Official `lux-std` packages

- `@lux/std`
- `@lux/gmod`
- `@lux/reactive`
- `@lux/ui`
- `@lux/macros`
- `@lux/gmod/macros`
- `@lux/compile/macro`
- `@lux/compile/host`

Install the official package set per project:

```powershell
luxc init my_addon --std
luxc install @lux/gmod --from github:TimeWatcher/lux-std --project my_addon
```

Locked package roots are loaded automatically from `lux.lock`.
`package_roots` in `lux.toml` is for local package development checkouts.
Duplicate package ids are rejected.

External package sets, including MGFX, are installed per project with `luxc
install`. A package set can be fetched from GitHub archives, zip URLs, or local
paths; transitive dependencies are resolved from the package set's source
hints and recorded in `lux.lock`.

Lux does not have a registry. Package ids do not imply a source or latest
version; the dependency entry in `lux.toml` chooses a concrete source with
`github`, `url`, or `path`. GitHub sources can be pinned with `tag`, `branch`,
or `commit`. Package versions inside `lux.package.toml` are compatibility
constraints for the selected package graph.

`luxc lock` regenerates `lux.lock` from the manifest. It does not update or
search for newer package versions. `luxc remove <package-id>` removes a direct
dependency from `lux.toml` and rewrites the lockfile, pruning transitive
packages that are no longer required.

## Module parts inside packages

Package phase directories use the same module part model as projects:

```text
packages/acme/widgets/src/
  module.lux
  cl_base.lux
  cl_progress.lux
  cl_install.lux
```

All parts in that phase module share module-private scope. The entry part can
declare `part order` for deterministic initialization.
