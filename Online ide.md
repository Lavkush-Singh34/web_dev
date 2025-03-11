```sh
curl -fsSL https://bun.sh/install | bash

```

Then, make sure to run `source $HOME/.bashrc` or `source $HOME/.zshrc` (depending on your shell) to update your path.

```sh
bun create vite my-shadcn-project --template react
or

bun create vite@latest

```

```
cd my-shadcn-project
bun install
```
### Add Tailwind CSS

```
bun add tailwindcss @tailwindcss/vite
```

Copy Replace everything in `src/index.css` with the following: `src/index.css`

```sh
@import "tailwindcss";
```

`vite.config.js`

```sh
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

```

### Run the CLI

Run the `shadcn` init command to setup your project:

```
bunx --bun shadcn@latest init
```

Copy

You will be asked a few questions to configure `components.json`.

```
Which color would you like to use as base color? › Neutral
```

Copy

### [](https://ui.shadcn.com/docs/installation/vite#add-components)Add Components

You can now start adding components to your project.

```
bunx --bun shadcn@latest add button
```

Copy

The command above will add the `Button` component to your project. You can then import it like this:
`src/app.jsx`

```sh
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
  )
}

export default App
```

