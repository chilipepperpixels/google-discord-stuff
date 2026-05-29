# Google Form to Sheet to Discord

This project automatically pulls new entries from a Google Form/Sheet and posts them to Discord as an embed. When you set your form to store the incoming responses into an existing or new spreadsheet, this project will post the values of the newest row as an embed message through a Discord webhook. Important to note, this will not create messages for already existing entries, only those were created AFTER the addition of the script and triggers will be handled. 
---
Disclaimer: This project was inspired by https://github.com/Kelo/Google-Sheets-to-Discord.git but i re-imagined it to fit my personal needs. 
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

## Things i used

- Google Apps Script (JavaScript)
- Google Sheets
- Discord Webhooks

---

## Setup Instructions

### 1. Google Apps Script Setup
- Open your Google Sheet
- Go to **Extensions → Apps Script**
- Paste the content of `onFormSubmit.js` into the editor

### 2. Enable Trigger
In Apps Script:
- Go to **Triggers (clock icon)**
- Add trigger:
  - Function: `onFormSubmit`
  - Event source: `From spreadsheet`
  - Event type: `On form submit`

### 3. Discord Webhook Setup
- Go to your Discord server settings
- Create a webhook
- Paste the webhook URL into:

```js
var webhookUrl = "YOUR_WEBHOOK_URL";

