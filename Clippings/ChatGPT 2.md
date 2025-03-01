---
title: "ChatGPT"
source: "https://chatgpt.com/c/67c2f947-fe78-8009-8ef3-f2256fe1ff5b"
author:
published:
created: 2025-03-01
description: "ChatGPT helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and ChatGPT can help with writing, learning, brainstorming and more."
tags:
  - "clippings"
---
Yes! You can use JavaScript to prompt the user for their name and dynamically insert it into the WhatsApp message. Here's how you can do it:

```html
html<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WhatsApp Dummy Message</title>
  <script>
    function sendMessage() {
      let userName = prompt("Please enter your name:");
      if (userName) {
        let message = encodeURIComponent(\`Hello, I am ${userName}\`);
        let phoneNumber = "+918127173818"; // Replace with your number
        let whatsappUrl = \`https://wa.me/${phoneNumber}?text=${message}\`;
        window.open(whatsappUrl, "_blank");
      }
    }
  </script>
</head>
<body>
  <button onclick="sendMessage()">WhatsApp me</button>
</body>
</html>
```

### How it works:

1. When the button is clicked, `sendMessage()` function runs.
2. It asks the user to enter their name using `prompt()`.
3. The name is inserted into the WhatsApp message dynamically.
4. The message is encoded using `encodeURIComponent()` to ensure it works in a URL.
5. Finally, the WhatsApp chat opens with the pre-filled message.

This makes the message more personalized! 🎉 Let me know if you need any modifications. 🚀