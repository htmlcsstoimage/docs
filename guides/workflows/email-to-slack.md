---
layout: page
title: Email to Slack
permalink: /guides/workflows/email-to-slack/
parent: Workflows
grand_parent: Guides
nav_order: 4
description: >-
  Learn how to post screenshots of emails into Slack. It's super simple with using Zapier + the HTML/CSS to Image integration.
---
# How to automatically post email screenshots to Slack (with Zapier)
{: .no_toc }
{: .fs-9 }

A step by step guide
{: .fs-6 .fw-300 }

<hr>

In this guide, we will learn how to post screenshots of emails into Slack. It's super simple with using Zapier + the HTML/CSS to Image integration.

{% cloudinary /assets/images/slack-email.png sizes="600px" alt="Share a screenshot of an email in slack" %}

Sharing a full image of the email makes it possible to show things like charts or graphs with your team. Adding a nice visual to every message.

## How it works
We'll be accomplishing this with 3 steps.
1. Listen for inbound emails to Zapier.
2. Create an image from the email using HTML/CSS to Image.
3. Post that image into a Slack channel.

{% cloudinary /assets/images/slack-email-1.png alt="Steps in zapier for posting an email to slack" %}

## Step by step guide

1\. First, you'll need to create a new Zap and use the "Email" trigger. This will allow you to send an email to a special address and it will instantly trigger the Zap to start.

{% cloudinary /assets/images/slack-email-2.png sizes="600px" alt="Setup the email trigger" %}

2\. Once that is setup, give it a try by sending a test email to your new address. After a few moments, you should see your email in Zapier.

{% cloudinary /assets/images/slack-email-3.png sizes="600px" alt="Send a test email to Zapier" %}


3\. Next, you'll want to generate an image of the email. For that you can use the HTML/CSS to Image plugin. This is how we'll convert our email into an image.

{% cloudinary /assets/images/slack-email-4.png sizes="600px" alt="Setup the HTML/CSS to Image integration" %}

4\. For authentication, you'll need to grab your API key details from the dashboard. The free account will allow you 50 screenshots per month.

5\. Next, you'll use the "Create image" action. See the screenshot for how to set it up.

- Set HTML to the `Body HTML` from your email.

{% cloudinary /assets/images/slack-email-5.png sizes="600px" alt="Configure the correct settings for creating your image" %}

6\. Give that a test, you'll get back a URL to your image. This is the image you'll then be able to share in Slack.


7\. Next, you'll need to connect the Zap to Slack. Use the Slack plugin and connect your account.

{% cloudinary /assets/images/slack-email-6.png sizes="600px" alt="Connect zapier to slack to post an image" %}

8\. Choose the "Send Channel Message" action and start configuring it. The key here is setting the "Attach image by url" field to the URL returned to you by HTML/CSS to Image.

{% include hint.md title="FYI" text="You can further customize your message here by editing the Message Text. In this example we added in who the email was from and the subject line." %}

{% cloudinary /assets/images/slack-email-7.png sizes="600px" alt="Configure the slack message that will be sent" %}

9\. Now you can give it a test run. The message, with your test email should get posted into Slack. Save your Zap and test it for real by sending another email to your address.

{% cloudinary /assets/images/slack-email-8.gif sizes="600px" alt="Working example of an email being posted into slack with a screenshot" %}

## That's it!

Now each time an email is sent to the Zapier address, it will quickly appear in your Slack channel as an image.

You can customize this further by pulling emails from different sources. Such as from gmail directly if you'd like. You can also do things like include the text of the email in the message so that people can copy and paste it, or click any links.


{% include code_footer.md version=1 %}


