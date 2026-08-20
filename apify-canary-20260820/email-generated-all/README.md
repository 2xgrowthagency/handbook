# Email generated — Pass 1 count and Pass 2 one-ad evidence handoff

Status: Pass 1 and Pass 2 captured; conditional Pass 3 prepared  
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
- `facebook-pages-pass2-continuation-211.txt` — exact Pass 2 remainder after subtracting the 801 unique inputs captured by aborted run `PBfJg0HeMZaxyygZy`; retained in original Pass 2 manifest order.
- `pass2-manifest-1012.csv` — Pass 2 order, shuffle proof, all source-row mappings, and the reconciled Pass 1 state for every unique input.
- `pass2-merged-reconciliation-summary.json` — machine-readable coverage, transition, and Pass 3 decision totals for the two merged Pass 2 exports.
- `facebook-pages-pass3-count-609.txt` — final count-mode group: 514 zero confirmations plus 95 inputs that errored in both earlier modes.
- `facebook-pages-pass3-evidence-5.txt` — final evidence-mode group: four unsupported positives plus one positive active record with missing system-status metadata.
- `pass3-manifest-614.csv` — auditable mapping from every Pass 3 input to its Sheet rows, company, Pass 1 and Pass 2 observations, retry mode, and exact trigger.

SHA-256:

- Input: `c6e0d3705d4abf8f5832ce8e740129e9e5aa951407066a30b6726e6936a048ab`
- Manifest: `e70f9281894e5501ac5bc246d57fb207774e76dd55a8b8e84c459b2889e45a5a`
- Exceptions: `ccfa3c5696a4bb911ebfc536156ecaec97a1cefd80873e4c8831b8f263764e0d`
- Pass 1 continuation: `723c253f6d5b055c4ab481ef3e2b17f067dfa8f0372c208cfd6957d5639e3a0e`
- Pass 2 input: `136521675010d783e153a74e1882afc1fee03e66fe9bd0f8c76994f606c5f192`
- Pass 2 continuation input: `9cdecfb50e049f868c63768a08bc8393f725f535b5849b5388973fa1ac82d1fe`
- Pass 2 manifest: `6a62ace366bb99b510856c4a165b8ef94fd9b94fd7d7c3b6b6c81cafb1107c12`
- Pass 2 merged summary: `10466837f5ffa3d7a7b7fd80bd65a4d208474de8c46cdb02443b58f6f5cf49bb`
- Pass 3 count input: `a80bb2fc41f1c13e0a404eded5e6df9eb17ea2bf9e6c4376c645b08077933e1a`
- Pass 3 evidence input: `a3773abfb6b2758ea5dfc42297a9ab946df64a86b1ea261709f8487306cd56a4`
- Pass 3 manifest: `b1891316839003a55ed601ee1497cc36c45ca83dd85c504b5400c331e7d57ecc`

## Pass 1 count-mode actor settings

Actor: `apify/facebook-ads-scraper`

- `requestsFromUrl`: the direct raw Pass 1 URL above
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
- Returned zeros: 514. These remain untrusted until Pass 2 evidence and the conditional Pass 3 gate are applied.

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
- Total Count / `onlyTotal`: **OFF / `false`**
- Results Limit / `resultsLimit`: `1`
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Date, sorting, and ecommerce options: defaults
- Maximum charge: `$6` recommended. At the current `$0.005` charged-item rate, 1,012 unique inputs are expected to cost about `$5.06`; a `$4` ceiling will stop near 800 items again.

Purpose: independently test whether each input can produce at least one real active-ad record. This is the same Pass 2 mode proven by the earlier 150-lead and 101-lead evidence runs.

Before starting, reopen the saved input and verify both `onlyTotal: false` and `resultsLimit: 1` are present. The saved `activeStatus` may appear as lowercase `active`; that is the Actor's stored form of the ACTIVE UI selection. Preserve the raw JSON unchanged as the **Pass 2 evidence export**.

`resultsLimit=1` is mandatory even though prior Actor builds sometimes returned more than one nested ad record. Extra nested records are an Actor efficiency behavior, not permission to leave the limit blank and not proof that the saved settings are wrong.

## Pass 2 continuation after the aborted run

Run `PBfJg0HeMZaxyygZy` used the correct Pass 2 raw input and saved settings, but it ended with status `ABORTED` at `$4.00` usage after writing 801 unique dataset items. Its exported JSON has SHA-256 `feec619c736bc87559e9be19ce340a99f50b3d6ac583c1fecd50d767754565fd` and exactly matches the live 801-item dataset read through the Apify MCP.

The missing inputs are scattered across the shuffled request queue; they are not the last 211 manifest positions. `facebook-pages-pass2-continuation-211.txt` is the exact set difference between the complete 1,012-input file and those 801 observed inputs. The continuation has no overlap with the completed set, and their union equals all 1,012 inputs.

Use this direct raw URL in `requestsFromUrl`:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/facebook-pages-pass2-continuation-211.txt`

Use the same Pass 2 evidence settings:

- Active status / `activeStatus`: `ACTIVE`
- Total Count / `onlyTotal`: **OFF / `false`**
- Results Limit / `resultsLimit`: `1`
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Date, sorting, and ecommerce options: defaults
- Maximum charge: `$2` recommended. At the observed `$0.005` per processed input, 211 inputs are expected to cost about `$1.06`.

This is still Pass 2 coverage, not Pass 3. Reconcile the continuation export with the 801-item partial export before generating any conditional Pass 3 handoff.

## Completed Pass 2 reconciliation

Continuation run `GrvJqgy4sYmxak7EG` succeeded with the exact 211-input continuation, the correct evidence settings, and `$1.055` usage. Its raw export has SHA-256 `4fee852d68eda1f9beb29e080e3864057bdd2d8107d42419ccd96fb614c3350e`.

Merged Pass 2 coverage is exactly 1,012 of 1,012 unique inputs, with no overlap or omissions:

- 399 inputs produced an actual active-ad record.
- 515 produced a complete zero/empty summary.
- Three repeated the positive-count/empty-evidence anomaly.
- 95 returned `no_items` again after also failing Pass 1.
- Zero Page-ID mismatches.
- Zero CAPTCHA results.
- One positive active record had missing system-status metadata.

Actor-level QA accepts 398 technically clean positives. This does not verify that the source Facebook URL belongs to the intended company; official Page ownership remains a separate downstream gate. The remaining 614 inputs receive one final conditional Pass 3 execution per input, split across the two mode-specific Actor runs below.

## Pass 3A — count mode — 609 inputs

Use this direct raw URL in `requestsFromUrl`:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/facebook-pages-pass3-count-609.txt`

This group contains 514 zero confirmations and 95 inputs that returned errors in both Pass 1 count mode and Pass 2 evidence mode.

Use:

- Active status / `activeStatus`: `ACTIVE`
- Total Count / `onlyTotal`: **ON / `true`**
- Results Limit / `resultsLimit`: `1`
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Date, sorting, and ecommerce options: defaults
- Maximum charge: `$4` recommended. At the observed `$0.005` per processed input, 609 inputs are expected to cost about `$3.05`.

For a zero-confirmation input, a clean matching zero resolves the actor-level T0 check. For an input that errored in both prior modes, a third clean zero is only its first valid zero observation and therefore remains `CODEX_REVIEW_REQUIRED`; a supported positive may be accepted only when the final output also supplies the necessary matching active evidence. Do not run either group a fourth time.

## Pass 3B — evidence mode — 5 inputs

Use this direct raw URL in `requestsFromUrl`:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/facebook-pages-pass3-evidence-5.txt`

This group contains three repeated positive-count/empty-evidence anomalies, one positive count followed by a zero/empty evidence result, and one positive active record whose evidence output omitted system-status metadata.

Use:

- Active status / `activeStatus`: `ACTIVE`
- Total Count / `onlyTotal`: **OFF / `false`**
- Results Limit / `resultsLimit`: `1`
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Date, sorting, and ecommerce options: defaults
- Maximum charge: `$1` recommended. Expected usage is about `$0.03`.

A clean matching active-ad record resolves the actor-level positive check. No active record, another technical failure, or a Page-ID contradiction becomes `CODEX_REVIEW_REQUIRED`. Never run a fourth Apify execution for the same input.

## Reconciliation matrix and final stop gate

Do not tier, write to the production Sheet, or treat source URLs as verified before both Pass 3 groups are reconciled and every unresolved result is routed to `CODEX_REVIEW_REQUIRED`.

Reconcile every Pass 2 result by normalized input and resolved Page ID using `pass2-manifest-1012.csv`. The Pass 2 input is the complete 1,012-URL set, not an exception-only subset.

Apply this decision matrix:

| Pass 1 count | Pass 2 evidence | Action |
|---|---|---|
| `>0` | matching active-ad record | Accept the positive when Page ID and technical fields are clean |
| `0` | no active-ad record | Conditional Pass 3 count-mode zero confirmation |
| `>0` | no active-ad record | Axell-style anomaly; conditional Pass 3 evidence retry |
| `0` | matching active-ad record | Contradiction; targeted Pass 3 retry/review |
| missing/error/malformed | matching active-ad record | Activity is supported, but use Pass 3 count mode if a count is still needed for tiering |
| any | wrong/missing Page ID, CAPTCHA, system issue, or incomplete technical result | Targeted Pass 3 retry/review in the failed mode |

Run 3 is exceptions only and must use the mode required by the unresolved condition. Never perform a fourth Apify execution for the same lead path. Anything still unresolved becomes `CODEX_REVIEW_REQUIRED`. The original 33 non-Page input exceptions remain outside Apify until official Page identity recovery.
