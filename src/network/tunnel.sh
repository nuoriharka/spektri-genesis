#!/usr/bin/env bash
set -euo pipefail

if [[ "${SPEKTRE_NET_ENABLED:-false}" != "true" ]]; then
  echo "SPEKTRE_NET_ENABLED=false (staged)."
  exit 0
fi

if ! command -v ngrok >/dev/null 2>&1; then
  echo "ngrok not found. Install: https://ngrok.com/download"
  exit 1
fi

PORT="${SPEKTRE_GATEWAY_PORT:-8787}"
ngrok http "$PORT"
