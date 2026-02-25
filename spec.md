# Specification

## Summary
**Goal:** Build a multi-screen mobile UI for a GPS destination reminder app called "MY REMINDER" with a dark cinematic design and golden accent styling — no real GPS or backend required.

**Planned changes:**
- Create a Home Screen with the app logo, bold "MY REMINDER" title, tagline, and a golden "Set Destination" button on a dark (#0A0A0A) background
- Create a Destination Input Screen with a search bar (location pin icon), a static map preview placeholder card with a golden marker, and a "Set Alert" button
- Create an Alert Settings Screen with selectable time chips (1 min, 2 min, 5 min), a sound toggle switch, and a "Save Reminder" primary button
- Implement multi-screen navigation (Home → Destination Input → Alert Settings → Home) with a top navigation bar showing back arrow and screen title on non-home screens
- On "Save Reminder", show a confirmation toast/snackbar and return to Home Screen
- Manage all state (selected time, sound toggle) locally in React state
- Apply consistent dark cinematic design system: #0A0A0A–#111111 backgrounds, #F5C518 golden accents, rounded corners (≥16px), modern sans-serif typography, outline-style icons
- Render the entire app inside a mobile-frame wrapper (~390px wide, centered on desktop) with a subtle outer shadow

**User-visible outcome:** Users can navigate through three screens of a polished mobile reminder app UI — setting a destination, configuring alert timing and sound, and saving the reminder — all within a dark cinematic mobile-frame experience in the browser.
