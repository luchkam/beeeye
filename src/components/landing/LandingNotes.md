# Landing Components Notes

This folder is reserved for reusable building blocks of company-specific landing pages.

Current status:
- No company landing is implemented yet.
- Main page `/` remains the default rendering path.

Recommended future workflow:
1. Add a landing component under `src/landings/<slug>/`.
2. Register it in `src/landings/registry.js`.
3. Open it by URL: `/<slug>` (for example `/zygoma-center`).

Important:
- Keep shared UI logic reusable.
- Do not break the current homepage flow.
