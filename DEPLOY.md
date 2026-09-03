# Cloudflare Workers deployment runbook

## Production

- URL: <https://cooking-helper.asytykh.workers.dev/>
- Worker: `cooking-helper`
- Branch: `main`
- Workflow: `.github/workflows/deploy-workers.yml`
- Assets directory: `dist-native/`

GitHub Pages, `gh-pages`, Netlify, and GitLab Pages are obsolete for this
project and must not be used as production targets.

## Automatic deployment

Every push to `main` performs:

1. `npm ci`
2. `npm run quality`
3. `npm test`
4. `npm run build`
5. `npx wrangler deploy`
6. an HTTP smoke test of the production URL

Required GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN` with permission to edit Workers;
- `CLOUDFLARE_ACCOUNT_ID` for the target account.

## Normal delivery

```bash
git switch main
git pull --ff-only origin main
git config core.hooksPath .githooks
npm ci
npm run check
npm run git:identity
git add <intended-files>
git commit -m "Describe the completed change"
git push origin main
```

Both identities must be `sytykhandrei1 <andrei3758@gmail.com>` so GitHub
attributes commits to the owner's contribution graph. After pushing, wait for
the `Deploy to Cloudflare Workers` workflow and verify the production URL.

Do not force-push normal work. If history repair is explicitly requested, fetch
first and use an exact `--force-with-lease`; never use blind `--force`.

## Manual deployment

Use only when GitHub Actions cannot be used and Cloudflare credentials are
already available in the local environment:

```bash
npm ci
npm run deploy
```

Never commit Cloudflare tokens, account credentials, `.wrangler/`, or generated
`dist-native/` files.
