---
title: "ChatGPT"
source: "https://chatgpt.com/c/67d3c4e2-24c4-8009-9ed6-a1548c335f3e"
author:
published:
created: 2025-03-14
description: "ChatGPT helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and ChatGPT can help with writing, learning, brainstorming and more."
tags:
  - "clippings"
---
###### ChatGPT said:

To stop a GitHub Codespace from the terminal, follow these steps:

### 1\. **Using `gh` CLI (Recommended)**

GitHub provides the `gh` CLI, which allows you to manage Codespaces easily.

#### **Step 1: Ensure the `gh` CLI is installed**

If you haven't installed it yet, install it using:

- **Arch Linux:**
```sh
shsudo pacman -S github-cli
```
- **Other Linux/macOS:**
```sh
shcurl -fsSL https://cli.github.com/install.sh | sh
```

#### **Step 2: Authenticate with GitHub**

Run:

```sh
shgh auth login
```

and follow the prompts.

#### **Step 3: List running Codespaces**

```sh
shgh codespace list
```

This will display all your active Codespaces along with their names.

#### **Step 4: Stop a specific Codespace**

```sh
shgh codespace stop -c <codespace-name>
```

Replace `<codespace-name>` with the actual name from the list.

---

### 2\. **Using `GitHub Codespaces Web Interface`**

If you don’t want to use the terminal, you can:

1. Go to **[GitHub Codespaces](https://github.com/codespaces)**.
2. Find your active Codespace.
3. Click **Stop**.

Let me know if you need further help! 🚀