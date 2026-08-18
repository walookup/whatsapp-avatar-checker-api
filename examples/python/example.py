import os

import requests

key = os.environ.get("WALOOKUP_API_KEY")
if not key:
    raise SystemExit("Set the WALOOKUP_API_KEY environment variable")

headers = {"X-API-Key": key}

checks = [
    ("/api/v1/check", {"service_type": "ws_avatar", "identifier": "+14155550100"}),
    ("/api/v1/batch-check", {"service_type": "ws_avatar", "identifiers": ["+14155550100", "+442079460000"]}),
]

for path, payload in checks:
    r = requests.post("https://walookup.com" + path, headers=headers, json=payload, timeout=60)
    r.raise_for_status()
    print(path, r.json())
