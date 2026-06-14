# Lux Documentation Site

Rspress-based bilingual documentation site for Lux.

## Commands

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 4173
npm run build
npm run preview -- --host 127.0.0.1 --port 4174
```

## Structure

```text
docs/en/   English documentation
docs/zh/   Simplified Chinese documentation
theme/     Rspress theme overrides
```

Production files are written to `doc_build/`. For GitHub project pages such as
`https://name.github.io/lux/`, set `base: '/lux/'` in `rspress.config.ts`
before deployment.
