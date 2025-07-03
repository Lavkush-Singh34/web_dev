```bash
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv cors

```

Alright! Let's dive deeper into **controllers** in the MERN stack.

---

### 🔹 **What is a Controller?**

A **controller** in the backend (Node.js + Express) is responsible for handling the **business logic** of your application. It processes requests, interacts with the database, and returns responses to the client.

### 🔹 **Why Use Controllers?**

1. **Separation of Concerns** → Keeps your code clean by separating logic from routes.
    
2. **Reusability** → You can reuse controllers across different routes.
    
3. **Maintainability** → Makes debugging and modifying code easier.
    

---

## 🛠️ **Creating a Controller in a MERN Backend**

Let's build a **User Controller** for a simple Express API.

### **1️⃣ Setting Up the Project**

If you haven't set up your backend yet, create a new project:

```bash
mkdir backend && cd backend
npm init -y
npm install express mongoose dotenv cors
```

> **Note**: `dotenv` helps manage environment variables, and `cors` enables cross-origin requests.

---

### **2️⃣ Creating the Controller File**

Create a `controllers/userController.js` file:

```javascript
import User from "../models/userModel.js"; // Import the User model

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from MongoDB
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save(); // Save to MongoDB
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```

---

### **3️⃣ Defining Routes for the Controller**

Create a `routes/userRoutes.js` file:

```javascript
import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);  // GET /api/users - Get all users
router.post("/users", createUser); // POST /api/users - Create a new user

export default router;
```

---

### **4️⃣ Connecting Everything in `server.js`**

Now, create `server.js` and set up Express:

```javascript
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware for parsing JSON
app.use(cors()); // Enable CORS

app.use("/api", userRoutes); // Use user routes

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
    .catch(err => console.log(err));
```

---

### **5️⃣ Creating a Mongoose Model**

Create a `models/userModel.js` file:

```javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

export default mongoose.model("User", userSchema);
```

---

## 🚀 **Testing the API**

1. **Start the Server**
    
    ```bash
    node server.js
    ```
    
2. **Test in Postman or Thunder Client**
    
    - **GET Request** → `http://localhost:5000/api/users`
        
    - **POST Request** → `http://localhost:5000/api/users`
        
        ```json
        {
          "name": "John Doe",
          "email": "john@example.com"
        }
        ```
        

---

## 🔥 **Controller Recap**

- **Controllers handle logic** (fetching, creating, updating, deleting).
    
- **Routes define endpoints** and call the respective controller functions.
    
- **Models define the database structure**.
    

---

### **Next Steps**

Do you want to extend this by adding authentication (JWT) or user update/delete functionality? 🚀