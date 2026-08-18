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
