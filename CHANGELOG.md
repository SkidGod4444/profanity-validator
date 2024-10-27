# Changelog

## [v1.3.1]

### Fixed
- **ProfanityResolver**: Updated the `errors` object structure in `ProfanityResolver` to align with expected test output.
  - Previously, the error messages included an unnecessary nested object structure with both `isValid` and `message` properties.
  - Now, only the `message` string is returned in `errors` when profanity is detected, following the format `{ type: "profanity", message: "Content flagged for: badword" }`.

### Changed
- **Validation Logic**: The `ProfanityResolver` was modified to:
  - Store only the `message` string for profane fields, improving compatibility with expected test cases.
  - Populate `errors` directly with the `message` string and `type`, instead of the full result object with `isValid` status.
  - Ensure `validFields` and `errors` correctly separate valid and invalid fields based on profanity checks.

### Testing
- **Updated Tests**: Adjusted test cases to validate the refined `errors` object structure, ensuring that the resolved errors output matches expectations.
  
---

**Note:** This change does not impact the overall functionality of `ProfanityResolver` but improves consistency in output format for better test compatibility.
