---
description: Lux developer documentation for the language, GMod backend, packages, macros, and MGFX.
pageType: home

hero:
  name: Lux
  text: A compiler-first language for modern GLua.
  tagline: Lux compiles offline to readable Lua 5.1 while adding directory modules, explicit exports, realm-aware GMod builds, macros, host transforms, enums, match, and source maps.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Module System
      link: /language/modules
  image:
    src: /lux-mark.svg
    alt: Lux mark
features:
  - title: Directory modules
    details: A module is a directory of part files sharing one logical module scope, with a stable entry part and source-level part order.
    icon: M
    link: /language/modules
  - title: Realm-aware GMod
    details: Client, server, and shared code are expressed by files, directories, declarations, and realm blocks instead of handwritten loader guards.
    icon: G
    link: /language/realms
  - title: Explicit public API
    details: Exports map private module bindings to public names; imports resolve against those names before code generation.
    icon: E
    link: /language/imports-exports
  - title: Strong syntax highlighting
    details: Lux code blocks use a dedicated grammar and stable token palette, not the site brand color.
    icon: H
    link: /language/
  - title: Package phases
    details: Runtime, macro, and host code live in Lux packages under convention-based directories.
    icon: P
    link: /packages/
  - title: Generated Lua you can debug
    details: The backend emits pure GLua modules, source maps, readable comments, and bundle-private loaders.
    icon: L
    link: /reference/generated-lua
---
