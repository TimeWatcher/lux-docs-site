---
title: Packages
description: Runtime, compile-time, and host package conventions shipped with Lux.
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

A package can combine phases. `@lux/ui` has runtime code and host transforms.
`@lux/macros` exposes compile-time macros. Runtime package code is not embedded
in Rust codegen.

## Built-in packages

- `@lux/std`
- `@lux/gmod`
- `@lux/reactive`
- `@lux/ui`
- `@lux/mgfx`
- `@lux/macros`
- `@lux/gmod/macros`
- `@lux/compile/macro`
- `@lux/compile/host`

Project package roots are added through `package_roots` in `lux.toml`. Built-in
packages load first, and duplicate package ids are rejected.

## Module parts inside packages

Package phase directories use the same module part model as projects:

```text
packages/lux/mgfx/widgets/src/
  module.lux
  cl_base.lux
  cl_progress.lux
  cl_install.lux
```

All parts in that phase module share module-private scope. The entry part can
declare `part order` for deterministic initialization.
