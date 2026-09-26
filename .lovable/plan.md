# Ambassador FC logo and FIFA player cards

## What will change
- Rename the bundled club crest to `public/ambassador_logo.jpeg` and use that public URL for the sidebar badge, dashboard crest, and transparent page watermark.
- Remove the Lovable-only image import so the crest works on Vercel and other devices.
- Extend every player with six 1–99 ratings (`PAC`, `SHO`, `PAS`, `DRI`, `DEF`, `PHY`), an overall rating, and form (`Poor`, `Okay`, `Good`, or `Excellent`).
- Give all 16 demo players realistic ratings shaped by position and ability.
- Upgrade older saved squads automatically: existing names, attendance, and settings remain intact while missing FIFA fields receive sensible position-based defaults.
- Show OVR on squad cards and rows. Selecting a player card or player name opens a bold football-card dialog with the crest, identity, position, form, overall, and all six attributes.

## Technical details
- Keep everything front-end only and persist through the existing browser storage store.
- Add shared rating/default helpers beside the player types, use them for newly added players and legacy-data normalization, and keep edits/deletes/contact buttons independent from opening the profile.
- Use the existing dialog and button components, semantic color tokens, and current desktop/mobile layouts.
- Verify the image URL, saved-data migration, player dialog interaction, mobile layout, TypeScript checks, and preview diagnostics.
