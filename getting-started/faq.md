---
description: Frequently Asked Questions
---

# FAQ

### **Is there a rate limit?**

 No rate limits here. You'll be able to create images up until you reach your account limit.

### Is there a concurrency limit?

Many image rendering services limit the number of images you can create at once. They usually call this "workers" or their "queue". We have no concurrency limits and can scale to meet your needs.

### **Can you provide an SLA?**

Absolutely. All of our enterprise plans include an SLA. Contact us at **support@htmlcsstoimage.com** and we can build a custom plan for your specific needs.

### **I need to generate a large amount of images one time, which plan should I use?**

If an existing monthly plan does not fit your needs, please email us at: **support@htmlcsstoimage.com** with the number of images you need to generate. We can send you a one time invoice and credit your account with the number of images you need to generate.

### **Can I use external CSS stylesheets?**

Yes, embed the `link` tag in your HTML and it will be loaded on render. Multiple CSS files are supported. Large files may slow down initial render time. See this [CodePen for an example](https://codepen.io/mscccc/pen/eLRLQq).

### **Can I use my own Font Awesome Pro icons?**

Yes, include the `<link>` tag to the Font Awesome CDN in your html. You may need to add `localhost` to your hostname whitelist for us render icons using your account.

### **How do I render an entire webpage?**

Yes, take a look at our [URL to image](url-to-image.md) guide for screenshotting a webpage.

If you don't have a public URL, you can also pass the entire HTML document to our API and we'll render it. Be sure any external CSS or images have fully qualified links so we can download them when rendering the image.

### **How long will my image url work?**

Forever. As long as your HCTI account is active, we keep a copy of your generated image stored and accessible from your image url. It's also cached behind our CDN, so you can use it on your website and be confident that it will load quickly.

### **Can I load external images?**

Yes, be sure to include the full URL to your external image. The API will load it before creating the image. `<img src="https://example.com/yourimage.png" />`

### **How do I upgrade my account?**

You may change your plan anytime by visiting the [Dashboard](https://htmlcsstoimage.com/dashboard).

### **Do you support Chinese, Japanese and Korean c**haracters**?**

Yes. We have [Noto CJK](https://www.google.com/get/noto/help/cjk/) installed in our image renderer. If you find any language/character set that does not render correctly, please send us an email and we'll get it added for you.

### **How much bandwidth can I use?**

All images served by the [hcti.io](https://hcti.io) domain are cached by Cloudflare's global content delivery network. Bandwidth is unlimited and paid for as a part of your subscription.

### **Can I use the API for a hackathon?**

Definitely. If you're a student and using the API to build something cool. Email us and we'd be happy to add free images to your account.

### **Can I set my images filename?**

The filename for your image is a randomly generated \(and unique!\) [UUID](https://en.m.wikipedia.org/wiki/Universally_unique_identifier). We currently do not have the option to set the filename. 

The `v1/image` namespace is shared by everyone who uses the API. Auto generating the file names makes your content more secure \(hard to guess\). We also use these long keys as partition keys for our infrastructure. This helps us scale the API for creating millions of images each month. 

Using UUID's helps us keep the service easy to use, fast and secure. Which is important to us.

### **What version of Google Chrome does HCTI use?**

We regularly keep HCTI up-to-date with the latest version of Chrome. We run a full test suite to ensure images render as expected before upgrading the API.

### **I have other questions, who do I ask?**

Email us! **support@htmlcsstoimage.com**. We'd love to hear from you. We're great at debugging rendering issues, so send us your toughest problems.

