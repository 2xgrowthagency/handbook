# Email Generated — Remaining 101-Lead Enrichment Batch

**Prepared:** 2026-08-18  
**Source workbook:** `2x Growth Agency (2x) // Shopify Cold Outreach - July 2026`  
**Source tab:** `Email generated`  
**Production write status:** NONE  
**Batch size:** 101 unique Meta Page IDs

## Scope

This package contains every populated lead not included in the finalized 150-lead canary.

Included source rows:

- `47–66` — 20 remaining T2 leads
- `172–252` — 81 remaining T4 leads

Validation:

- 101 rows
- 101 unique Page IDs
- 0 Page-ID overlap with the finalized 150-lead canary
- 150 + 101 = **251 total populated leads covered**

## Files

- `page-scoped-input-101.txt` — exact 101 Page-ID-scoped Meta Ad Library URLs.
- `manifest-101.csv` — source mapping, historical count and tier.
- `final-results-101.csv` — finalized current ad counts and refreshed tiers.

## Batch 2 final status — CLOSED

Batch 2 is complete. No fourth Apify run is required.

Final reconciliation:

- 101/101 expected Page IDs present in the final count-capable export
- 101/101 returned a positive `totalCount`
- 101/101 already had a matching active-ad evidence record from the earlier evidence pass
- 0 Page-ID mismatches
- 0 CAPTCHA events
- 0 reported Meta Ad Library system issues
- 0 unresolved rows
- 0 `CODEX_REVIEW_REQUIRED` rows from this batch

Two evidence records (`The Mitten State`, Page ID `108881112460`, and `Sunday Swagger`, Page ID `552047315321061`) had `pageInfo.page = null`, but their returned ad records exactly matched the expected Page IDs. Their final count results were also positive (`313` and `217` respectively), so these records are accepted.

## Tier refresh

Current count-derived tier distribution:

- T1: 4
- T2: 11
- T3: 7
- T4: 79

12 of the 101 leads changed operational tier from the historical sheet tier:

- Matuse, Inc.: T4 → T3 (25)
- Robin Piccone: T2 → T4 (32)
- Laura of Pembroke: T2 → T1 (1)
- Alyth Active: T2 → T1 (3)
- Double B Boot Company: T4 → T3 (25)
- DeadSoxy: T2 → T1 (4)
- True Fashionistas Designer Resale: T2 → T1 (4)
- The Bra Lab: T2 → T3 (18)
- Surfside Supply Co.: T2 → T3 (17)
- Sweetfeet.: T4 → T3 (21)
- Underwater Weaving Studio: T4 → T3 (20)
- Little Poppy Co: T2 → T3 (17)

Historical count movement by itself remains telemetry only; these tier changes are accepted because the final count is positive and matching active evidence exists.

## Run history

### Evidence pass — VALID

Export: `dataset_facebook-ads-scraper-task_2026-08-18_14-02-29-867.json`

- 101 output rows
- 101 unique intended Page IDs
- 101/101 returned a matching active ad record
- no CAPTCHA/system issues

### Listing run — MISCONFIGURED / NOT USED FOR COUNTS

Export: `dataset_facebook-ads-scraper-task_2026-08-18_14-12-37-190.json`

- returned individual ads rather than usable count summaries
- only 45 of 101 intended Page IDs represented
- excluded from final count QA

### Final count-capable run — VALID FOR THIS BATCH

Export: `dataset_facebook-ads-scraper-task_2026-08-18_14-20-04-783(1).json`

- 101 rows
- 101 unique intended Page IDs
- `totalCount` present on every row
- all counts positive
- nested `totalCount` values, where present, agree with the top-level value
- returned records, where present, are active and reconcile to the intended Page ID

Important cost note: although this export is count-capable, it still contains large nested ad-record arrays for many pages. It should **not** be used as the target output shape for the post–Batch 2 cost-optimized production workflow. Future total-count passes should use the Actor's true `onlyTotal` behavior and should be validated to return the cheapest summary-style output rather than bulk ad records.

## Post–Batch 2 workflow

Beginning with the next batch, use the adopted cost-optimized architecture documented in `APIFY_OPERATING_RULES.md`:

```text
Run 1: Total Count ON — all leads
Run 2: Total Count ON — all leads, reshuffled
Run 3: Total Count OFF + Results Limit 1 — exceptions only
Still unresolved → CODEX_REVIEW_REQUIRED
```

Before scaling that architecture, verify on a small canary that Total Count ON is truly producing one cheap summary result per Page ID rather than nested/bulk ad records.

## Guardrails

- Reconcile by Page ID, never company name.
- Preserve raw exports.
- No production Sheet writes were made during Batch 2 QA.
- Do not regenerate email copy until refreshed tiering is accepted for downstream use.
