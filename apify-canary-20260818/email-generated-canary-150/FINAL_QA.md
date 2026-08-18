# Email Generated — 150-Lead Canary Final QA

**Status:** CLOSED  
**Date:** 2026-08-18  
**Source:** `Email generated` tab  
**Tested:** 150 unique Meta Page IDs  
**Production sheet writes:** NONE

## Final outcome

- **149 / 150 auto-resolved (99.3%)**
- **1 / 150 escalated to `CODEX_REVIEW_REQUIRED` (0.7%)**
- No fourth Apify run is permitted.

## Three-run architecture validated

1. **Run 1 — Count**
2. **Run 2 — One-ad evidence**
3. **Run 3 — only zeros / contradictions**
4. If still unresolved after Run 3: escalate to Codex/manual resolution.

Historical count movement is QA telemetry only and does not by itself trigger a retry.

## Final exception cases

### Peppers Polarized Eyeware — accepted zero

- Page ID: `119412367116`
- Run 1: `0`
- Run 2: no active-ad evidence
- Run 3: `0`
- Final: **T0 / accepted zero**

### Fortress — false zero caught and corrected

- Page ID: `155003627391`
- Run 1: `0`
- Run 2: real active ad returned
- Run 3: `2` active ads returned
- Final: **2 / T1**
- This is direct evidence that the one-ad evidence pass catches false zeros that a count-only workflow can miss.

### Underoutfit — Codex review required

- Page ID: `107256577625672`
- Historical count: `1100`
- Run 1: positive count around `1003`, page identity null, no returned ad evidence
- Run 2: no active-ad evidence
- Run 3: `1002`, page identity still null, no returned ad evidence
- Final: **do not auto-tier from Apify; `CODEX_REVIEW_REQUIRED`**

## Locked production decision rules

- `count > 0` + evidence found → accept.
- `count = 0` + no evidence → Run 3 count confirmation.
- `count = 0` + evidence found → Run 3 count confirmation.
- `count > 0` + no evidence → Run 3.
- CAPTCHA / Meta system issue / missing or contradictory Page ID → Run 3 or review as applicable.
- Still contradictory after Run 3 → `CODEX_REVIEW_REQUIRED`.
- **Maximum three Apify runs.**
- **No historical-delta-only retries.**
- **No fourth Apify run.**

## Operational lesson

The bulk path should optimize for scale. Rare unresolved leads are handed to the Codex enrichment skill for independent identity / Meta Ad Library resolution rather than repeatedly scraping the same anomaly.
