# Implementation Plan - Glossary Feature

The goal is to implement the Glossary (Glosarium) feature in the student dashboard so students can view term definitions and submit their learning feedback.

## User Review Required
> [!IMPORTANT]
> The feedback form requires students to input 5 new terms they learned. The facilitator will then rate this submission.

## Proposed Changes

### Dashboard HTML
#### [MODIFY] [dashboard-kegiatan.html](file:///d:/Aplikasi%20Web%20AI/LP%20Kokulikuler%20SMAN%201%20Belitang/dashboard-kegiatan.html)
- Add a new Modal for Glossary (`#modalGlosarium`).
- Populate the modal content with HTML converted from `Glosarium_Draft.md`.
- Add a "Feedback Section" at the bottom of the modal:
  - Textarea for student input: "Sebutkan 5 Glosarium baru yang kamu ketahui beserta aslinya".
  - Submit button.
  - Status display container (to show "Waiting for review" or "Rating stars").

### Dashboard Logic
#### [MODIFY] [dashboard-kegiatan.html](file:///d:/Aplikasi%20Web%20AI/LP%20Kokulikuler%20SMAN%201%20Belitang/dashboard-kegiatan.html)
- Add `openGlosariumModal()` function.
- Add `submitGlosarium()` function to handle Supabase submission to `module_responses` table (type: `glosarium`).
- Add logic to check existing submission status (`checkExistingGlosarium`):
  - If submitted but not graded: Show "Menunggu Penilaian Fasilitator".
  - If graded: Show the star rating given by the facilitator.

## Verification Plan
### Manual Verification
- **Open Dashboard**: Click the "Glosarium" menu item.
- **Check Content**: Verify all terms from `Glosarium_Draft.md` are present.
- **Submit Feedback**: Fill in the form and submit.
- **Check Status**: Verify the UI changes to "Menunggu Penilaian".
- **Database**: Verify the record exists in `module_responses` with `module_type = 'glosarium'`.
