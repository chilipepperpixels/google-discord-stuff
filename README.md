# Google Form to Sheet to Discord

This project automatically pulls new entries from a Google Form/Sheet and posts them to Discord as an embed.

When you set your form to store incoming responses into an existing or new spreadsheet, this project will post the values of the newest row as a Discord embed using a webhook.

Important note:

This will not create messages for already existing entries, only new submissions made after the script and trigger are set up.

---

## Disclaimer: 
This project was inspired by: https://github.com/Kelo/Google-Sheets-to-Discord.git
It has been reworked and adapted to fit personal requirements.

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
- Create a webhook and copy the link
- In App Script:
   - Project Settings (cogwheel icon)
   - Script Properties:
      - Property = WEBHOOK_URL
      - Value = "Your webhook link goes in here"

This way your webhook link is stored in a secure variable that only you can see.      

## Calendar addition
- Creates all-day events in Google Calendars on form submission. (From starting date to ending date)
- Paste the content of  `onFormSubmitWithCalendar.js` into the editor.
- Create a new .gs file in the project and paste the content of `auth.js` into the editor. Press RUN and go through the steps in the pop-up window. (Same as before when you gave permissions upon project creation)
- Continue with the [second step](#2-enable-trigger)

--- 

# Circumventing Discord webhook limitations

Due to Discord webhook limitations, i had to look for a different avenues to ensure my script would always execute the way i want. To achieve this, i used Cloudflare workers instead of direct Discord webhook links. It's fairly easy to set up.

---

## What it does
Cloudflare Worker acts as a relay between the Google Apps Script and Discord.  
It forwards webhook payloads and adds retry + rate-limit handling.
This improves reliability and avoids Discord blocking Google IP ranges.

## Features
- Handles Discord rate limits (429)
- Retries failed requests automatically
- Prevents Google IP blocking (Cloudflare 1015 issue)
- Acts as a stable relay layer
- Serverless (no backend needed)

## Setup Instructions
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
- Open Workers & Pages  
- Click Create Worker
- Choose "Hello World" template
- Add a custom URL to the link which you will use as your webhook URL.
- Replace the worker's code with the content of `worker.js`.
- Deploy
- Go back to your Worker's page and click Settings
- Variables and Secrets → + Add button
   - Type = Secret
   - Variable name = WEBHOOK_URL
   - Value = "Your webhook link goes in here"
   - Deploy
