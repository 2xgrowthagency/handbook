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

## Current progress

### Evidence pass — COMPLETE

The uploaded Apify export `dataset_facebook-ads-scraper-task_2026-08-18_14-02-29-867.json` is the **one-ad evidence pass**.

Validation:

- 101 output rows
- 101 unique input Page IDs
- 101 unique returned Page IDs
- 0 Page-ID mismatches
- 101/101 returned an active ad record
- 0 CAPTCHA events
- 0 reported Meta Ad Library system issues
- no `totalCount` field was present

Two records (`The Mitten State`, Page ID `108881112460`, and `Sunday Swagger`, Page ID `552047315321061`) had `pageInfo.page = null`, but each still returned a real active ad whose Page ID exactly matched the intended input. They count as valid positive evidence.

### Misconfigured listing run — NOT A COUNT PASS

The uploaded export `dataset_facebook-ads-scraper-task_2026-08-18_14-12-37-190.json` was run with Total Count OFF and Results Limit not set to the evidence value. It did **not** produce count summaries.

Observed result:

- 420 individual ad rows
- only 45 of 101 intended input Page IDs represented
- up to 10 ad rows per represented Page ID
- no `totalCount` field anywhere
- therefore unusable as the batch count pass

This run is preserved as a configuration lesson, not used for count QA.

## Correct actor-mode distinction

Current Apify documentation for `apify/facebook-ads-scraper` defines `onlyTotal` / **Total Count** as the actual count-mode switch: when enabled, the Actor returns one dataset item per page with the total number of matching ads instead of scraping individual ads.

The previous project note that count mode should use Total Count OFF was incorrect and has been superseded.

### Count pass — NEXT

Use:

- Active status: **ACTIVE**
- Total Count / `onlyTotal`: **ON**
- Results Limit: **blank / unset**
- About-page info: **OFF**
- Extra/ad details: **OFF**
- Date/sort/ecommerce: default

Acceptance check for this run:

- one summary-style dataset item per intended Page ID
- `totalCount` present for each page/result
- Page ID reconciliation still performed by expected Page ID
- CAPTCHA/system failures remain anomalies

### Evidence mode

Use:

- Active status: **ACTIVE**
- Total Count / `onlyTotal`: **OFF**
- Results Limit: **1**
- About-page info: **OFF**
- Extra/ad details: **OFF**

Purpose: retrieve one real active-ad proof record, not magnitude.

## Three-run ceiling for this batch

Because Batch 2 has already consumed two Actor executions (the valid evidence pass plus the misconfigured listing run), the next correct count pass is the **third and final Apify execution for this batch**.

After joining the final count pass with the already-completed evidence pass:

- `count > 0` + evidence found → accept
- `count = 0` + evidence found → send directly to `CODEX_REVIEW_REQUIRED`
- missing/contradictory count or identity/system failure → send directly to `CODEX_REVIEW_REQUIRED`

Do **not** perform a fourth Apify run for this batch.

Historical count movement remains telemetry only and does not trigger another scrape.

## Guardrails

- Reconcile by Page ID, never company name.
- Preserve raw exports.
- Do not write back to the production Sheet during QA.
- Do not regenerate email copy until refreshed tiering is accepted.
