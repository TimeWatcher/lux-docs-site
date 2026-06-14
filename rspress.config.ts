import * as path from 'node:path';
import { defineConfig } from '@rspress/core';
import { luxLanguage } from './theme/luxLanguage';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Lux',
  description: 'Lux language and GLua toolchain documentation.',
  lang: 'en',
  icon: '/lux-mark.svg',
  logo: {
    light: '/lux-mark.svg',
    dark: '/lux-mark.svg',
  },
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'Lux',
      description: 'Lux language and GLua toolchain documentation.',
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: 'Lux',
      description: 'Lux 语言与 GLua 工具链文档。',
    },
  ],
  markdown: {
    defaultWrapCode: true,
    globalComponents: [
      path.join(__dirname, 'theme/LuxLuaPair.tsx'),
    ],
    shiki: {
      langAlias: {
        luxc: 'lux',
      },
      langs: [
        luxLanguage,
        'lua',
        'powershell',
        'toml',
        'yaml',
        'text',
        'tsx',
        'ts',
        'js',
      ],
    },
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/',
      },
    ],
  },
});
