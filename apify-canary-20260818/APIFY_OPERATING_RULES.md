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

## Count-mode `isResultComplete` semantics

The corrected 150-lead Pass 1 showed an important distinction between **count completeness** and **returned-ad-list completeness**.

In count mode, Apify can expose a usable `totalCount` while returning only a subset of the actual ad objects. In the 150-lead run, every row with `isResultComplete = false` had a positive `totalCount` larger than the number of returned ad records; the returned records still matched the intended Page ID, were active, had internally consistent `totalCount` values, and had no CAPTCHA or reported Meta system issue.

Therefore:

- `isResultComplete = false` in **count mode** must **not** automatically invalidate `totalCount`.
- Treat it as evidence that the **ad-object list was truncated/incomplete**, not necessarily that the count itself failed.
- A count-mode row can remain usable when Page ID matches, `totalCount` is present, CAPTCHA is false, Meta reports no system issue, and any returned records are internally consistent with the same Page ID/count.
- Continue to treat missing Page identity, CAPTCHA/system errors, missing count, contradictory Page IDs/counts, or other structural failures as anomalies.
- Evidence mode has a different purpose and should still be evaluated on whether it can return the expected one active-ad proof record.

The 150-lead canary specifically produced 65 `isResultComplete = false` rows, all corresponding to truncated positive result lists rather than random technical failures. This rule prevents those rows from being incorrectly escalated en masse.

## Locked pass architecture

The finalized 150-lead canary established a hard maximum of **three Apify runs**:

```text
Run 1: active-ad count
+
Run 2: one-ad evidence
→ accept clean positives
→ Run 3 only for zeros / contradictions / structural failures
→ still unresolved after Run 3: CODEX_REVIEW_REQUIRED
```

### Decision rules

- `count > 0` + active-ad evidence found → **accept**.
- `count = 0` + no evidence → **Run 3 count confirmation**.
- `count = 0` + evidence found → **Run 3 count confirmation**.
- `count > 0` + no evidence → **Run 3**.
- CAPTCHA, Meta system issue, missing/contradictory Page ID, missing count, or comparable structural failure → **Run 3 or review as applicable**.
- Still contradictory after Run 3 → **`CODEX_REVIEW_REQUIRED`**.
- **Never perform a fourth Apify run.**

### Historical counts

Historical count movement is **telemetry only**. It may be logged for QA and used to detect broader systemic patterns, but a large historical count change by itself does **not** trigger another scrape.

Small count drift is acceptable. The workflow is designed to catch false zeros, unsupported positives, identity failures, and materially broken results without turning normal advertiser activity into retry volume.

## Final 150-lead validation result

The first large canary closed with:

- 150 unique Page IDs tested
- 149 automatically resolved (`99.3%`)
- 1 escalated to `CODEX_REVIEW_REQUIRED` (`0.7%`)
- Fortress demonstrated a false Run-1 zero that the evidence pass caught and Run 3 corrected to 2 active ads.
- Peppers Polarized Eyeware was confirmed as a true zero on Run 3.
- Underoutfit remained contradictory after Run 3 and was escalated rather than scraped a fourth time.

This is the baseline operating model for subsequent enrichment batches unless a later canary provides stronger evidence for a change.
