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

 #### Install **Tailwind CSS IntelliSence** and create an empty `tailwind.config.js` for tailwind autosuggestion.
 
 **NOTE** : Remove all the code from App.css

### create `jsconfig.json` and paste bellow lines.

```js
{
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
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

### [](https://ui.shadcn.com/docs/installation/vite#add-components)Add Components

You can now start adding components to your project.

```sh
bunx --bun shadcn@latest add button
```

```
bunx shadcn-ui@latest add label
bunx shadcn-ui@latest add input
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

# Google fonts with tailwind

# `Recommended` tailwind v4.0

```css
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

@import "tailwindcss";

@theme {
--font-roboto: "Roboto", sans-serif;
}
```

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

@import "tailwindcss";

@theme {
--font-nunito: "Nunito", sans-serif;
--font-primary: "Nunito", sans-serif;
}
```

# `Not Recommended` 
### paste bellow code in App.css

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

.font-nunito {
font-family: "Nunito", sans-serif;
}

/* now use font-nunito with tailwind classes */

/* Other styles */
```

```jsx
import './App.css'
import { Button } from './components/ui/button'

function App() {
return (
<>
<div className="grid place-items-center h-screen bg-gradient-to-tr from-blue-950 to-red-900">

<h1 className='border-4 border-purple-500 text-6xl bg-amber-600 text-white rounded-lg p-4 font-bold font-primary animate-bounce'>Hello World</h1>

{/* <Button variant="destructive">Click Me!</Button> */}
</div>
</>
)}
export default App
```