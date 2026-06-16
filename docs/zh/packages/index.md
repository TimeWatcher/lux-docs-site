---
title: Packages
description: Lux package set 的 runtime、compile-time 和 host 约定。
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

一个 package 可以组合多个 phase。`@lux/ui` 目前是面向语法变形的中间层，带有 host
transform，但还不是具体 UI 后端。`@lux/macros` 暴露 compile-time macro。runtime
package code 不会被写死在 Rust codegen 里。

## 官方 `lux-std` packages

- `@lux/std`
- `@lux/gmod`
- `@lux/reactive`
- `@lux/ui`
- `@lux/macros`
- `@lux/gmod/macros`
- `@lux/compile/macro`
- `@lux/compile/host`

官方 package set 按项目安装：

```powershell
luxc init my_addon --std
luxc install @lux/gmod --from github:TimeWatcher/lux-packages --project my_addon
```

`lux.lock` 里的 package root 会自动加载。`lux.toml` 的 `package_roots` 主要用于本地
package 开发 checkout。重复 package id 会报错。

外部 package set，包括 MGFX，通过 `luxc install` 按项目安装。package set 可以来自
GitHub archive、zip URL 或本地路径；多层依赖由 package set 的 source hint 自动解析，
并写入 `lux.lock`。

Lux 没有 registry。package id 不意味着某个默认来源或最新版本；`lux.toml` 里的依赖条目
必须显式写 `github`、`url` 或 `path`。GitHub 来源可以再用 `tag`、`branch` 或
`commit` 固定。`lux.package.toml` 里的 package version 只作为所选 package graph 的兼容性
约束。

`luxc lock` 只会按当前 manifest 重建 `lux.lock`，不会查找或更新新版本。`luxc remove
<package-id>` 会从 `lux.toml` 删除直接依赖并重写 lockfile，顺带剪掉不再需要的传递
package。

## Package 内的 module part

package phase 目录也使用同一套 module part model：

```text
packages/vendor/widgets/src/
  module.lux
  cl_base.lux
  cl_progress.lux
  cl_install.lux
```

这个 phase module 的所有 part 共享 module-private scope。entry part 可
以声明 `part order` 来保证初始化顺序。
