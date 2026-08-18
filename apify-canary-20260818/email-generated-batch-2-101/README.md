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

The uploaded Apify export `dataset_facebook-ads-scraper-task_2026-08-18_14-02-29-867.json` is classified as the **one-ad evidence pass**, not the count pass.

Validation of that export:

- 101 output rows
- 101 unique input Page IDs
- 101 unique returned Page IDs
- 0 Page-ID mismatches
- 101/101 returned an active ad record
- 0 CAPTCHA events
- 0 reported Meta Ad Library system issues
- no `totalCount` field was present, so it cannot serve as the count pass

Two records (`The Mitten State`, Page ID `108881112460`, and `Sunday Swagger`, Page ID `552047315321061`) had `pageInfo.page = null`, but each still returned a real active ad whose Page ID exactly matched the intended input. They therefore count as valid positive evidence and are not Underoutfit-style failures.

The actor output indicates a one-result/evidence-style limit was effectively in force. This run is preserved as useful evidence rather than discarded.

## Remaining run architecture

The order is now effectively reversed for Batch 2:

### Count pass — NEXT

Run the same 101 URLs using the proven count-mode configuration from the finalized canary.

Critical setting distinction:

- Active status: ACTIVE
- Total Count: OFF
- **Results Limit: blank / unset — do not leave `1` in this field**
- About-page info: OFF
- Extra/ad details: OFF
- Date/sort/ecommerce: default

The count export must expose `totalCount` values. If the export again produces exactly one ad object per Page ID with no `totalCount`, treat it as evidence mode and inspect the Results Limit field before another attempt.

### Third run — conditional only

After joining count + evidence, generate a third-run list only for:

- `count = 0` + no evidence
- `count = 0` + evidence found
- `count > 0` + no evidence
- CAPTCHA/system/identity structural failures

No historical-count-delta-only retries.

After the third Apify run, unresolved rows become `CODEX_REVIEW_REQUIRED`; do not run Apify a fourth time.

## Guardrails

- Reconcile by Page ID, never company name.
- Preserve raw exports.
- Do not write back to the production Sheet during QA.
- Do not regenerate email copy until refreshed tiering is accepted.
