export default {
  async fetch(request, env) {

    //const myWebhookURL = env.WEBHOOK_URL; you either do this way or inside the fetch() in line 15. 

    if (request.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    
    try {

      const body = await request.text();

      const response = await fetch(env.WEBHOOK_URL, {
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
