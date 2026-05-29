# Google Form to Sheet to Discord

This project automatically pulls new entries from a Google Form/Sheet and posts them to Discord as an embed. 

---

## Features

- Automatically triggers on Google Form submission
- Sends structured Discord webhook notifications
- Includes retry logic for webhook rate limits
- Formats form data into embed messages

---

## How it works

1. User submits Google Form
2. Response is stored in Google Sheets
3. Apps Script trigger (`onFormSubmit`) runs automatically
4. Script:
   - Parses form data
   - Sends a Discord webhook embed

---

## Tech Stack

- Google Apps Script (JavaScript)
- Google Sheets
- Discord Webhooks

---

## Setup Instructions

### 1. Google Apps Script Setup
- Open your Google Sheet
- Go to **Extensions → Apps Script**
- Paste `Code.gs` into the editor

---

### 2. Enable Trigger
In Apps Script:
- Go to **Triggers (clock icon)**
- Add trigger:
  - Function: `onFormSubmit`
  - Event source: `From spreadsheet`
  - Event type: `On form submit`

---

### 3. Discord Webhook Setup
- Go to your Discord server settings
- Create a webhook
- Paste the webhook URL into:

```js
var webhookUrl = "YOUR_WEBHOOK_URL";
