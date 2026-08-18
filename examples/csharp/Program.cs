using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    const string BaseUrl = "https://walookup.com";

    static async Task Call(HttpClient client, string path, string jsonBody)
    {
        var resp = await client.PostAsync(BaseUrl + path, new StringContent(jsonBody, Encoding.UTF8, "application/json"));
        var body = await resp.Content.ReadAsStringAsync();
        if (!resp.IsSuccessStatusCode)
        {
            throw new Exception($"{path} failed: {(int)resp.StatusCode} {body}");
        }
        Console.WriteLine($"{path} {body}");
    }

    static async Task Main()
    {
        var apiKey = Environment.GetEnvironmentVariable("WALOOKUP_API_KEY");
        if (string.IsNullOrEmpty(apiKey))
        {
            throw new Exception("Set the WALOOKUP_API_KEY environment variable");
        }

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("X-API-Key", apiKey);

        await Call(client, "/api/v1/check", @"{""service_type"":""ws_avatar"",""identifier"":""+14155550100""}");
        await Call(client, "/api/v1/batch-check", @"{""service_type"":""ws_avatar"",""identifiers"":[""+14155550100"",""+442079460000""]}");
    }
}
