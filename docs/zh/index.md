---
description: 面向 Lux 开发者的语言、GMod 后端、package、宏系统和 MGFX 文档。
pageType: home

hero:
  name: Lux
  text: 面向现代 GLua 的编译器优先语言。
  tagline: Lux 离线编译为可读 Lua 5.1，同时提供目录模块、显式导出、GMod 运行域构建、宏、宿主变换、枚举、match 和源码映射。
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
    details: 一个模块由目录内的多个 part 文件组成，共享同一个逻辑模块作用域，并有稳定入口和源码级 part order。
    icon: M
    link: /zh/language/modules
  - title: GMod 运行域
    details: client、server、shared 由文件、目录、声明和运行域代码块表达，不再靠手写 loader guard。
    icon: G
    link: /zh/language/realms
  - title: 显式公共 API
    details: export 是从模块私有绑定到公开名称的映射；import 在生成 Lua 前就会按公开名检查。
    icon: E
    link: /zh/language/imports-exports
  - title: 现代 GLua 语法
    details: guard 语句、可选访问、nil 合并、解构、表展开、管道、do 表达式和模板字符串都会编译回普通 Lua。
    icon: S
    link: /zh/language/functions-control
  - title: 包阶段
    details: 运行时代码、宏代码和宿主变换代码都写在 Lux 包的约定目录里。
    icon: P
    link: /zh/packages/
  - title: 可调试的生成 Lua
    details: 后端输出纯 GLua 模块、源码映射、可读源码注释和 bundle 私有 loader。
    icon: L
    link: /zh/reference/generated-lua
---
