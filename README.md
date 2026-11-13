# Wedding website

React + Vite invitation site. Same UI on both domains; events and copy switch by hostname.

- `wedding.atishay.in` — Atishay’s family (`src/config/wedding.ts`)
- `wedding.anushka.in` — Anushka’s family (`src/config/bride.ts`)

```bash
npm install
npm run dev
npm run build
```

Fonts and theme live in `src/index.css`. Guest invite tokens are built in `src/utils/invite.ts`.
