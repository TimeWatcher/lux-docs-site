---
description: 面向 Lux 开发者的语言、GMod 后端、package、宏系统和 MGFX 文档。
pageType: home

hero:
  name: Lux
  text: 面向现代 GLua 的编译器优先语言。
  tagline: Lux 离线编译为可读 Lua 5.1，同时提供目录模块、显式 export、GMod realm 构建、宏、host transform、枚举、match 和 source map。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: 模块系统
      link: /zh/language/modules
  image:
    src: /lux-mark.svg
    alt: Lux 标识
features:
  - title: 目录模块
    details: 一个 module 是一组 part 文件组成的目录，共享同一个逻辑 module scope，并有稳定入口和源码级 part order。
    icon: M
    link: /zh/language/modules
  - title: GMod realm
    details: client、server、shared 由文件、目录、声明和 realm block 表达，不再靠手写 loader guard。
    icon: G
    link: /zh/language/realms
  - title: 显式公共 API
    details: export 是从 module-private binding 到公开名称的映射；import 在生成 Lua 前就会按公开名检查。
    icon: E
    link: /zh/language/imports-exports
  - title: 明确的语法高亮
    details: Lux code block 使用专门 grammar 和稳定 token palette，不再被站点品牌色冲淡。
    icon: H
    link: /zh/language/
  - title: Package phase
    details: runtime、macro、host 代码都写在 Lux package 的约定目录里。
    icon: P
    link: /zh/packages/
  - title: 可调试的生成 Lua
    details: 后端输出纯 GLua module、source map、可读 source comment 和 bundle 私有 loader。
    icon: L
    link: /zh/reference/generated-lua
---
