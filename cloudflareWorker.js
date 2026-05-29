export default {
  async fetch(request) {

    if (request.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    const discordWebhook =
      "WEBHOOK_URL_HERE"; // Replace with your Discord webhook URL

    try {

      const body = await request.text();

      const response = await fetch(discordWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: body
      });

      return new Response("Forwarded", { status: response.status });

    } catch (err) {
      return new Response("Error: " + err.toString(), { status: 500 });
    }
  }
};
