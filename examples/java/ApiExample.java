import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiExample {

    private static final String BASE_URL = "https://walookup.com";
    private static final HttpClient CLIENT = HttpClient.newHttpClient();

    public static void main(String[] args) throws Exception {
        String apiKey = System.getenv("WALOOKUP_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("Set the WALOOKUP_API_KEY environment variable");
        }

        call(apiKey, "/api/v1/check", "{\"service_type\":\"ws_avatar\",\"identifier\":\"+14155550100\"}");
        call(apiKey, "/api/v1/batch-check", "{\"service_type\":\"ws_avatar\",\"identifiers\":[\"+14155550100\",\"+442079460000\"]}");
    }

    private static void call(String apiKey, String path, String jsonBody) throws Exception {
        HttpRequest req = HttpRequest.newBuilder(URI.create(BASE_URL + path))
                .header("X-API-Key", apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();
        HttpResponse<String> resp = CLIENT.send(req, HttpResponse.BodyHandlers.ofString());
        if (resp.statusCode() >= 300) {
            throw new IllegalStateException(path + " failed: " + resp.statusCode() + " " + resp.body());
        }
        System.out.println(path + " " + resp.body());
    }
}
