import type { LanguageRegistration } from 'shiki';

export const luxLanguage: LanguageRegistration = {
  name: 'lux',
  displayName: 'Lux',
  scopeName: 'source.lux',
  patterns: [
    { include: '#comments' },
    { include: '#strings' },
    { include: '#declarations' },
    { include: '#keywords' },
    { include: '#constants' },
    { include: '#numbers' },
    { include: '#types' },
    { include: '#operators' },
  ],
  repository: {
    comments: {
      patterns: [
        {
          name: 'comment.block.lux',
          begin: '--\\[\\[',
          end: '\\]\\]',
        },
        {
          name: 'comment.line.double-dash.lux',
          match: '--.*$',
        },
      ],
    },
    strings: {
      patterns: [
        {
          name: 'string.quoted.double.lux',
          begin: '"',
          end: '"',
          patterns: [{ name: 'constant.character.escape.lux', match: '\\\\.' }],
        },
        {
          name: 'string.quoted.single.lux',
          begin: "'",
          end: "'",
          patterns: [{ name: 'constant.character.escape.lux', match: '\\\\.' }],
        },
        {
          name: 'string.quoted.template.lux',
          begin: '`',
          end: '`',
          patterns: [
            { name: 'constant.character.escape.lux', match: '\\\\.' },
            {
              name: 'meta.interpolation.lux',
              begin: '\\$\\{',
              end: '\\}',
              patterns: [
                { include: '#strings' },
                { include: '#keywords' },
                { include: '#constants' },
                { include: '#numbers' },
                { include: '#operators' },
              ],
            },
          ],
        },
      ],
    },
    declarations: {
      patterns: [
        {
          name: 'meta.function.declaration.lux',
          match:
            '\\b(export\\s+)?(shared\\s+|client\\s+|server\\s+)?(macro\\s+|host\\s+expr\\s+)?(fn)\\s+([A-Za-z_][A-Za-z0-9_:.]*)',
          captures: {
            '1': { name: 'keyword.control.import.lux' },
            '2': { name: 'storage.modifier.realm.lux' },
            '3': { name: 'storage.modifier.phase.lux' },
            '4': { name: 'keyword.declaration.function.lux' },
            '5': { name: 'entity.name.function.lux' },
          },
        },
        {
          name: 'meta.import.lux',
          match:
            '\\b(import|export|extern|public|all|macro|host|package|from|as)\\b',
          captures: {
            '1': { name: 'keyword.control.import.lux' },
          },
        },
        {
          name: 'meta.enum.declaration.lux',
          match:
            '\\b(export\\s+)?(runtime\\s+)?(enum)\\s+([A-Za-z_][A-Za-z0-9_]*)',
          captures: {
            '1': { name: 'keyword.control.import.lux' },
            '2': { name: 'storage.modifier.phase.lux' },
            '3': { name: 'keyword.declaration.enum.lux' },
            '4': { name: 'entity.name.type.enum.lux' },
          },
        },
        {
          name: 'meta.part.order.lux',
          match: '\\b(part)\\s+(order|before|after)\\b',
          captures: {
            '1': { name: 'keyword.control.module.lux' },
            '2': { name: 'keyword.control.module.lux' },
          },
        },
      ],
    },
    keywords: {
      patterns: [
        {
          name: 'keyword.control.lux',
          match:
            '\\b(match|if|then|else|for|while|repeat|until|do|return|break|continueif|breakif|stopif|stopifn)\\b',
        },
        {
          name: 'storage.modifier.lux',
          match:
            '\\b(local|const|client|server|shared|runtime|repr|number|string|table|existing)\\b',
        },
        {
          name: 'support.constant.gmod.realm.lux',
          match: '\\b(SERVER|CLIENT)\\b',
        },
      ],
    },
    constants: {
      patterns: [
        {
          name: 'constant.language.lux',
          match: '\\b(nil|true|false|_)\\b',
        },
      ],
    },
    numbers: {
      patterns: [
        {
          name: 'constant.numeric.lux',
          match: '\\b(?:0x[0-9A-Fa-f]+|\\d+(?:\\.\\d+)?)\\b',
        },
      ],
    },
    types: {
      patterns: [
        {
          name: 'support.type.lux',
          match: '\\b[A-Z][A-Za-z0-9_]*\\b',
        },
      ],
    },
    operators: {
      patterns: [
        {
          name: 'keyword.operator.lux',
          match: '=>|->|\\|>|\\?\\?|\\?[:.\\[]|\\.\\.|[+\\-*/%#=<>~|&!]+',
        },
        {
          name: 'punctuation.separator.lux',
          match: '[{}()\\[\\],;:]',
        },
      ],
    },
  },
};
