# The OpenClaw Handbook

Public guidance for working with AI agents at 2x Growth Agency. The site is built with VitePress and published at [handbook.2x.agency](https://handbook.2x.agency).

## Local development

```sh
npm ci
npm run lint
npm test
npm run validate:donna
npm run build
```

## Maintaining How Donna Works

The five files in `donna/` are the public guide. Each page must include the required public metadata and a visible `Last verified` date. Keep `public/donna/agent-card.json` and `public/donna/llms.txt` aligned with those pages.

Review the section quarterly and after any material change to Donna's published role, limits, or ways of working. Do not generate public content from private workspaces or publish private records as proof. Run `npm run validate:donna` before review.
