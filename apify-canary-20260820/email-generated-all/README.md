# Email generated — Pass 1 Facebook Page handoff

Status: prepared for Pass 1 only  
Source workbook: `2x Growth Agency (2x) // Shopify Cold Outreach - July 2026`  
Source tab: `Email generated` (gid `487999415`)  
Observed: `2026-08-20T09:45:01.376Z`  
Source CSV SHA-256: `ff1c4474f1a0fab270215994da9ac7f2ad117e1ea90364cf4dcebb18ff5a0f07`

## Scope and counts

- 1,061 Sheet rows total: one header plus 1,060 leads.
- 1,029 leads have page-like Facebook inputs eligible for Pass 1.
- 31 leads are held out as explicit exceptions: 30 bare `profile.php` URLs without an ID and one Facebook Group.
- 16 repeated normalized URLs are deliberately retained. This handoff preserves one Pass 1 input per eligible Sheet row; it does not collapse leads before resolved Page identity is known.
- Source Facebook values are unverified inputs. They are not yet accepted as official Pages.

## Apify machine input

Use this raw URL in `requestsFromUrl`:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/pass1-facebook-page-input-1029.txt`

The raw file contains exactly 1,029 newline-separated HTTPS Facebook URLs and no GitHub HTML.

## Files

- `pass1-facebook-page-input-1029.txt` — exact Pass 1 machine input in Sheet order.
- `pass1-manifest-1060.csv` — all 1,060 leads, Sheet-row mapping, normalized input, eligibility, and exception reason.
- `pass1-exceptions-31.csv` — the 31 rows that cannot be sent as Page inputs without identity recovery.

SHA-256:

- Input: `82743f1b7f3430d1b50410c7f681e033defafb1d6a17130a2e9cf0b9a01e1da2`
- Manifest: `7d164d74b851fc217cd11e7b7529ebcf29d1aeab2987e77161a9c187da23755f`
- Exceptions: `1f52710bccbd760df0e3d93e7cb3a2ebd112a8a48eb3be03ffdef63fd0195a82`

## Pass 1 actor settings

Actor: `apify/facebook-ads-scraper`

- `requestsFromUrl`: raw URL above
- Active status / `activeStatus`: `ACTIVE`
- Total Count / `onlyTotal`: ON / `true`
- Results Limit / `resultsLimit`: blank or unset
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Date, sorting, and ecommerce options: defaults

Expected output is one count summary per resolved Facebook Page. Preserve the completed run ID, exact saved input, dataset, resolved Page ID, page-scoped Meta URL, `totalCount`, completion state, captcha state, and Meta system status.

## Stop gate after Pass 1

Do not tier, write to the production Sheet, or treat source URLs as verified from Pass 1 alone.

Reconcile every result to `pass1_index` and Sheet row, inspect missing/duplicate/contradictory Page IDs and structural errors, then prepare Pass 2 with the same eligible lead set in shuffled order. Exceptions remain outside Apify until their official Page identity is recovered.
