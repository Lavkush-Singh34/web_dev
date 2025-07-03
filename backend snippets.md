mkdir -p client/src/{components,pages,features,utils,assets}

You can use the following **Bash command** to quickly create the necessary directories and files for your MERN backend project:

```bash
mkdir -p backend/{controllers,models,routes} &&
cd backend &&
touch server.js .env &&
touch controllers/userController.js &&
touch models/userModel.js &&
touch routes/userRoutes.js
```

### **Explanation:**

- `mkdir -p backend/{controllers,models,routes}` → Creates the project directory with subdirectories for **controllers, models, and routes**.
    
- `cd backend` → Navigates into the project folder.
    
- `touch server.js .env` → Creates the main server file and environment configuration file.
    
- `touch controllers/userController.js` → Creates the controller file.
    
- `touch models/userModel.js` → Creates the model file.
    
- `touch routes/userRoutes.js` → Creates the routes file.
    

#### **(Optional) Initialize Bun**

Since you're using **Bun**, run:

```bash
bun init
```

- **Entry point:** `server.js`
    
- **Package manager:** Choose `bun`
    

Then install dependencies:

```bash
bun add express mongoose dotenv cors
```

Now, you're ready to start coding! 🚀 Let me know if you need help with the setup.