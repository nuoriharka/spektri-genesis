#!/usr/bin/env bash
set -euo pipefail
# Alustaa turvasolmun ja generoi attestaatiot
mkdir -p .attest
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
cat > .attest/attestation.json <<EOF
{ "type": "safe_node", "created": "$DATE" }
EOF
sha256sum .attest/attestation.json | tee .attest/attestation.sha256
