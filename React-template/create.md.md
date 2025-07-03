```sh
#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== React Project Setup Script ===${NC}"
echo

# Step 1: Project creation
echo -e "${BLUE}Step 1: Creating new Vite project${NC}"
read -p "Enter project name (default: my-react-app): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-my-react-app}

read -p "Select template (react, react-ts) [default: react]: " TEMPLATE
TEMPLATE=${TEMPLATE:-react}

echo -e "${YELLOW}Creating project: $PROJECT_NAME with template: $TEMPLATE${NC}"
bun create vite@latest $PROJECT_NAME --template $TEMPLATE

# Change to project directory
cd $PROJECT_NAME
echo -e "\n${GREEN}Project created successfully!${NC}"

# Step 2: Install base dependencies
echo -e "\n${BLUE}Step 2: Installing base dependencies${NC}"
read -p "Install base dependencies? (Y/n): " INSTALL_BASE
INSTALL_BASE=${INSTALL_BASE:-Y}

if [[ $INSTALL_BASE =~ ^[Yy] ]]; then
  echo -e "${YELLOW}Installing dependencies...${NC}"
  bun i
  echo -e "${GREEN}Base dependencies installed!${NC}"
else
  echo "Skipping base dependency installation"
fi

# Step 3: Install Tailwind CSS and additional packages
echo -e "\n${BLUE}Step 3: Installing Tailwind CSS and additional packages${NC}"

# Ask about Tailwind CSS installation
read -p "Install Tailwind CSS v4? (Y/n): " INSTALL_TAILWIND
INSTALL_TAILWIND=${INSTALL_TAILWIND:-Y}

if [[ $INSTALL_TAILWIND =~ ^[Yy] ]]; then
  echo -e "${YELLOW}Installing Tailwind CSS v4...${NC}"
  bun add tailwindcss @tailwindcss/vite
  
  # Setup Tailwind CSS config
  echo -e "${YELLOW}Setting up Tailwind CSS...${NC}"
  
  # Create/update vite.config.ts/js
  USE_TS=false
  if [ -f "vite.config.ts" ]; then
    USE_TS=true
    cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
EOF
  elif [ -f "vite.config.js" ]; then
    cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
EOF
  else
    # Create vite.config.js if it doesn't exist
    cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
EOF
  fi
  
  # Update main CSS file to import Tailwind
  CSS_FILE=""
  if [ -f "src/styles.css" ]; then
    CSS_FILE="src/styles.css"
  elif [ -f "src/index.css" ]; then
    CSS_FILE="src/index.css"
  elif [ -f "src/App.css" ]; then
    CSS_FILE="src/App.css"
  else
    CSS_FILE="src/styles.css"
    touch $CSS_FILE
  fi
  
  echo -e "${YELLOW}Updating $CSS_FILE with Tailwind directives...${NC}"
  echo '@import "tailwindcss";' > $CSS_FILE
  
  echo -e "${GREEN}Tailwind CSS v4 installed and configured!${NC}"
fi

# Ask about additional packages
read -p "Install additional packages (react-router-dom, react-icons, etc.)? (Y/n): " INSTALL_ADDITIONAL
INSTALL_ADDITIONAL=${INSTALL_ADDITIONAL:-Y}

if [[ $INSTALL_ADDITIONAL =~ ^[Yy] ]]; then
  echo -e "${YELLOW}Installing additional packages...${NC}"
  bun add react-router-dom react-icons framer-motion lucide-react axios swiper countup.js react-toastify
  echo -e "${GREEN}Additional packages installed!${NC}"
else
  read -p "Do you want to install specific packages? (y/N): " INSTALL_SPECIFIC
  INSTALL_SPECIFIC=${INSTALL_SPECIFIC:-N}
  
  if [[ $INSTALL_SPECIFIC =~ ^[Yy] ]]; then
    packages=()
    
    read -p "Install react-router-dom? (y/N): " CHOICE
    if [[ $CHOICE =~ ^[Yy] ]]; then
      packages+=("react-router-dom")
    fi
    
    read -p "Install react-icons? (y/N): " CHOICE
    if [[ $CHOICE =~ ^[Yy] ]]; then
      packages+=("react-icons")
    fi
    
    read -p "Install framer-motion? (y/N): " CHOICE
    if [[ $CHOICE =~ ^[Yy] ]]; then
      packages+=("framer-motion")
    fi
    
    read -p "Install lucide-react? (y/N): " CHOICE
    if [[ $CHOICE =~ ^[Yy] ]]; then
      packages+=("lucide-react")
    fi
    
    read -p "Install axios? (y/N): " CHOICE
    if [[ $CHOICE =~ ^[Yy] ]]; then
      packages+=("axios")
    fi
    
    read -p "Install swiper? (y/N): " CHOICE
    if [[ $CHOICE =~ ^[Yy] ]]; then
      packages+=("swiper")
    fi
    
    read -p "Install countup.js? (y/N): " CHOICE
    if [[ $CHOICE =~ ^[Yy] ]]; then
      packages+=("countup.js")
    fi
    
    read -p "Install react-toastify? (y/N): " CHOICE
    if [[ $CHOICE =~ ^[Yy] ]]; then
      packages+=("react-toastify")
    fi
    
    if [ ${#packages[@]} -gt 0 ]; then
      echo -e "${YELLOW}Installing selected packages: ${packages[*]}${NC}"
      bun add "${packages[@]}"
      echo -e "${GREEN}Selected packages installed!${NC}"
    else
      echo "No packages selected for installation"
    fi
  fi
fi

# Step 4: Create directory structure
echo -e "\n${BLUE}Step 4: Creating directory structure${NC}"

read -p "Create project directory structure? (Y/n): " CREATE_DIRS
CREATE_DIRS=${CREATE_DIRS:-Y}

if [[ $CREATE_DIRS =~ ^[Yy] ]]; then
  echo -e "${YELLOW}Creating directory structure...${NC}"
  
  mkdir -p src/components/{common,layout}
  mkdir -p src/contexts
  mkdir -p src/pages
  mkdir -p src/utils
  mkdir -p src/assets/{images,styles}
  mkdir -p src/hooks
  mkdir -p src/services
  
  echo -e "${GREEN}Directory structure created!${NC}"
  
  # Create sample files
  read -p "Create sample component files? (y/N): " CREATE_SAMPLES
  CREATE_SAMPLES=${CREATE_SAMPLES:-N}
  
  if [[ $CREATE_SAMPLES =~ ^[Yy] ]]; then
    echo -e "${YELLOW}Creating sample files...${NC}"
    
    # Create sample App.jsx with React Router setup
    if [ -f "src/App.jsx" ]; then
      cat > src/App.jsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
EOF
    fi
    
    # Create Layout component
    cat > src/components/layout/Layout.jsx << 'EOF'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
EOF

    # Create Header component
    cat > src/components/layout/Header.jsx << 'EOF'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">My App</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
EOF

    # Create Footer component
    cat > src/components/layout/Footer.jsx << 'EOF'
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} My React App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
EOF

    # Create Button component
    cat > src/components/common/Button.jsx << 'EOF'
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50'
  };
  
  return (
    <button 
      className={`px-4 py-2 rounded transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
EOF

    # Create Home page
    cat > src/pages/Home.jsx << 'EOF'
import Button from '../components/common/Button';

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold underline mb-6">Hello world!</h1>
      <p className="mb-6">This is a starter template for your React project with Tailwind CSS and React Router.</p>
      <Button>Get Started</Button>
    </div>
  );
};

export default Home;
EOF

    # Create About page
    cat > src/pages/About.jsx << 'EOF'
const About = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <p className="mb-6">
        This application was built using React, Vite, Tailwind CSS v4, and other modern tools.
        It's set up to help you get started quickly with your project.
      </p>
    </div>
  );
};

export default About;
EOF

    # Update HTML file to link CSS if needed
    if [ -f "index.html" ]; then
      # Check if link to stylesheet exists
      if ! grep -q "href=\"/src/styles.css\"" index.html && ! grep -q "href=\"/src/index.css\"" index.html && ! grep -q "href=\"/src/App.css\"" index.html; then
        sed -i 's/<\/head>/<link href="\/src\/styles.css" rel="stylesheet">\n<\/head>/' index.html
      fi
    fi

    echo -e "${GREEN}Sample files created!${NC}"
  fi
else
  echo "Skipping directory structure creation"
  mkdir -p src/{components,contexts,pages,utils}
fi

# Step 5: Start development server
echo -e "\n${BLUE}Step 5: Start development server${NC}"
read -p "Start development server now? (Y/n): " START_DEV
START_DEV=${START_DEV:-Y}

if [[ $START_DEV =~ ^[Yy] ]]; then
  echo -e "${YELLOW}Starting development server...${NC}"
  bun run dev
else
  echo -e "\n${GREEN}Setup complete!${NC}"
  echo -e "To start the development server, run: ${YELLOW}bun run dev${NC}"
  echo -e "Your project is ready at: ${YELLOW}$(pwd)${NC}"
fi
```