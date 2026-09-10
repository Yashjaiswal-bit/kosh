# Deploying Kosh to GitHub Pages

Ten minutes, no build step, no dependencies.

## 1. Make the repository

On GitHub: **New repository** → name it `kosh` → **Public** → create.

(Private repos need GitHub Pro for Pages. Public is fine — the repo holds the app,
never your data.)

## 2. Push the files

Unzip this folder, then from inside it:

```bash
git init
git add .
git commit -m "Kosh"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kosh.git
git push -u origin main
```

Or use **Add file → Upload files** on GitHub and drag the whole folder in.

## 3. Turn on Pages

Repository → **Settings** → **Pages** → under *Build and deployment*:

- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)** → **Save**

Give it a minute. Your app is at:

```
https://YOUR-USERNAME.github.io/kosh/
```

## 4. Install it on your phone

Open that URL on your phone.

- **Android / Chrome** — menu → *Install app* (or *Add to Home screen*).
- **iPhone / Safari** — Share → *Add to Home Screen*. It must be Safari; Chrome on
  iOS cannot install web apps.

It then opens full screen with no browser chrome, and works with no network.

## 5. Move your existing ledger across

Your data is tied to the address the app is served from, so a fresh deployment starts
empty. To bring an existing ledger over:

1. Open the old copy → **Settings → Data → JSON** → *Copy to clipboard*.
2. Open the new copy → **Settings → Data → Restore** → paste → *Restore and overwrite*.

## Updating it later

Push your changes, and **bump the version in `sw.js`**:

```js
const VERSION = 'kosh-v2';   // was kosh-v1
```

The service worker serves the cached copy first, so without a new version string
your phone keeps showing the old app. This is the one step that catches people out.

## If something goes wrong

**Page is 404** — Pages takes a minute on the first deploy. Check Settings → Pages
shows a green "Your site is live at…". Confirm `index.html` is at the repo root, not
inside a nested folder.

**Blank page** — open the browser console. Almost always a path problem: every link in
this project is relative (`app.js`, not `/app.js`) so it works under `/kosh/`. Keep it
that way.

**It won't install** — the manifest and service worker both need HTTPS. GitHub Pages
gives you that automatically; `file://` does not, which is why local testing needs a
real server.

**Old version keeps loading** — see *Updating it later*. To force it right now:
DevTools → Application → Service Workers → *Unregister*, then reload.

**Fonts look wrong** — check the `fonts/` folder made it into the push. Git handles
`.woff2` as binary fine, but an upload through the web UI can miss a folder.
