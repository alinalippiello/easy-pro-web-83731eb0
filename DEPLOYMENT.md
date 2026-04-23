# Deployment Guide (Vercel)

This document defines the **required Vercel project settings** so that the
build uses `npm` and the lockfile stays in sync with `package.json`.
Follow it exactly to avoid `Error 127: vite: command not found` and similar
"missing dependency" failures during the build step.

---

## 1. Vercel Project Settings (Dashboard → Settings → General)

| Setting | Required value |
|---|---|
| **Framework Preset** | `Other` (do **not** select Vite — we control the commands ourselves via `vercel.json`) |
| **Node.js Version** | `20.x` |
| **Install Command** | `npm install` (overridden by `vercel.json`) |
| **Build Command** | `npm run build` (overridden by `vercel.json`) |
| **Output Directory** | `dist` (overridden by `vercel.json`) |
| **Root Directory** | `./` (repository root) |

> ⚠️ **Do not select `bun` or `pnpm`** as the package manager in Vercel.
> The committed lockfile of record is `package-lock.json` (npm).
> Mixing package managers is the most common cause of build failures here.

---

## 2. `vercel.json` (committed at repo root)

This file is the source of truth and overrides the dashboard settings:

```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- `framework: null` prevents Vercel from injecting Vite-specific defaults.
- `installCommand: npm install` forces npm and ignores any `bun.lockb` /
  `pnpm-lock.yaml` that may also be present in the repo.
- The `rewrites` rule is required for client-side routing (React Router).

---

## 3. `package.json` requirements

`vite` and the build toolchain **must live in `dependencies`**, not
`devDependencies`. Vercel production builds skip dev deps by default, which
is what causes `vite: command not found`.

Required entries in `dependencies`:

- `vite`
- `@vitejs/plugin-react-swc`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `typescript`

The build script must be:

```json
"scripts": {
  "build": "vite build"
}
```

---

## 4. Lockfile policy

- The **single source of truth** for installs is `package-lock.json`.
- After every dependency change, run `npm install` locally and commit the
  updated `package-lock.json` in the same commit as the `package.json` change.
- Never commit `bun.lockb` or `pnpm-lock.yaml` updates from a different
  package manager — if they drift from `package.json`, Vercel may pick the
  wrong one and fail. If you see them out of sync, delete them locally and
  rerun `npm install`.

To verify lockfile and manifest agree before pushing:

```sh
npm install --package-lock-only
git diff --exit-code package-lock.json
```

A clean exit means the lockfile matches `package.json`.

---

## 5. Environment variables

No build-time environment variables are required for the static frontend.
If any are added later (e.g. analytics keys), declare them in
**Vercel → Settings → Environment Variables** for the `Production`,
`Preview`, and `Development` scopes.

---

## 6. Quick troubleshooting

| Symptom | Fix |
|---|---|
| `vite: command not found` (Error 127) | Move `vite` from `devDependencies` to `dependencies`, commit, redeploy. |
| `Cannot find module '@vitejs/plugin-react-swc'` | Same as above — move to `dependencies`. |
| Vercel uses bun instead of npm | Delete `bun.lockb` from repo, ensure `vercel.json` has `"installCommand": "npm install"`. |
| 404 on page refresh / deep link | Confirm the `rewrites` block is present in `vercel.json`. |
| Build succeeds locally but fails on Vercel | Run `rm -rf node_modules package-lock.json && npm install` locally, commit the new lockfile. |
