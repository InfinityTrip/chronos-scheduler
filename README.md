# chronos-scheduler

A small day-view scheduling app: React frontend (Vite), Express events API, JSON file store.
It is the demo repo for ProjectGraph.

## Run

```bash
npm install
npm run dev
```

Open **http://localhost:5173** (the Vite dev server). It proxies `/events` to the Express API on port 3000.
Port 3000 is the API only, so opening it in a browser shows "Cannot GET /".

Click **New event** to add a block to the day view.
