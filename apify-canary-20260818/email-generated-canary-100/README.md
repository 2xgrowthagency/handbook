# Email Generated — 100-Lead Apify Canary

**Prepared:** 2026-08-18  
**Source workbook:** `2x Growth Agency (2x) // Shopify Cold Outreach - July 2026`  
**Source tab:** `Email generated`  
**Production write status:** **NONE** — this package is read-only input/QA scaffolding.  
**Sample size:** 100 leads

## Sample design

This is a deterministic, tier-stratified, boundary-weighted canary:

- **30 T2 leads:** sheet rows `2–31`
- **30 T3 leads:** sheet rows `67–96`
- **40 T4 leads:** sheet rows `103–142`

The T4 sample begins at the actual T3→T4 transition and deliberately includes boundary-sensitive rows such as `Not Basics` at 26 old active ads and `sota clothing` at 29. The objective is not population estimation; it is to stress-test count integrity, tier drift, anomaly handling, and whether existing generated emails may now be based on stale tier assignments.

## Files

- `page-scoped-input-100.txt` — 100 page-scoped Meta Ad Library URLs for Apify ingestion.
- `manifest-100.csv` — immutable mapping back to source sheet row, company, vetted Facebook identity, expected Page ID, old count, and old tier.
- A normalized QA/result file should be added only **after** the Apify run. Do not fabricate or prefill new counts.

## Apify run settings

Actor: `apify/facebook-ads-scraper`

Use:

- Active status: `ACTIVE`
- `onlyTotal`: OFF
- `resultsLimit`: 1 **requested/intended**
- About-page info: OFF
- Extra/details-per-ad: OFF
- Dates/sorting/ecommerce: default unless the existing actor preset requires otherwise

### Known actor caveat

Recent proof runs did **not** consistently enforce `resultsLimit = 1`; positive advertisers sometimes returned multiple/all ad records. This is currently treated as an efficiency/cost issue, **not** evidence that the count QA rule is invalid. Do not silently interpret excess returned records as a canary failure.

## QA acceptance rules

For every row:

1. The resolved Page ID must match `expected_page_id`.
2. `totalCount > 0` requires at least one actual active ad record in `results`.
3. `totalCount > 0` with `results = []` is an **ANOMALY** → retry / do not tier.
4. `totalCount = 0` with a clean completed response and `results = []` is a **zero candidate**; retain the current lightweight second-confirmation policy until this 100-lead canary gives evidence to remove it.
5. CAPTCHA, system issue, incomplete response, missing result, or wrong Page ID → retry / review.
6. Do not regenerate emails during this first pass.
7. Do not modify the production Google Sheet from the raw actor output.

## Normalized result schema

The post-run QA artifact should contain at least:

```text
canary_index
sheet_row
company
website
source_facebook_url
expected_page_id
resolved_page_id
input_meta_url
old_ad_count
old_tier
new_ad_count
delta
result_count
has_active_record
is_result_complete
captcha_required
system_status
qa_outcome
new_tier
tier_changed
```

Tier rules:

- T0 = 0
- T1 = 1–5
- T2 = 6–15
- T3 = 16–25
- T4 = 26+

A changed count is informational. A changed **tier** is operationally important and should flag the existing generated email for review/regeneration later.

## Pass condition for architecture

The canary is meant to validate the production direction:

```text
one primary Apify run
→ accept clean positive with active-record evidence
→ conditionally retry anomalies/errors
→ retain zero confirmation until evidence supports simplifying it
```

No canary file in this directory should be merged into production logic or used to overwrite `Email generated` until the QA results are reviewed.
