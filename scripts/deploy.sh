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

echo "==> Building"
corepack pnpm@latest build

# Two-pass upload so caching is right.
#
# Vite fingerprints every JS/CSS filename, so those files can never change
# behind a given name — cache them for a year. index.html keeps a stable name
# and points at the fingerprinted files, so it must never be cached, or
# visitors keep loading the previous build's assets.

echo "==> Uploading fingerprinted assets (immutable, 1 year)"
aws s3 sync dist/ "s3://${S3_BUCKET}" \
  --delete \
  --exclude "*.html" \
  --cache-control "public,max-age=31536000,immutable"

echo "==> Uploading HTML (never cached)"
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
