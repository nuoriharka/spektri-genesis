#!/usr/bin/env bash
set -euo pipefail

# Publish repo snapshot to IPFS (requires IPFS daemon running)
CID=$(ipfs add -r . | tail -n1 | awk '{print $2}')
echo "Published to IPFS with CID: $CID"
echo $CID > .ipfs_cid
