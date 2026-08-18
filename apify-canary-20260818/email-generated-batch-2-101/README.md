# Email Generated — Remaining 101-Lead Enrichment Batch

**Prepared:** 2026-08-18  
**Source workbook:** `2x Growth Agency (2x) // Shopify Cold Outreach - July 2026`  
**Source tab:** `Email generated`  
**Production write status:** NONE  
**Batch size:** 101 unique Meta Page IDs

## Scope

This package contains **every populated lead not included in the finalized 150-lead canary**.

Included source rows:

- `47–66` — 20 remaining T2 leads
- `172–252` — 81 remaining T4 leads

There are **no remaining T3 leads** because the first 150-lead canary intentionally included every T3 row.

The live tab's last populated lead is row `252`; rows `253–297` are not part of the remaining population.

Validation:

- 101 rows
- 101 unique Page IDs
- 0 Page-ID overlap with the finalized 150-lead canary
- 150 + 101 = **251 total populated leads covered**

## Files

- `page-scoped-input-101.txt` — exact 101 Page-ID-scoped Meta Ad Library URLs.
- `manifest-101.csv` — source mapping, historical count and tier.
- This README.

## Apify machine-input URL

Use the raw GitHub file URL, never the normal GitHub blob page:

```text
https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260818/email-generated-batch-2-101/page-scoped-input-101.txt
```

## Run architecture

Use the locked three-run maximum from the finalized canary:

### Run 1 — Count

Use the same proven count-mode configuration used by the finalized canary.

### Run 2 — One-ad evidence

Use the same 101 URLs with one-ad evidence settings (`resultsLimit = 1`).

### Run 3 — conditional only

Generate a retry list only for:

- `count = 0` + no evidence
- `count = 0` + evidence found
- `count > 0` + no evidence
- CAPTCHA/system/identity structural failures

No historical-count-delta-only retries.

After Run 3, unresolved rows become `CODEX_REVIEW_REQUIRED`; do not run Apify a fourth time.

## Guardrails

- Reconcile by Page ID, never company name.
- Preserve raw exports.
- Do not write back to the production Sheet during QA.
- Do not regenerate email copy until refreshed tiering is accepted.
