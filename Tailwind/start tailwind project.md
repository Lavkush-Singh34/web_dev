To create a Tailwind CSS project using **Bun** instead of **npm**, follow these steps:

---

### 1️⃣ **Initialize Bun Project**

Run the following command to create a new Bun project:

```sh
bun init
```

It will ask for details like project name, entry file, etc.

---

### 2️⃣ **Install Tailwind CSS with Bun**

Run the following command to install Tailwind CSS and its dependencies:

```sh
bun add -d tailwindcss postcss autoprefixer
```

---

### 3️⃣ **Initialize Tailwind CSS**

Run this command to generate the Tailwind configuration files:

```sh
bunx tailwindcss init -p
```

This will create two files:

- `tailwind.config.js` → Tailwind configuration
- `postcss.config.js` → PostCSS configuration

---

### 4️⃣ **Configure Tailwind**

Open `tailwind.config.js` and update the `content` array to specify where Tailwind should look for class names:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

### 5️⃣ **Create CSS File**

Inside `src/`, create a CSS file (e.g., `styles.css`) and add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 6️⃣ **Build Tailwind CSS**

Modify your `package.json` (or Bun's equivalent `bunfig.toml`) and add a script to compile Tailwind CSS:

```json
"scripts": {
  "dev": "bunx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch"
}
```

Run the script using:

```sh
bun run dev
```

This will generate `output.css` inside the `dist/` folder.

---

### 7️⃣ **Link CSS in HTML**

Include the compiled CSS in your `index.html`:

```html
<link href="./dist/output.css" rel="stylesheet">
```

---

### ✅ **Done!**

Now you can use Tailwind classes in your HTML and JavaScript files. 🎉