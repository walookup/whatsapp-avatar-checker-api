// Browser code must call a same-origin backend proxy; never expose an API key.
async function checkSingle() {
  const r = await fetch("/api/check-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ service_type: "ws_avatar", identifier: "+14155550100" }),
  });
  return r.json();
}

async function checkBatch() {
  const r = await fetch("/api/batch-check-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_type: "ws_avatar",
      identifiers: ["+14155550100", "+442079460000"],
    }),
  });
  return r.json();
}

Promise.all([checkSingle(), checkBatch()]).then((results) => console.log(results));
