# Xin Li — Portfolio

A responsive, multilingual single-page portfolio built with React, TypeScript,
Vite, and Tailwind CSS.

## Features

- Light and dark Mineral Editorial theme
- English, Simplified Chinese, Traditional Chinese, Hebrew, and Arabic
- Automatic right-to-left layout for Hebrew and Arabic
- Data-driven experience timeline and project grid
- Responsive education, skills, languages, and contact sections
- Local project screenshots, campus imagery, and downloadable resume

## Ask Xin — Portfolio AI Copilot

Ask Xin is available as a quick homepage experience and at `/ask-xin`. The UI
works in curated-demo mode without credentials and switches to live Gemini
responses when the server-side environment is configured.

Security controls include:

- server-only model credentials
- same-origin request checks
- an 800-character input limit and bounded model output
- five requests per visitor per hour and 100 requests per deployment per day
- an optional durable Vercel KV / Upstash counter
- a honeypot field, timeouts, citation allowlisting, and no prompt logging

Copy the names from `.env.example` into `.env.local` for local development.
Never expose `GEMINI_API_KEY` through a `VITE_` environment variable.

For production, configure `GEMINI_API_KEY`, `RATE_LIMIT_SALT`, and optionally
the KV REST variables in Vercel. Restrict the Google key to the Gemini API only.

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```
