# Morning fields

Approved direction: a continuous landscape shared by branding and login; no vertical divider, contrasting panel or form card. Mode: Operate.

First viewport: full-bleed misty tea terraces under warm ivory morning light, calm heading in the upper-left sky, clear form in the right-side mist. Detailed landscape stays lower left. Shared background and uninterrupted spacing connect both regions.

Tokens: primary #294e3d, text #243e32, secondary #586855, surface #edf0e7. Body Microsoft YaHei/PingFang sans; display FieldSerif (local Chinese Song face). Input and button height 51px, radius 7px. Form max-width 374px (400px large desktop). Header horizontal inset 5.2vw. Mobile switches at 760px and preserves a single background.

States: keyboard focus, input error, password visibility, loading, code preview, help disclosure, password recovery notice, registration and return to login. Registration validates required fields, minimum 8 characters and matching confirmation; it never creates a real account. No credentials leave browser or persist. Respect reduced motion.

Readability revision: increase the shared upper-page ivory mist to 84% opacity through the text zone (46% height), with a gradual fade through 61–76%; deepen heading and supporting-copy colors. Keep the landscape continuous, with no local text card or left/right divider.

## IoT signage variant

Route `/signage` shares the same login/registration interaction, while `/` remains the agriculture variant. Brand: 斐擎元芯 / Faylin Origin. Preserve the screenshot's orange identity, AI decision-support purpose, data provenance and explicit human confirmation/no automatic commands. Background is an AI-generated commercial plaza with integrated advertising displays; its prompt is stored alongside the asset.

Warm surface #faf7f1, foreground #332e29, action #bb4b0d, secondary #716252. Orange brand mark, sans-serif display title and continuous architectural backdrop. Bright upper-page atmosphere preserves text readability. No split panel, card or new motion. Optional remember-account stores only the account in localStorage, never the password. Screenshots and browser tests cover desktop, tablet, mobile, login, registration and remembering/clearing the account. No live authentication or SMS.
