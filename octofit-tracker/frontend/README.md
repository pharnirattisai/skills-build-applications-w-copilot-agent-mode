# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## API configuration

When running in Codespaces, define `VITE_CODESPACE_NAME` so frontend requests target the backend API on port `8000`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

You can place that value in `.env.local`. If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000`.

## Scripts

```text
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
```