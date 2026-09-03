# Cooking Helper development guide

## Setup

Requirements: Node.js 22+, npm 10+, Git, and optionally Expo Go or native
simulators for mobile testing.

```bash
git clone https://github.com/sytykhandrei1/cooking-helper.git
cd cooking-helper
git switch main
git config core.hooksPath .githooks
npm ci
```

## Active application

The production code is Expo/React Native with a web export:

```text
index.js                 Expo entry point
app.json                 Expo metadata
app.config.js            Web base URL configuration
src/native/              Production UI, screens, components, theme and icons
src/data/                Shared dish data
src/utils/               Shared matching and ingredient-visual logic
scripts/check-dishes.js  Database validation
wrangler.jsonc           Cloudflare Workers static-assets configuration
vitest.config.js         Test runner configuration
```

## Commands

```bash
npm start               # Expo development server
npm run ios             # iOS target
npm run android         # Android target
npm run web             # active web application
npm run quality         # validate the dish database
npm test                # Vitest suite
npm run build           # production Expo web export to dist-native/
npm run check           # quality + tests + production build
npm run git:identity    # verify GitHub contribution attribution
```

## Code conventions

- Use functional React components and hooks.
- Put production UI changes under `src/native/`.
- Use `StyleSheet.create` and tokens from `src/native/theme.js`.
- Use `react-native-safe-area-context` for safe areas and React Native
  primitives instead of browser-only elements in production UI.
- Keep shared business logic platform-independent in `src/data/` and
  `src/utils/`, with Vitest coverage.
- Never commit generated directories or credentials.

## Delivery workflow

The user wants each completed logical change visible in production and in the
GitHub contribution graph. Work directly from synchronized `main`, verify the
repo-local identity is `sytykhandrei1 <andrei3758@gmail.com>`, run
`npm run check`, commit only intended files, and immediately push to `main`.
Then wait for the Cloudflare workflow and smoke-check the production URL.

The full mandatory agent procedure is in [AGENTS.md](./AGENTS.md). Deployment
details and recovery steps are in [DEPLOY.md](./DEPLOY.md).
