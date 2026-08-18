import os,requests
key=os.environ.get("WALOOKUP_API_KEY");
if not key: raise SystemExit("Set WALOOKUP_API_KEY")
h={"X-API-Key":key}
for path,payload in [("/api/v1/check",{"service_type":"ws_avatar","identifier":"+14155550100"}),("/api/v1/batch-check",{"service_type":"ws_avatar","identifiers":["+14155550100","+442079460000"]})]:
 r=requests.post("https://walookup.com"+path,headers=h,json=payload,timeout=60);r.raise_for_status();print(path,r.json())
