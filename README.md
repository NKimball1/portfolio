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
The domain and DNS live at Cloudflare (Route 53 refuses domain registration on AWS accounts
without enough billing history). Cost is about $10/year for the domain and well under $1/month
on AWS at portfolio traffic.

### One-time setup

Do these in order — later steps depend on IDs the earlier ones produce.

**1. Register the domain at Cloudflare.** Cloudflare dashboard → *Domain Registration* →
*Register Domains*. Sold at cost, WHOIS privacy included. The domain lands in your account with
Cloudflare DNS already active — there is no Route 53 hosted zone in this setup.

**2. Create an IAM user for deploys.** IAM console → *Users* → create one (e.g. `portfolio-deploy`)
with programmatic access. Attach `AmazonS3FullAccess` and `CloudFrontFullAccess` — tighten later if
you care to. Save the access key and secret; you'll only see the secret once.

**3. Configure the CLI.** Run this yourself — never paste your keys into a chat:

```bash
aws configure
```

**4. Create the bucket.** Any name; it stays private. Leave *Block all public access* ON —
CloudFront reaches it through an Origin Access Control, not the open internet.

```bash
aws s3api create-bucket --bucket YOUR_BUCKET --region us-east-1
```

**5. Request the certificate — in us-east-1.** CloudFront only reads certificates from that
region, no matter where everything else lives. In ACM, request a public cert covering both
`yourdomain.com` and `www.yourdomain.com` with DNS validation. ACM shows a CNAME name and value
for each — add those in Cloudflare DNS, **proxy status off (grey cloud)**. Validation takes a
few minutes once the records are in.

**6. Create the CloudFront distribution.** Origin = your S3 bucket, with *Origin access control*
enabled (create one, then use the button ACM offers to copy the generated bucket policy back to
S3 — that policy is what lets CloudFront read a private bucket). Then set:

- *Default root object*: `index.html`
- *Viewer protocol policy*: Redirect HTTP to HTTPS
- *Alternate domain names (CNAMEs)*: your domain and the `www` variant
- *Custom SSL certificate*: the one from step 5

The distribution takes 5–15 minutes to deploy.

**7. Point DNS at it.** In Cloudflare DNS, add two CNAME records targeting the distribution's
domain (`dXXXXXXXXXX.cloudfront.net`):

| Name  | Target                       | Proxy status          |
|-------|------------------------------|-----------------------|
| `@`   | `dXXXXXXXXXX.cloudfront.net` | DNS only (grey cloud) |
| `www` | `dXXXXXXXXXX.cloudfront.net` | DNS only (grey cloud) |

Cloudflare flattens the apex CNAME automatically, which is why `@` works here. **Keep the proxy
off.** Orange cloud puts Cloudflare's CDN in front of CloudFront: two caches, so `deploy.sh`'s
invalidation clears one and the other keeps serving the old build — plus redirect loops unless
SSL mode is exactly Full (strict). Grey cloud means CloudFront alone handles the site.

**8. Fill in your config.**

```bash
cp deploy.config.example deploy.config
```

Put your bucket name, distribution ID, and domain in it. It's git-ignored.

### Every deploy after that

```bash
./scripts/deploy.sh
```

That builds, uploads in two passes, and invalidates the CDN cache. The two passes matter: Vite
fingerprints the JS and CSS filenames so those are cached for a year, while `index.html` keeps a
stable name and is marked never-cache — otherwise visitors keep loading the previous build's
assets after a deploy.

## Notes

- `public/Nicholas-Kimball-Resume.pdf` is generated from the source `.docx` by
  `scripts/build_resume_pdf.py` — Word and LibreOffice aren't installed on this machine, so the
  layout is rebuilt from the document's text rather than exported. After editing the résumé:

  ```bash
  python scripts/build_resume_pdf.py "C:/Users/nicks/Downloads/Nicholas_Kimball.docx"
  ```

  If you'd rather ship Word's own formatting, export a PDF over that same path and ignore the
  script.
- The served PDF has the phone number stripped, because the site publishes it and scrapers read
  it. The source `.docx` keeps the number for résumés sent directly to employers. Pass
  `--keep-phone` to render it anyway.
