<?php
$apiKey = getenv("WALOOKUP_API_KEY");
if (!$apiKey) {
    fwrite(STDERR, "Set the WALOOKUP_API_KEY environment variable\n");
    exit(1);
}

function call(string $apiKey, string $path, string $jsonBody): void {
    $ch = curl_init("https://walookup.com" . $path);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ["X-API-Key: $apiKey", "Content-Type: application/json"],
        CURLOPT_POSTFIELDS => $jsonBody,
    ]);
    $body = curl_exec($ch);
    if ($body === false) {
        fwrite(STDERR, "request error: " . curl_error($ch) . "\n");
        exit(1);
    }
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($status >= 300) {
        fwrite(STDERR, "$path failed: $status $body\n");
        exit(1);
    }
    echo "$path $body\n";
}

call($apiKey, "/api/v1/check", '{"service_type":"ws_avatar","identifier":"+14155550100"}');
call($apiKey, "/api/v1/batch-check", '{"service_type":"ws_avatar","identifiers":["+14155550100","+442079460000"]}');
