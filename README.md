# nicholaskimball.com

Personal site — React + Vite + Tailwind, built to a static bundle and served from S3 behind CloudFront.

## Structure

```
src/
  data/content.js      all site copy — edit here, not in components
  components/
    Nav.jsx            sticky header, blurs in on scroll
    Hero.jsx           headline + stats band
    Work.jsx           project list, each row expands to its detail
    About.jsx          narrative + skill groups
    Experience.jsx     roles and education
    Contact.jsx        channels + footer
    Section.jsx        shared section chrome (eyebrow, rule, max width)
    Reveal.jsx         IntersectionObserver fade-in wrapper
  index.css            design tokens (@theme), base styles, motion
public/                favicon, résumé PDF
```

Copy lives in one file on purpose: changing what the site *says* never means touching a component.

## Running it

The global npm install on this machine is broken (`minipass-collect` fails to load inside
`G:\node\node_modules\npm`), so commands go through pnpm via corepack:

```bash
corepack pnpm@latest install
```

```bash
corepack pnpm@latest dev
```

```bash
corepack pnpm@latest build
```

`build` writes a static bundle to `dist/`. Once npm is repaired, `npm run dev` / `npm run build`
work identically.

## Deploying to AWS

The build output is plain static files, so this is S3 + CloudFront — no server, no runtime.

**One-time setup**

1. **S3 bucket** — create one (any name; it isn't public). Leave "Block all public access" ON;
   CloudFront reaches it through an Origin Access Control, not the public internet.
2. **CloudFront distribution** — origin = the bucket, with OAC enabled. Set the
   *Default root object* to `index.html`. Redirect HTTP to HTTPS.
3. **Certificate** — request one in ACM **in us-east-1** (CloudFront only reads certs from that
   region), for `nicholaskimball.com` and `www.nicholaskimball.com`. Validate via DNS.
4. **DNS** — point an A/ALIAS record at the CloudFront distribution.

**Every deploy**

```bash
corepack pnpm@latest build && aws s3 sync dist/ s3://YOUR_BUCKET --delete
```

```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

The invalidation matters — without it CloudFront keeps serving the previous `index.html` until
the cache expires. Vite fingerprints the JS and CSS filenames, so only `index.html` is really at
risk of going stale.

Cost sits around $0.50–1.00/month at portfolio traffic levels, most of it the hosted zone.

## Notes

- `public/Nicholas-Kimball-Resume.pdf` is generated from the source `.docx` by
  `scripts/build_resume_pdf.py` — Word and LibreOffice aren't installed on this machine, so the
  layout is rebuilt from the document's text rather than exported. After editing the résumé:

  ```bash
  python scripts/build_resume_pdf.py "C:/Users/nicks/Downloads/Nicholas_Kimball.docx"
  ```

  If you'd rather ship Word's own formatting, export a PDF over that same path and ignore the
  script.
- Phone number is deliberately not on the site; public numbers attract spam. It's on the résumé.
