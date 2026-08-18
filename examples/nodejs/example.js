const key = process.env.WALOOKUP_API_KEY;
if (!key) {
  throw new Error("Set the WALOOKUP_API_KEY environment variable");
}

async function call(path, body) {
  const r = await fetch("https://walookup.com" + path, {
    method: "POST",
    headers: { "X-API-Key": key, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  if (!r.ok) {
    throw new Error(`${path} failed: ${r.status} ${text}`);
  }
  console.log(path, text);
}

async function main() {
  await call("/api/v1/check", { service_type: "ws_avatar", identifier: "+14155550100" });
  await call("/api/v1/batch-check", {
    service_type: "ws_avatar",
    identifiers: ["+14155550100", "+442079460000"],
  });
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
