# Professional MERN Stack Project Setup for Printing Press Website

Here's a comprehensive file structure and implementation guide for your printing press website using React, Node.js, Express, MongoDB, Bun, Vite, and Tailwind v4.

## Project Structure

```
printing-press/
├── .gitignore
├── package.json
├── bun.lockb
├── README.md
│
├── client/                   # Frontend React application
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   ├── favicon.ico
│   │   └── assets/
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css        # Global styles and Tailwind imports
│       ├── components/      # Reusable UI components
│       │   ├── common/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   └── ContactForm.jsx
│       │   ├── auth/
│       │   │   ├── LoginForm.jsx
│       │   │   └── SignupForm.jsx
│       │   └── services/
│       │       ├── ServiceCard.jsx
│       │       └── ServiceGrid.jsx
│       ├── pages/           # Page components
│       │   ├── HomePage.jsx
│       │   ├── ServicesPage.jsx
│       │   ├── ServiceDetailPage.jsx
│       │   ├── AboutPage.jsx
│       │   ├── ContactPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── SignupPage.jsx
│       │   └── admin/
│       │       ├── Dashboard.jsx
│       │       ├── UsersList.jsx
│       │       ├── MessagesList.jsx
│       │       └── AdminLayout.jsx
│       ├── context/         # React context for state management
│       │   ├── AuthContext.jsx
│       │   └── NotificationContext.jsx
│       ├── hooks/           # Custom React hooks
│       │   ├── useAuth.js
│       │   └── useFetch.js
│       ├── api/             # API service functions
│       │   ├── auth.js
│       │   ├── services.js
│       │   ├── contact.js
│       │   └── comments.js
│       └── utils/           # Utility functions
│           ├── validators.js
│           └── formatters.js
│
└── server/                  # Backend Node.js/Express application
    ├── index.js             # Entry point
    ├── app.js               # Express app setup
    ├── config/
    │   ├── db.js            # MongoDB connection
    │   └── env.js           # Environment variables
    ├── routes/
    │   ├── auth.routes.js
    │   ├── services.routes.js
    │   ├── contact.routes.js
    │   ├── comments.routes.js
    │   └── admin.routes.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── services.controller.js
    │   ├── contact.controller.js
    │   ├── comments.controller.js
    │   └── admin.controller.js
    ├── models/
    │   ├── User.js
    │   ├── Service.js
    │   ├── Contact.js
    │   └── Comment.js
    ├── middleware/
    │   ├── auth.middleware.js
    │   ├── admin.middleware.js
    │   └── validate.middleware.js
    └── utils/
        ├── sendEmail.js
        └── errorHandler.js
```

## Implementation Guide

### 1. Project Initialization

```bash
# Create project directory
mkdir printing-press && cd printing-press

# Initialize package.json
bun init -y

# Setup client with Vite
bun create vite client -- --template react
cd client
bun install
bun add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Tailwind v4
bun add -D tailwindcss@latest

# Setup server directory
cd ..
mkdir server
cd server
bun init -y
bun add express mongoose dotenv cors helmet express-validator jsonwebtoken bcryptjs nodemailer

# Root package.json setup for running both client and server
cd ..
```

### 2. Backend Implementation

#### MongoDB Connection (server/config/db.js)

```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

#### User Model (server/models/User.js)

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
```

#### Contact Model (server/models/Contact.js)

```javascript
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
```

#### Authentication Controller (server/controllers/auth.controller.js)

```javascript
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// User registration
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });
    
    // Return user data and token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email and include password
    const user = await User.findOne({ email }).select('+password');
    
    // Check if user exists and password matches
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```

#### Contact Controller (server/controllers/contact.controller.js)

```javascript
import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      message
    });
    
    // Send notification email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `You have received a new contact form submission from ${name} (${email}):\n\n${message}`
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
};

// Get all contacts (admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update contact status (admin)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```

### 3. Frontend Implementation

#### React Router Setup (client/src/App.jsx)

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Page imports
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/admin/Dashboard';
import UsersList from './pages/admin/UsersList';
import MessagesList from './pages/admin/MessagesList';
import AdminLayout from './pages/admin/AdminLayout';

// Common components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Navbar />
          <main className="min-h-screen pt-16 pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<UsersList />} />
                <Route path="messages" element={<MessagesList />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
```

#### Authentication Context (client/src/context/AuthContext.jsx)

```jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Contact Form Component (client/src/components/common/ContactForm.jsx)

```jsx
import { useState } from 'react';
import { submitContactForm } from '../../api/contact';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await submitContactForm(formData);
      setStatus({ type: 'success', message: response.message });
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status.message && (
        <div className={`p-4 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {status.message}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
```

#### Admin Messages List (client/src/pages/admin/MessagesList.jsx)

```jsx
import { useState, useEffect } from 'react';
import { getAllContacts, updateContactStatus } from '../../api/contact';

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getAllContacts();
        setMessages(data);
      } catch (error) {
        setError('Failed to load messages');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedMessage = await updateContactStatus(id, { status: newStatus });
      setMessages(messages.map(msg => msg._id === id ? updatedMessage : msg));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading messages...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="grid gap-6">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`border rounded-lg p-4 ${
                message.status === 'new' ? 'border-blue-500 bg-blue-50' :
                message.status === 'read' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}
            >
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-medium">{message.name}</h3>
                  <p className="text-sm text-gray-600">{message.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(message.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <p className="mb-4">{message.message}</p>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm rounded-full px-2 py-1 ${
                  message.status === 'new' ? 'bg-blue-200 text-blue-800' :
                  message.status === 'read' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
                }`}>
                  {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                </span>
                
                <div className="space-x-2">
                  {message.status !== 'read' && (
                    <button
                      onClick={() => handleStatusChange(message._id, 'read')}
                      className="text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded"
                    >
                      Mark as Read
                    </button>
                  )}
                  {message.status !== 'responded' && (
                    <button
                      onClick={() => handleStatusChange(message._id, 'responded')}
                      className="text-sm bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded"
                    >
                      Mark as Responded
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesList;
```

## Next Steps

1. **Setup your API endpoints**:
    
    - Complete the server routes and controllers for services, comments, etc.
    - Implement middleware for authentication and authorization
2. **Create frontend pages and components**:
    
    - Implement all pages mentioned in the structure
    - Build components for services listing, authentication forms, etc.
3. **Implement full admin panel**:
    
    - Dashboard with statistics
    - User management
    - Service management
    - Message management
4. **Setup database**:
    
    - Create a MongoDB Atlas account or use a local MongoDB instance
    - Configure the connection in your server
5. **Deployment**:
    
    - Deploy frontend on a static hosting service (Vercel, Netlify)
    - Deploy backend on a server (Render, Railway, or AWS)

Would you like me to explain or provide code for any specific part of this project in more detail?