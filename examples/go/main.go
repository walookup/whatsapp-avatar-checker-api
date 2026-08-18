package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

func call(key, path, body string) {
	req, _ := http.NewRequest("POST", "https://walookup.com"+path, bytes.NewBufferString(body))
	req.Header.Set("X-API-Key", key)
	req.Header.Set("Content-Type", "application/json")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Fprintln(os.Stderr, "request error:", err)
		os.Exit(1)
	}
	defer resp.Body.Close()
	respBody, _ := io.ReadAll(resp.Body)
	if resp.StatusCode >= 300 {
		fmt.Fprintf(os.Stderr, "%s failed: %d %s\n", path, resp.StatusCode, respBody)
		os.Exit(1)
	}
	fmt.Println(path, string(respBody))
}

func main() {
	key := os.Getenv("WALOOKUP_API_KEY")
	if key == "" {
		fmt.Fprintln(os.Stderr, "Set the WALOOKUP_API_KEY environment variable")
		os.Exit(1)
	}

	call(key, "/api/v1/check", `{"service_type":"ws_avatar","identifier":"+14155550100"}`)
	call(key, "/api/v1/batch-check", `{"service_type":"ws_avatar","identifiers":["+14155550100","+442079460000"]}`)
}
