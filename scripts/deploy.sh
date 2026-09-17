#!/usr/bin/env bash
#
# Build the site and push it to S3 behind CloudFront.
#
#   ./scripts/deploy.sh
#
# Reads bucket and distribution IDs from deploy.config (git-ignored — copy
# deploy.config.example and fill it in). Requires the AWS CLI to be configured.
#
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f deploy.config ]]; then
  echo "error: deploy.config not found." >&2
  echo "  cp deploy.config.example deploy.config   # then fill in your values" >&2
  exit 1
fi

# shellcheck disable=SC1091
source deploy.config

: "${S3_BUCKET:?set S3_BUCKET in deploy.config}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?set CLOUDFRONT_DISTRIBUTION_ID in deploy.config}"

# Only main ships. Experiments live on branches in this same working tree, and
# this script deploys whatever is checked out, so refuse anything else.
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "main" && "${ALLOW_BRANCH_DEPLOY:-}" != "1" ]]; then
  echo "error: on branch '$BRANCH'. Deploys run from main only." >&2
  echo "  (set ALLOW_BRANCH_DEPLOY=1 to override deliberately)" >&2
  exit 1
fi

echo "==> Building"
corepack pnpm@latest build

# Two-pass upload so caching is right.
#
# Vite fingerprints everything under assets/ (index-<hash>.js, .css), so those
# files can never change behind a given name — cache them for a year. Everything
# else keeps a stable filename and gets replaced in place: index.html, the résumé
# PDF, the favicon. Those must never be cached hard, or visitors keep getting the
# previous version — a year-old résumé, or an index.html pointing at assets that
# no longer exist.

echo "==> Uploading fingerprinted assets (immutable, 1 year)"
aws s3 sync dist/ "s3://${S3_BUCKET}" \
  --delete \
  --exclude "*" \
  --include "assets/*" \
  --cache-control "public,max-age=31536000,immutable"

echo "==> Uploading stable-name files (revalidate every time)"
aws s3 sync dist/ "s3://${S3_BUCKET}" \
  --delete \
  --exclude "assets/*" \
  --exclude "*.html" \
  --cache-control "no-cache,must-revalidate"

# HTML separately so the Content-Type carries an explicit charset; s3 sync's
# guess is bare text/html, and the pages contain non-ASCII punctuation.
echo "==> Uploading HTML (revalidate every time, utf-8)"
aws s3 sync dist/ "s3://${S3_BUCKET}" \
  --delete \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache,must-revalidate" \
  --content-type "text/html; charset=utf-8"

echo "==> Invalidating CloudFront"
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

echo "    invalidation ${INVALIDATION_ID} created"
echo "==> Done. Live in a minute or two at https://${SITE_DOMAIN:-your-domain}"
