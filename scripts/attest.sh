#!/usr/bin/env bash
set -euo pipefail

# Create simple SBOM/attestation (placeholder)
mkdir -p .attest
node -v > .attest/runtime.txt
pnpm list --depth 0 > .attest/deps.txt || true
sha256sum .attest/* | tee .attest/SHA256SUMS
