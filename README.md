# Bible Outlines

Interactive learning experience for every book of the Bible — guided outlines, high-yield markers, type/antitype flashcards, and quizzes.

## View the app

**GitHub Pages** (after setup): [https://apopovski.github.io/Bible-Outlines/](https://apopovski.github.io/Bible-Outlines/)  
Note the `/Bible-Outlines/` path — `apopovski.github.io` alone will 404.

### Enable Pages (required once)

1. Make the repo **public** (Settings → General → Danger Zone), *or* use GitHub Pro (private Pages).
2. Settings → **Pages** → Build and deployment → Source: **Deploy from a branch**
3. Branch: **`gh-pages`** / folder **`/`** → Save
4. Wait a minute, then open the link above.

Or merge to `main` and use the Actions workflow (same Pages enablement still required).

Locally: `npm install && npm run dev`

## Books

| Book | Status |
|------|--------|
| Genesis | Available |
| Exodus | Available |
| Leviticus | Available |
| Isaiah | Available |
| Daniel | Available |
| John | Available |
| Revelation | Available |
| Remaining canon | Coming as outlines are added |

Genesis follows the Seventh-day Adventist review outline (Patriarchs and Prophets), including 17 quiz questions with explanations.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Deployed to GitHub Pages from `main` via `.github/workflows/deploy.yml`.
