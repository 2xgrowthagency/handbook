# Email generated — Facebook source handoff

Status date: 2026-08-20

This package was built from every data row on the `Email generated` tab of the
2x Growth Agency Shopify Cold Outreach workbook.

## Apify input

Use the raw machine-input URL:

```text
https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/facebook-pages-source-unique.txt
```

The file contains one distinct Facebook source URL per line for
`apify/facebook-ads-scraper` through `startUrls[].requestsFromUrl`.

## Export accounting

- Sheet data rows: 2,486
- Rows with blank Facebook URL: 1,388
- Rows with an eligible Facebook Page-like source URL: 1,058
- Distinct normalized source URLs exported: 1,048
- Rows excluded as unusable Actor inputs: 40
  - 39 bare `profile.php` URLs with no Page ID
  - 1 Facebook Group URL
- Output SHA-256: `bd9952960fd44d9c385af60f832a541402c465b6eab0e8eafc9a2a8d009c0a90`

## Safety boundary

These are source URLs from the Sheet, not vetted Facebook identities. Apify may
resolve a source URL to a Meta Page ID and return an ad count, but those results
must not be treated as production truth until the resolved Page is matched back
to the correct company and passes the normal Facebook/Page-ID QA gate.

Do not write raw Actor results directly to the production Sheet, do not tier a
lead from an unresolved Page identity, and do not treat missing or failed Actor
results as zero.
