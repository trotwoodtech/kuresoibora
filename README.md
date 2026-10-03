# Kuresoi Bora Initiative website

Plain HTML, CSS and JavaScript. No build step, no framework, no server needed. Open `index.html` in a browser to preview.

## Publish on GitHub Pages
1. Create a GitHub repository (for example `kuresoibora`) and upload everything in this folder to the repository root.
2. Repository **Settings > Pages**: Source = "Deploy from a branch", Branch = `main`, folder = `/ (root)`.
3. Custom domain: the `CNAME` file already contains `www.kuresoibora.org`. At your domain registrar add:
   - `CNAME` record: host `www` pointing to `<your-github-username>.github.io`
   - `A` records for the bare domain `kuresoibora.org` pointing to GitHub's Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; confirm on GitHub's current docs)
4. Back in Settings > Pages, tick **Enforce HTTPS** once the certificate is ready.

## Moving to another host later
Upload the same folder contents to any static host. Delete `CNAME` if the new host does not use it.

## What to edit
| To change | Edit |
|---|---|
| Email, phone, WhatsApp, social links, form delivery | `js/config.js` |
| Gallery photos and activities | `js/gallery-data.js` (photos go in `assets/gallery/`) |
| Dominic's portrait | save as `assets/img/dominic.jpg` (about 800x1000, portrait) |
| Logo | replace `assets/logo.svg` (or change the `src` in each page header) |
| Plan wording, Dominic's bio and message | `index.html` |
| Colours | variables at the top of `css/styles.css` |

## Contact form
GitHub Pages cannot receive form posts by itself. Create a free form at formspree.io, paste its URL into `formEndpoint` in `js/config.js`, and messages will reach your inbox. Until then the form opens the visitor's email app with the message pre-filled.
