# WhatsApp Avatar Checker API — official examples | WA Lookup

This repository documents the WA Lookup WhatsApp Avatar Checker API integration contract using facts from the expansion manifest.

- Product page: https://walookup.com/products/ws_avatar
- API base URL: `https://walookup.com`
- Authentication: `X-API-Key`
- API key environment variable: `WALOOKUP_API_KEY`
- License: MIT

## Processing model

This synchronous API supports one identifier and ordered batches of 1–100 identifiers. An undetermined result is not a confirmed negative and is not billed.

### Single check

```bash
curl -X POST "https://walookup.com/api/v1/check" -H "X-API-Key: ${WALOOKUP_API_KEY}" -H "Content-Type: application/json" -d '{"service_type":"ws_avatar","identifier":"+14155550100"}'
```

### Batch check

```bash
curl -X POST "https://walookup.com/api/v1/batch-check" -H "X-API-Key: ${WALOOKUP_API_KEY}" -H "Content-Type: application/json" -d '{"service_type":"ws_avatar","identifiers":["+14155550100","+442079460000"]}'
```

## Products and limits

| Code | Name | Input | Limits | Result fields | Documentation |
| --- | --- | --- | --- | --- | --- |
| `ws_avatar` | WhatsApp Avatar Verification | phone | 1 single / 1–100 batch | `service_type, identifier, registered, avatar, avatar_url` | [docs](https://walookup.com/api-docs) |

## Response and boundaries

- Treat only an explicit determined result as a positive or negative classification; `undetermined`/`exists=false` is not a negative.
- Authentication keys must come from environment variables or a secret manager; never commit keys or call private/internal endpoints.
- Product prices can change. Check the official pricing page at runtime; this repository intentionally does not hard-code a price.
- Use only identifiers you are authorized to process and follow applicable privacy, platform, and data-protection requirements.

## Runnable examples

Seven self-contained examples are provided under `examples/`: Python, Node.js, Go, Java, C#, PHP, and Shell each call the synchronous `/api/v1/check` endpoint for a single identifier and `/api/v1/batch-check` for a batch, with HTTP error handling. Set the server-side API-key environment variable before running them.

## Official resources

- `ws_avatar`: https://walookup.com/api-docs
- Pricing: https://walookup.com/pricing
- OpenAPI contract: [openapi.yaml](openapi.yaml)

Last reviewed: 2026-10-30.

## Current response and timeout contract

Result fields are directly in `data`: `service_type`, `identifier`, `registered`, `avatar`, `avatar_url`. Internal `provider`/`profile_available` are not returned. For ordered batches, `exists=false` means undetermined; never classify it as a negative. Python and Node.js select `MODE=single` (default) or `MODE=batch`; their client timeout defaults to 60 / 330 seconds and is configurable via `REQUEST_TIMEOUT_SECONDS`. The server batch window is 300 seconds. Do not blindly repeat a potentially billed request after an uncertain timeout. The default budget is five in-flight requests and one synchronous batch.
