# D Kushwanth — local portfolio and content studio

This project runs on your own computer. The site, admin dashboard, JSON content file, and uploaded media all live in this project folder. No cloud account or internet hosting is required. Keep the computer and local server running while you want to view the site.

## Start it on Windows

1. Double-click `start-local.bat` (first run installs packages, asks you to create the admin login, and builds the site), or open a terminal in this folder.
2. For development, run `npm run setup-admin` once, then `npm run dev`. To run the built site, run `npm run build` and then `npm start`.
3. Open `http://127.0.0.1:5173/` for the website and `http://127.0.0.1:5173/admin` for the admin dashboard.

If port 5173 is already in use, run `set PORT=5180` before `npm start` and visit port 5180 instead.

## Add a video or content

Drop MP4, WebM, or MOV files into `data/videos` inside this project. The site detects a finished copy and adds it to the published Work collection automatically. The filename becomes the initial title, and new files start in the `Other` category; use `/admin` to rename them, choose a category, feature/unfeature them, or change their order. Removing a folder video from Admin also removes its file from `data/videos`. Removing a file from that folder removes it from the public collection on the next refresh.

The homepage shows a compact 9:16 moving strip of selected work. Local folder videos autoplay muted one at a time while visible. **Explore selected works** opens `/work`, where visitors can browse all projects and filter by category. The former Short-form Stories section and homepage category controls have been removed.

For a YouTube or Instagram project, add its public link through **Video Library / Add Content** in Admin. YouTube links get a thumbnail automatically; Instagram links use a clean fallback tile because Instagram does not expose a dependable public thumbnail URL without Meta API access. External video cards open on their source platform. The website does not download those videos.

Homepage headline, intro, About text, email, social links, and project metadata can be edited in Admin. Contact form messages are saved to the local inbox and `data/content.json`.

## Data and backups

- `data/content.json` stores editable website content and contact submissions.
- `data/media/` stores the profile portrait image.
- `data/videos/` stores the local MP4, WebM, and MOV files displayed in Work.
- `data/admin.json` stores a salted PBKDF2 password hash, never the raw password.
- Back up the entire `data` folder. Removing it deletes the local content, admin account, messages, and media.

The local server binds only to `127.0.0.1`, so other devices cannot access it by default. It is not an online deployment and is not reachable when the server is stopped.

## Current limits

This local version supports homepage/contact settings, category-managed YouTube/Instagram links, and local video files in `data/videos`. Local files are served from this computer and are not uploaded to cloud storage. Project entries, testimonials, full media-library search, automatic video duration/dimensions, and Instagram embed previews are not implemented. External links open on their source platforms; they are not downloaded or stored by this site.

## Keep the public site online with GitHub Pages

This repository deploys a static portfolio through GitHub Actions. After each source push to `main`, the workflow builds the Vite app and publishes `dist` to GitHub Pages. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the publishing source.

The public copy reads `public/site-content.json` and `public/media/`. Edit that JSON and add appropriately licensed public images/videos there, then push the changes to update the site. The included profile image and public social links are safe-to-publish site content. Do not put passwords, `data/admin.json`, private submissions, or secret keys in `public/`.

GitHub Pages serves static files only. It cannot run the local Express server, so `/admin` is a read-only notice, the contact section sends visitors to Instagram, and videos stored only in `data/videos` stay local. GitHub also blocks files larger than 100 MB; use YouTube/Instagram links for large videos instead of committing them to this repository. The local admin and its folder-based video workflow continue to run with `npm run dev` on your computer.
