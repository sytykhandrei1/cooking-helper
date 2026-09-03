# Instructions for coding agents

This file is the authoritative operating guide for agents working in this repository.

## Canonical application and deployment

- Work from the default production branch `main`.
- The production application is Expo/React Native Web. Its entry point is `index.js`, and the active UI lives in `src/native/`.
- Production URL: <https://cooking-helper.asytykh.workers.dev/>.
- Every push to `main` runs `.github/workflows/deploy-workers.yml` and deploys `dist-native/` to the Cloudflare Worker named `cooking-helper`.
- GitHub Pages, `gh-pages`, Netlify, and GitLab Pages are not production targets.
- The legacy Vite UI has been removed. Expo/React Native Web in `src/native/` is the only interface.

## Git attribution is mandatory

Every commit must belong to the user's GitHub profile so it appears in the profile contribution graph.

Before creating any commit, configure and verify the repository-local identity:

```bash
git config user.name "sytykhandrei1"
git config user.email "andrei3758@gmail.com"
git config core.hooksPath .githooks
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
```

Both identities must report `sytykhandrei1 <andrei3758@gmail.com>`. The tracked pre-commit hook rejects any other author or committer. Do not bypass it with `--no-verify`. Do not create commits as Claude, Codex, another agent, or with a machine-local `*.local` email. Do not override the author with another identity. After pushing, verify that GitHub links the commit author to `sytykhandrei1`. If attribution is wrong, stop and repair the unpublished/unmerged history before continuing.

Commits only appear in the contribution graph after they reach the default branch, so completed work must be committed and pushed to `main`.

## Required workflow

Start every task by synchronizing safely:

```bash
git switch main
git pull --ff-only origin main
git status --short --branch
```

For each completed logical change:

1. Stage only intended files; preserve unrelated user changes.
2. Run `npm run check`.
3. Re-check both Git identities shown above.
4. Create a focused commit with a meaningful message.
5. Run `git push origin main` immediately.
6. Wait for the `Deploy to Cloudflare Workers` GitHub Actions run to succeed.
7. Smoke-check <https://cooking-helper.asytykh.workers.dev/> before reporting completion.

Do not batch completed changes locally when they can be delivered independently. Do not use plain `git push --force`. `--force-with-lease` is allowed only after explicit user approval for an exact remote ref and after fetching immediately beforehand.

## Local verification

```bash
npm ci
npm run quality
npm test
npm run build
```

`npm run build` exports the production web bundle to ignored directory `dist-native/`. Never commit `dist-native/`, `dist/`, `build/`, `node_modules/`, `.wrangler/`, credentials, or generated deployment artifacts.
