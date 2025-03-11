---
title: "ChatGPT"
source: "https://chatgpt.com/c/67cbea0b-dec8-8009-ba2e-d9fec583599c"
author:
published:
created: 2025-03-08
description: "ChatGPT helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and ChatGPT can help with writing, learning, brainstorming and more."
tags:
  - "clippings"
---
###### ChatGPT said:

You can check which DNS servers your Arch Linux system is using with the following methods:

### 1\. **Check `resolv.conf` (Traditional Method)**

Run:

```sh
shcat /etc/resolv.conf
```

This will show the DNS servers your system is using. If you see something like `nameserver 127.0.0.53`, your system is using a local resolver like `systemd-resolved`.

---

### 2\. **Check systemd-resolved (If Enabled)**

If you are using `systemd-resolved`, run:

```sh
shresolvectl status
```

or

```sh
shsystemd-resolve --status
```

Look under the `DNS Servers` section.

If your system is using `systemd-resolved`, the actual DNS servers might not be directly in `/etc/resolv.conf`, but instead managed by `resolvectl`.

---

### 3\. **Check NetworkManager (If Installed)**

If you are using NetworkManager, run:

```sh
shnmcli dev show | grep DNS
```

This will list the DNS servers assigned to your network interfaces.

---

### 4\. **Check Active Connections**

For a more detailed view, use:

```sh
grep "nameserver" /etc/resolv.conf
```

or check the DNS settings for a specific interface (like `wlan0` or `eth0`):

```sh
nmcli device show wlan0 | grep DNS
```

(Replace `wlan0` with your active network interface.)

---

### 5\. **Check DNS Used by the System**

To verify which DNS is actually being used for queries:

```sh
dig google.com
```

or

```sh
nslookup google.com
```

This will show which DNS server is resolving queries.

Let me know if you need help modifying the DNS settings! 🚀