# Email generated — unresolved Apify retry handoff

This handoff contains only the 100 unique Facebook URLs still unresolved after the completed count and one-ad evidence passes. They map to 103 leads. The other 33 unresolved leads have non-Page Facebook inputs and are deliberately excluded until their official Page identities are recovered.

## Count retry — 95 URLs / 98 leads

Raw input:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/facebook-pages-unresolved-count-retry-95.txt`

Settings:

- Actor: `apify/facebook-ads-scraper`
- Active status: `ACTIVE`
- Total Count / `onlyTotal`: ON / `true`
- Results Limit / `resultsLimit`: `1`
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Maximum charge: `$1`

## Evidence retry — 5 URLs / 5 leads

Raw input:

`https://raw.githubusercontent.com/2xgrowthagency/handbook/agent/apify-canary-20260817/apify-canary-20260820/email-generated-all/facebook-pages-unresolved-evidence-retry-5.txt`

Settings:

- Actor: `apify/facebook-ads-scraper`
- Active status: `ACTIVE`
- Total Count / `onlyTotal`: OFF / `false`
- Results Limit / `resultsLimit`: `1`
- About-page info / `includeAboutPage`: OFF / `false`
- Extra ad details / `isDetailsPerAd`: OFF / `false`
- Maximum charge: `$1`

Do not combine these files into one Actor run: they require different saved settings. Preserve both raw JSON exports for reconciliation.
