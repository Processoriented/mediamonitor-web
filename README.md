# MediaMonitor web (React + Vite + TypeScript)

Browser UI for [mediamonitor-api](../mediamonitor-api). **Do not run the API on your laptop** unless you intend to: in normal development the API stays on your home server and this app talks to it over the LAN.

## Local development (laptop on same network)

1. Copy env and point the Vite dev proxy at your server:

   ```bash
   cp .env.example .env
   # Edit VITE_DEV_API_TARGET, e.g. http://192.168.x.x:8787 or http://hostname.local:8787
   ```

2. Install and start:

   ```bash
   npm install
   npm run dev
   ```

3. Open the URL Vite prints (usually `http://localhost:5173`). The UI calls **`/api/...`** on the same origin; Vite proxies that to `VITE_DEV_API_TARGET`, so you avoid CORS and you don’t need to run Node for the API locally.

## Production build (e.g. on your server)

```bash
npm run build
```

Serve `dist/` behind nginx/Caddy (or similar) and reverse-proxy **`/api/*`** to the mediamonitor-api container (e.g. `http://127.0.0.1:8787`), stripping the `/api` prefix to match how this project’s dev proxy works.

## Monorepo note

This folder lives next to `mediamonitor-api/`. Git layout is up to you: some teams use one repo at the parent `MediaMonitor/` folder containing both projects; others keep separate repos. Cursor will not auto-start the API just because both folders exist—only scripts you run (or add to `package.json`) do that.
