# Email generated — Pass 1 Facebook Page handoff

Status: prepared for Pass 1 only  
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

## Apify machine input

Use this raw URL in `requestsFromUrl`:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/pass1-facebook-page-input-1027.txt`

The raw file contains exactly 1,027 newline-separated HTTPS Facebook URLs and no GitHub HTML.

## Files

- `pass1-facebook-page-input-1027.txt` — exact Pass 1 machine input in Sheet order.
- `pass1-manifest-1060.csv` — all 1,060 leads, Sheet-row mapping, normalized input, eligibility, and exception reason.
- `pass1-exceptions-33.csv` — the 33 rows that cannot be sent as Page inputs without identity recovery.

SHA-256:

- Input: `c6e0d3705d4abf8f5832ce8e740129e9e5aa951407066a30b6726e6936a048ab`
- Manifest: `e70f9281894e5501ac5bc246d57fb207774e76dd55a8b8e84c459b2889e45a5a`
- Exceptions: `ccfa3c5696a4bb911ebfc536156ecaec97a1cefd80873e4c8831b8f263764e0d`

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
