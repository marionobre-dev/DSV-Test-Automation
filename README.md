# Test Automation - Skills Assessment Deliverable

**Author:** Mário Nobre

## Purpose & Scope
- This repository is the assessment deliverable. It demonstrates test automation skills through a compact, reviewable sample.
- Included: example end-to-end UI tests for a booking flow and API smoke tests.
- Goal: show design decisions, maintainable Page Object Models, stable tests, and clear reporting.

## What to Review (high level)
- Tests: `tests/booking.spec.ts`, `tests/cat.api.spec.ts`
- Page objects: `pages/bookingflightsearch.ts`
- Config: `playwright.config.ts` (browser/timeouts/reporting)
- Test data: files under `data/`

## Architecture & Approach
- Runner: Playwright for cross-browser E2E and API testing.
- Pattern: Page Object Model (POM) for UI interactions; small, focused specs for readability.
- Data: externalized under `data/` to keep tests deterministic and parameterizable.
- Reporting: HTML reports in `playwright-report/` and artifacts in `test-results/`.

## Setup (Deliverable Environment)
Prerequisites:
- Node.js 18+ installed

Install and prepare:

```powershell
npm install
npx playwright install
```

## Run (quick commands)

- Run full test suite:

```powershell
npx playwright test
```

- Run a specific spec:

```powershell
npx playwright test tests/booking.spec.ts
```

- Generate and open report:

```powershell
npx playwright test --reporter=html
npx playwright show-report
```

## Acceptance Criteria
- Tests run locally with `npm install` and `npx playwright install`.
- Tests are readable and maintainable: POM usage, descriptive test names, and clear assertions.
- Reports are generated and accessible (`playwright-report/`).
- Minimal flakiness: use of waits/fixtures where appropriate.

## Known Limitations
- This is a focused assessment sample, not a full enterprise test-suite.

## Notes for the Reviewer
- Start by running `npx playwright test` and then open the HTML report.
- For code review, inspect `pages/` for encapsulation and `tests/` for clarity and assertions.

## AI Usage
- AI was used for generating the readme files.
- AI was also used for reviewing traces and understanding why the UI test fails to fetch airports.
