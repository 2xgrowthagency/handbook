# Email generated — Pass 1 and Pass 2 Facebook Page handoff

Status: Pass 1 captured; Pass 2 prepared  
Source workbook: `2x Growth Agency (2x) // Shopify Cold Outreach - July 2026`  
Source tab: `Email generated` (gid `487999415`)  
Observed: `2026-08-20T09:45:01.376Z`  
Source CSV SHA-256: `ff1c4474f1a0fab270215994da9ac7f2ad117e1ea90364cf4dcebb18ff5a0f07`

## Scope and counts

- 1,061 Sheet rows total: one header plus 1,060 leads.
- 1,027 leads have page-like Facebook inputs eligible for Pass 1.
- 33 leads are held out as explicit exceptions: 30 bare `profile.php` URLs without an ID, one Facebook Group, and two Facebook search routes that are not Pages.
- 15 repeated normalized URLs are deliberately retained. This handoff preserves one Pass 1 input per eligible Sheet row; it does not collapse leads before resolved Page identity is known.
- Source Facebook values are unverified inputs. They are not yet accepted as official Pages.

For Apify Pass 2, the 1,027 eligible lead occurrences collapse to 1,012 unique normalized input URLs. The 15 extra occurrences belong to 13 duplicate-URL groups. `pass2-manifest-1012.csv` preserves every affected Sheet row and company so a result is never silently reused across different leads without identity QA.

## Apify machine input

Use this raw URL in `requestsFromUrl`:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/facebook-pages-pass1-1027.txt`

The raw file contains exactly 1,027 newline-separated HTTPS Facebook URLs and no GitHub HTML. Its raw GitHub serialization matches the proven `facebook-pages-vetted-20.txt` handoff: UTF-8 without a byte-order marker, LF-delimited, one URL per line, and a final LF newline.

## Files

- `facebook-pages-pass1-1027.txt` — exact Pass 1 machine input in Sheet order and the proven Facebook Pages canary file format.
- `pass1-manifest-1060.csv` — all 1,060 leads, Sheet-row mapping, normalized input, eligibility, and exception reason.
- `pass1-exceptions-33.csv` — the 33 rows that cannot be sent as Page inputs without identity recovery.
- `facebook-pages-pass1-continuation-209.txt` — exact continuation set that completed the aborted first count pass.
- `facebook-pages-pass2-shuffled-1012.txt` — the complete unique Pass 2 input set in deterministic shuffled order.
- `pass2-manifest-1012.csv` — Pass 2 order, shuffle proof, all source-row mappings, and the reconciled Pass 1 state for every unique input.

SHA-256:

- Input: `c6e0d3705d4abf8f5832ce8e740129e9e5aa951407066a30b6726e6936a048ab`
- Manifest: `e70f9281894e5501ac5bc246d57fb207774e76dd55a8b8e84c459b2889e45a5a`
- Exceptions: `ccfa3c5696a4bb911ebfc536156ecaec97a1cefd80873e4c8831b8f263764e0d`
- Pass 1 continuation: `723c253f6d5b055c4ab481ef3e2b17f067dfa8f0372c208cfd6957d5639e3a0e`
- Pass 2 input: `136521675010d783e153a74e1882afc1fee03e66fe9bd0f8c76994f606c5f192`
- Pass 2 manifest: `6a62ace366bb99b510856c4a165b8ef94fd9b94fd7d7c3b6b6c81cafb1107c12`

## Count-mode actor settings

Actor: `apify/facebook-ads-scraper`

- `requestsFromUrl`: the applicable direct raw Pass 1 or Pass 2 URL
- Active status / `activeStatus`: `ACTIVE`
- Total Count / `onlyTotal`: ON / `true`
- Results Limit / `resultsLimit`: `1`
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Date, sorting, and ecommerce options: defaults

Expected output is one count summary per resolved Facebook Page. Preserve the completed run ID, exact saved input, dataset, resolved Page ID, page-scoped Meta URL, `totalCount`, completion state, captcha state, and Meta system status.

The first 803-item physical Pass 1 run saved `resultsLimit` unset; its 209-item continuation saved `resultsLimit=1`. All new count runs must use `resultsLimit=1` as the universal guardrail. Count mode has previously returned nested arrays of up to roughly 30 records even when this limit is set, so do not treat it as a reliable nested-payload cap. It remains required because it avoids an unnecessary unbounded setting and protects evidence-mode runs if `onlyTotal` is ever switched off.

## Pass 1 reconciliation

Pass 1 was completed as one split logical pass after the first physical Actor run reached its $4 maximum-charge ceiling:

- First export: 803 unique inputs.
- Continuation export: the remaining 209 unique inputs.
- Merged coverage: 1,012 of 1,012 unique inputs, with no overlap or omissions.
- Normal count records: 917.
- `no_items` errors: 95. These are unresolved technical/Page-resolution outcomes, never zeros.
- Positive counts: 403, including four positive-count-empty anomalies.
- Returned zeros: 514. These remain untrusted until the adopted Pass 2 and exception gates are applied.

The continuation saved the intended `onlyTotal=true`, `resultsLimit=1`, active-only settings. Its 91 request failures were recorded by the Actor as Facebook blocking/page-unavailable responses plus one internal Actor error, not as a handoff-list or saved-setting mismatch.

## Pass 2 machine input

Use this direct raw URL in `requestsFromUrl`:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/facebook-pages-pass2-shuffled-1012.txt`

The file contains exactly 1,012 unique HTTPS Facebook inputs. It is UTF-8 without a byte-order marker, LF-delimited, one URL per line, with a final LF newline. Its set is exactly equal to the unique normalized Pass 1 set.

The shuffle is deterministic and reproducible:

- Seed: `email-generated-pass2-20260820-v1`
- Sort key: SHA-256 of `seed + NUL + normalized_input_url`
- Same-position count versus first-seen unique Pass 1 order: 1 of 1,012
- Pass 1 error distribution across Pass 2 quarters: 26 / 25 / 23 / 21

## Pass 2 actor settings

Actor: `apify/facebook-ads-scraper`

- `requestsFromUrl`: Pass 2 raw URL above
- Active status / `activeStatus`: `ACTIVE`
- Total Count / `onlyTotal`: ON / `true`
- Results Limit / `resultsLimit`: `1`
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Date, sorting, and ecommerce options: defaults
- Maximum charge: `$6` recommended. At the current `$0.005` charged-item rate, 1,012 unique inputs are expected to cost about `$5.06`; a `$4` ceiling will stop near 800 items again.

Before starting, reopen the saved input and verify both `onlyTotal: true` and `resultsLimit: 1` are present. Preserve the raw export unchanged after completion.

## Stop gate after Pass 2

Do not tier, write to the production Sheet, or treat source URLs as verified before Pass 2 reconciliation and the conditional evidence gate are complete.

Reconcile every Pass 2 result by normalized input and resolved Page ID using `pass2-manifest-1012.csv`. Accept only technically clean positive/positive pairs that remain in the same operational tier. Send zero/positive, zero/zero, tier conflicts, either-pass errors, positive-count-empty records, missing or contradictory Page IDs, CAPTCHA, system issues, and malformed counts to the single conditional evidence pass.

Run 3 is exceptions only with `onlyTotal=false` and `resultsLimit=1`. Never perform a fourth Apify execution for the same lead path. Anything still unresolved becomes `CODEX_REVIEW_REQUIRED`. The original 33 non-Page input exceptions remain outside Apify until official Page identity recovery.
