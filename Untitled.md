```js


bun create vite react-tailwind --template react
cd react-tailwind
bun i
bun add tailwindcss @tailwindcss/vite

echo "import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
plugins: [react(),
tailwindcss(),
],
})" > vite.config.js
echo '@import "tailwindcss";' > ./src/index.css
echo "//import google fonts and change default themes of tailwind" > ./src/app.css
touch tailwind.config.js

echo ""

```

