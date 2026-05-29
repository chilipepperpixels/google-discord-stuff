function onFromSubmit(e) {

  try {

    if (!e || !e.values) {
      Logger.log("No event object.");
      return;
    }

    var sheet = e.range.getSheet(); //

    var headings = sheet
      .getRange(1, 1, 1, e.values.length)
      .getValues()[0];

    var values = e.values;

    var embed = {
      title: "New Submission", // Title of the embed
      description: "🍆 New consume request", // Description of the embed
      color: 0x9B59B6, // hex color code for the embed (purple in this case)
      fields: [], 
      timestamp: new Date().toISOString()
    };

    for (var i = 1; i < headings.length; i++) {

      var question = String(headings[i] || "Unknown");
      var answer = String(values[i] || "—");

      if (answer.length > 1000) {
        answer = answer.substring(0, 1000) + "...";
      }

      embed.fields.push({
        name: question,
        value: "```" + answer + "```"
      });
    }

    var payload = JSON.stringify({
      embeds: [embed]
    });

    var webhookUrl =
      "WEBOOK_URL_HERE"; // Replace with your actual webhook URL from Discord or Cloudflare worker

    var options = {
      method: "post",
      contentType: "application/json",
      payload: payload,
      muteHttpExceptions: true
    };

    // Retry system
    for (var attempt = 1; attempt <= 3; attempt++) {

      var response = UrlFetchApp.fetch(webhookUrl, options);

      var code = response.getResponseCode();

      Logger.log("Attempt: " + attempt);
      Logger.log("Response Code: " + code);
      Logger.log(response.getContentText());

      // Success
      if (code >= 200 && code < 300) {
        Logger.log("Webhook sent successfully.");
        return;
      }

      // Rate limited
      if (code == 429) {

        Logger.log("Rate limited. Waiting 5 seconds...");

        Utilities.sleep(5000);

      } else {

        // Other errors stop retrying
        Logger.log("Non-rate-limit error.");
        return;

      }
    }

    Logger.log("Failed after retries.");

  } catch(err) {

    Logger.log("ERROR:");
    Logger.log(err);

  }
}
