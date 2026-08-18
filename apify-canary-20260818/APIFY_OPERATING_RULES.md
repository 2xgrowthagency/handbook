# Apify Enrichment — Operating Rules

These rules capture durable workflow lessons discovered during the Apify enrichment canaries.

## Hosted input URLs

When Apify imports a remote newline-separated list through `requestsFromUrl` or an equivalent hosted-list field, the URL must resolve directly to the raw text file.

### Use

```text
https://raw.githubusercontent.com/<owner>/<repo>/<ref>/<path>.txt
```

### Do not use

```text
https://github.com/<owner>/<repo>/blob/<ref>/<path>.txt
```

The normal GitHub `blob` URL is an HTML application page. If it is supplied as the remote list, Apify may crawl GitHub itself and discover JavaScript, CSS, navigation links, avatars, documentation URLs, and other unrelated assets instead of importing the intended lead URLs.

Operational distinction:

- **Human review:** normal `github.com/.../blob/...` link
- **Apify machine input:** `raw.githubusercontent.com/...` link

Before a large run, verify the machine-input URL displays only the intended newline-separated Facebook/Meta URLs and no GitHub HTML/navigation.

## Failure recorded on 2026-08-18

During preparation of the 150-lead `Email generated` canary, the normal GitHub blob URL for `page-scoped-input-150.txt` was supplied to Apify. The resulting dataset contained GitHub asset and navigation URLs instead of the intended 150 Meta Ad Library URLs. That run was invalid and discarded.

This was an input-hosting failure, not an Apify Meta-count failure.

## Actor mode definitions

### Count mode

Use:

- Active status: **ACTIVE**
- Total Count / `onlyTotal`: **ON**
- Results Limit: **blank / unset**
- About-page info: **OFF**
- Extra/ad details: **OFF**
- Date/sort/ecommerce: default

Purpose: return one low-cost summary item per page with `totalCount` rather than scraping individual ad records.

### Evidence mode

Use:

- Active status: **ACTIVE**
- Total Count / `onlyTotal`: **OFF**
- Results Limit: **1**
- About-page info: **OFF**
- Extra/ad details: **OFF**

Purpose: retrieve one real ad record as independent evidence that a page is actively advertising.

## Cost model

Apify billing materially affects the preferred architecture:

- Total-count summary check: approximately **$0.01 per page**.
- Each scraped ad record: approximately **$0.01 per ad**.

Therefore, bulk workflow design should prefer cheap count summaries and reserve ad-record retrieval for exceptions. Never allow a bulk QA pass to scrape many ads per page when one-ad evidence is sufficient.

## Finalized 150-lead canary architecture

The original 150-lead canary used:

```text
Run 1: count
Run 2: one-ad evidence
Run 3: conditional retry
```

This architecture successfully demonstrated the value of independent evidence:

- Fortress produced a false zero in the first count run; evidence caught the contradiction and Run 3 corrected it to 2 active ads.
- Peppers Polarized Eyeware was confirmed as a true zero.
- Underoutfit remained contradictory and was escalated rather than scraped indefinitely.

The canary closed with:

- 150 unique Page IDs tested
- 149 automatically resolved (`99.3%`)
- 1 escalated to `CODEX_REVIEW_REQUIRED` (`0.7%`)

## Batch 2 transition rule

The current 101-lead Batch 2 began under the original architecture and also consumed a misconfigured listing run. Finish that batch using its documented three-run ceiling. Do not change methodology again mid-batch.

## Post–Batch 2 production architecture — ADOPTED

Beginning with the next enrichment batch, use a cost-optimized architecture built around two cheap count samples and conditional evidence only.

```text
Run 1: Total Count ON — all leads
+
Run 2: Total Count ON — all leads, input order reshuffled
→ accept clean/stable positives
→ Run 3: one-ad evidence ONLY for exceptions
→ still unresolved after Run 3: CODEX_REVIEW_REQUIRED
```

### Why this supersedes universal evidence

Two count runs cost roughly the same baseline per lead as one count run plus one universal one-ad evidence run, but they avoid paying to scrape an ad record for every clean lead. Evidence retrieval is preserved for the small exception population where it adds the most value.

The second count is intentionally run with the lead order reshuffled to reduce order/rate-limit coupling between the two bulk executions. Repeated count agreement does not prove truth by itself, so structural anomalies and material contradictions still escalate to independent evidence.

### Run 1 and Run 2 acceptance logic

Reconcile by expected Page ID, never company name.

After two count runs:

- Both counts positive, technically clean, and in the **same operational tier** → **accept**. Small numeric drift is irrelevant.
- One count is zero and the other is positive → **Run 3 evidence**.
- Both counts are zero → **Run 3 evidence** before assigning T0.
- Counts fall into different operational tiers → **Run 3 evidence**.
- Missing Page identity, contradictory Page IDs, CAPTCHA, Meta system issue, missing/malformed count, or comparable structural anomaly in either run → **Run 3 evidence/review**.
- A positive count with suspicious structural output (for example missing/null page identity where identity should be present) → **Run 3 evidence** even if both count values agree.
- Historical old-vs-new count movement alone → **telemetry only; no retry**.

### Run 3 evidence logic

Run evidence mode only for the exception list generated above:

- Total Count OFF
- Results Limit = 1
- ACTIVE

Interpretation:

- Positive/positive count exception + matching active-ad evidence → accept the most defensible current count/tier from the two count runs, provided the structural issue is resolved.
- Zero/positive contradiction + active-ad evidence → positive; choose the clean positive count/tier when technically supported.
- Zero/zero + no active-ad evidence → accept zero/T0.
- Zero/zero + active-ad evidence → contradiction remains; `CODEX_REVIEW_REQUIRED`.
- Positive count(s) + no active-ad evidence → `CODEX_REVIEW_REQUIRED` when the contradiction cannot be resolved from clean actor output.
- Identity/system anomaly still unresolved → `CODEX_REVIEW_REQUIRED`.

### Hard ceiling

- Maximum **three Apify executions per batch/lead path**.
- **Never perform a fourth Apify run.**
- Anything still unresolved after Run 3 moves to the Codex enrichment exception resolver.

## Historical counts

Historical count movement is **telemetry only**. It may be logged for QA and used to detect broader systemic patterns, but a large historical count change by itself does **not** trigger another scrape.

Exact count precision is not the business objective. Small count drift is acceptable. The workflow is designed to catch false zeros, tier-changing disagreements, unsupported positives, identity failures, and materially broken results while keeping scrape cost sustainable.
