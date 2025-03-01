---
title: "ChatGPT"
source: "https://chatgpt.com/c/67c2e0be-c09c-8009-aa12-9a7d47b34259"
author:
published:
created: 2025-03-01
description: "ChatGPT helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and ChatGPT can help with writing, learning, brainstorming and more."
tags:
  - "clippings"
---
ShadCN UI is a collection of beautifully styled, accessible, and customizable components built on top of Radix UI and Tailwind CSS. It is mainly used in React projects to quickly build user interfaces.

---

## **How to Use ShadCN UI in Your React Project**

### **Step 1: Install a New React App (If Not Already)**

If you don’t have a React project yet, create one using Vite or Next.js.

For **Vite + React**:

```sh
shbun create vite@latest my-app --template react
cd my-app
```

For **Next.js**:

```sh
shbun create next@latest my-app
cd my-app
```

> You can also use `npx create-next-app@latest my-app` if using npm.

---

### **Step 2: Install ShadCN UI**

Run the following command inside your project folder:

```sh
shbun dlx shadcn-ui@latest init
```

Or for npm:

```sh
shnpx shadcn-ui@latest init
```

This will ask for some configurations, such as:

- Framework: **Next.js / Vite**
- Alias for `@shadcn/ui`: You can keep the default.
- Tailwind CSS: It will detect if Tailwind is installed.

If you don’t have **Tailwind CSS** installed, it will help you set it up.

---

### **Step 3: Install a Component**

To install a component (e.g., Button):

```sh
shbun dlx shadcn-ui@latest add button
```

For npm:

```sh
shnpx shadcn-ui@latest add button
```

---

### **Step 4: Use the Component in Your App**

After installation, you can import and use it in your React components:

```tsx
tsximport { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button variant="default">Click Me</Button>
    </div>
  );
}
```

---

## **Additional Notes**

- ShadCN UI stores components locally in your `components/ui` folder.
- You can customize components easily by modifying the files.
- It works best with **Next.js**, but you can configure it for Vite.

Let me know if you need help setting it up with your project! 🚀