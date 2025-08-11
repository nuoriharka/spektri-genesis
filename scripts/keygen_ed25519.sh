#!/usr/bin/env bash
set -euo pipefail
mkdir -p keys
openssl genpkey -algorithm ed25519 -out keys/node.key
openssl pkey -in keys/node.key -pubout -out keys/node.pub
node -e "console.log(JSON.stringify({ did:`did:spektri:`+require('fs').readFileSync('keys/node.pub','utf8').trim() }))" > keys/did.json
