#!/usr/bin/env bash
set -euo pipefail
: "${WALOOKUP_API_KEY:?Set the WALOOKUP_API_KEY environment variable}"

curl --fail-with-body -sS -X POST "https://walookup.com/api/v1/check" \
  -H "X-API-Key: ${WALOOKUP_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"service_type":"ws_avatar","identifier":"+14155550100"}'

curl --fail-with-body -sS -X POST "https://walookup.com/api/v1/batch-check" \
  -H "X-API-Key: ${WALOOKUP_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"service_type":"ws_avatar","identifiers":["+14155550100","+442079460000"]}'
