---
title: Packages
description: Lux 自带 package 的 runtime、compile-time 和 host 约定。
---

# Packages

Lux package 按目录约定发现。普通 package 没有单独 package manifest；
package id 是 package root 下的目录路径。

```text
packages/lux/ui/
  src/module.lux
  host/module.lux
```

## Phases

```text
src/          runtime Lux，import 时编译成 Lua
compiletime/  macro/helper Lux，由 luxc 离线执行
host/         host transform Lux，由 luxc 离线执行
```

一个 package 可以组合多个 phase。`@lux/ui` 同时有 runtime code 和 host
transform。`@lux/macros` 暴露 compile-time macro。runtime package code
不会被写死在 Rust codegen 里。

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

项目 package root 通过 `lux.toml` 的 `package_roots` 添加。内置 package
先加载，重复 package id 会报错。

## Package 内的 module part

package phase 目录也使用同一套 module part model：

```text
packages/lux/mgfx/widgets/src/
  module.lux
  cl_base.lux
  cl_progress.lux
  cl_install.lux
```

这个 phase module 的所有 part 共享 module-private scope。entry part 可
以声明 `part order` 来保证初始化顺序。
