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

## Current pass architecture

Baseline production direction:

```text
Pass 1: active-ad count
+
Pass 2: one-ad evidence
→ accept clean positives
→ Pass 3 only for zeros, anomalies, technical failures, or materially suspicious historical changes
```

Do not add a universal third pass merely to force exact count agreement. Small count drift is acceptable; gross errors and absence/presence contradictions are the primary QA concern.
