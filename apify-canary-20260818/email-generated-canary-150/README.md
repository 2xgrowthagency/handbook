# Email Generated — 150-Lead Apify Canary

**Prepared:** 2026-08-18  
**Source workbook:** `2x Growth Agency (2x) // Shopify Cold Outreach - July 2026`  
**Source tab:** `Email generated`  
**Production write status:** **NONE** — this package is read-only input/QA scaffolding.  
**Sample size:** 150 unique Meta Page IDs

## Sample design

This expands the previously prepared 100-lead canary instead of discarding it.

- Existing base: 100 leads
  - 30 T2: sheet rows `2–31`
  - 30 T3: sheet rows `67–96`
  - 40 T4: sheet rows `103–142`
- Added for the 150-lead canary: 50 leads
  - 15 T2: sheet rows `32–46`
  - 6 T3: sheet rows `97–102`
  - 29 T4: sheet rows `143–171`

Final mix:

- **45 T2**
- **36 T3** — this includes every T3 row in the current `Email generated` tab
- **69 T4**

The sample intentionally retains threshold-sensitive rows, including T2 counts close to 6/15, T3 counts close to 16/25, and T4 counts at/near 26. It also contains larger T4 advertisers so the canary tests both tier-boundary behavior and high-count behavior.

## Files

- `page-scoped-input-150.txt` — the exact 150 page-scoped Meta Ad Library URLs. Reuse the same URL set for Pass 1 and Pass 2; the actor settings change between passes.
- `manifest-150.csv` — immutable mapping for all 150 leads back to source sheet row, company, vetted Facebook identity, expected Page ID, historical count, and historical tier.
- Post-run raw exports and normalized QA results should be added only after the Apify runs. Never prefill or infer new counts.

## Hosted-input rule for Apify

When Apify is given a hosted text list through `requestsFromUrl` or an equivalent remote-list input, use the **raw file URL**, not the normal GitHub file page.

Correct pattern:

```text
https://raw.githubusercontent.com/<owner>/<repo>/<ref>/<path>.txt
```

Do **not** use:

```text
https://github.com/<owner>/<repo>/blob/<ref>/<path>.txt
```

The normal `github.com/.../blob/...` URL is an HTML application page. Apify can crawl the GitHub page itself and discover GitHub JavaScript, CSS, navigation, avatars, documentation links, and other assets instead of importing the intended Facebook URLs.

For this canary, the Apify-facing hosted input is:

```text
https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260818/email-generated-canary-150/page-scoped-input-150.txt
```

Operational rule going forward:

- **Human review link:** `github.com/.../blob/...`
- **Apify machine-input link:** `raw.githubusercontent.com/...`
- Before a large run, verify the remote input resolves directly to newline-separated Facebook/Meta URLs and does not render GitHub HTML.

A 2026-08-18 failed canary attempt used the blob page and produced GitHub asset URLs instead of the 150 intended Meta URLs. That run is invalid and should not be used for count QA.

## Production architecture under test

The previous idea of running the same count workflow twice for every lead is superseded by a risk-weighted design:

```text
PASS 1: COUNT
+
PASS 2: ONE-AD EVIDENCE
→ accept normal positives
→ PASS 3 only for zeros / anomalies / materially suspicious changes
```

Not all information is equally important. Small count differences are acceptable for outreach. The QA objective is to catch grossly wrong counts, false zeros, false positives, broken Page-ID resolution, and technical failures.

## Pass 1 — Count

Actor: `apify/facebook-ads-scraper`

Purpose: obtain the active-ad `totalCount` used for enrichment/tiering.

Use:

- Active status: `ACTIVE`
- Total-count / `onlyTotal`: **ON**
- About-page info: OFF
- Extra/details-per-ad: OFF
- Date/sort/ecommerce: default unless required by the existing actor preset

If the UI still exposes `resultsLimit`, leaving it at 1 is fine, but count mode has previously ignored that limit. Extra records in count mode are treated as an efficiency issue, not as the count itself.

Save the raw JSON export unchanged as the **Pass 1 count export**.

## Pass 2 — One-ad evidence

Purpose: independently establish whether at least one real active ad can actually be retrieved for a page reported as active.

Use:

- Active status: `ACTIVE`
- Total-count / `onlyTotal`: **OFF**
- `resultsLimit`: **1**
- About-page info: OFF
- Extra/details-per-ad: OFF
- Date/sort/ecommerce: default unless required by the existing actor preset

The latest proof run showed this mode obeying the one-result limit for positive advertisers. It also preserved the useful failure signature where a page can report a positive `totalCount` yet return no actual active-ad record.

Save the raw JSON export unchanged as the **Pass 2 evidence export**.

## Pass 3 — Conditional only

Do **not** run a third pass for all 150 leads.

A third attempt is triggered only when the first two passes leave a materially uncertain result.

### Third-pass triggers

1. **Count = 0 + evidence empty**
   - Zero is an absence claim and is weaker than a positive backed by a real ad.
   - Re-run the flagged zero candidates separately/reshuffled in count mode.

2. **Count > 0 + no active-ad evidence**
   - Treat as an anomaly, not as a valid positive.
   - Re-run the evidence mode for the flagged Page ID in isolation or a small retry batch.
   - If it again cannot produce an active record, do not tier/accept the count merely because the same positive count repeats.

3. **Materially suspicious historical jump/drop**
   - Small count variance is acceptable.
   - Large discontinuities versus the stored historical count should trigger a targeted count recheck.
   - The canary will be used to calibrate what threshold is worth automating; do not invent a hard percentage before we inspect the results.

4. **Technical/identity anomaly**
   - CAPTCHA
   - Meta/Ad Library system issue
   - incomplete result
   - missing result
   - resolved Page ID does not match expected Page ID
   - retry the failed mode or send to review as appropriate.

## QA decision matrix

| Pass 1 count | Pass 2 evidence | Action |
|---|---|---|
| `>0` | active ad found | Accept unless there is another material QA flag |
| `0` | empty | Conditional Pass 3 zero confirmation |
| `>0` | empty | Anomaly → conditional Pass 3 evidence retry |
| `0` | active ad found | Anomaly → targeted retry/review |
| incomplete / CAPTCHA / system issue / wrong Page ID | any | Retry/review |

## Count accuracy standard

Exact count equality is **not** the acceptance standard.

Examples such as `23 vs 25` or `70 vs 75` are usually operationally immaterial. The workflow should not spend a permanent third pass trying to eliminate harmless drift. What matters is whether a count is materially wrong enough to misrepresent the advertiser or produce the wrong outreach treatment.

Tier boundaries remain useful QA signals:

- T0 = 0
- T1 = 1–5
- T2 = 6–15
- T3 = 16–25
- T4 = 26+

A changed count is informational. A changed tier is operationally important, but small count movement by itself is not a failure.

## Known Axell-style failure

A reproducible positive count is not sufficient proof of correctness. The known Axell case repeatedly produced a positive count while no actual active-ad record could be retrieved. That is why the evidence pass is materially more useful than simply repeating the same count call for every lead.

## Post-run normalized schema

The QA artifact should contain at least:

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
pass1_count
pass1_is_result_complete
pass1_captcha_required
pass1_system_status
pass2_has_active_record
pass2_result_count
pass2_is_result_complete
pass2_captcha_required
pass2_system_status
historical_delta
third_pass_triggered
third_pass_type
third_pass_result
qa_outcome
qa_reason
new_tier
tier_changed
```

## Guardrails

- Join/reconcile by Meta Page ID, not company name.
- Never guess a missing Page ID or count.
- Preserve raw Apify exports unchanged.
- Do not regenerate emails during the canary.
- Do not write refreshed counts or tiers back to the production Google Sheet until the normalized QA results have been reviewed.
- Do not merge this temporary branch into production logic until the canary is accepted.
