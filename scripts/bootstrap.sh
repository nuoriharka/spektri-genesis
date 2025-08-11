#!/usr/bin/env bash
set -euo pipefail

# Minimal Safe Node bootstrap (demo)
mkdir -p .attest
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "dirty")
cat > .attest/attestation.json <<EOF
{ "repo": "spektri-genesis", "date": "$DATE", "commit": "$HASH" }
EOF
sha256sum .attest/attestation.json | tee .attest/attestation.sha256

if [[ "${1:-}" == "--publish" || "${2:-}" == "--publish" ]]; then
  echo "Publishing attestation (demo stdout):"
  cat .attest/attestation.json
fi
