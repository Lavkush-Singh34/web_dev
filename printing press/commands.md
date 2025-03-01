# Complete MERN Stack Project Setup for Printing Press Website

Here's a comprehensive setup for a printing press website using React, Node.js, Express, MongoDB, Bun, Vite, and Tailwind v4. This includes detailed file structures and implementation code for both frontend and backend.

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

## Project Initialization Commands

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

## Backend Implementation

### Server Entry Point (server/index.js)

```javascript
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Express App Setup (server/app.js)

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './utils/errorHandler.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import servicesRoutes from './routes/services.routes.js';
import contactRoutes from './routes/contact.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/admin', adminRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use(errorHandler);

export default app;
```

### MongoDB Connection (server/config/db.js)

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

### Environment Config (server/config/env.js)

```javascript
import dotenv from 'dotenv';
dotenv.config();

export const {
  NODE_ENV = 'development',
  PORT = 5000,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRE,
  EMAIL_SERVICE,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  ADMIN_EMAIL
} = process.env;
```

### User Model (server/models/User.js)

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

### Service Model (server/models/Service.js)

```javascript
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  features: [String],
  pricing: {
    startingAt: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from title before saving
serviceSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
```

### Contact Model (server/models/Contact.js)

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

### Comment Model (server/models/Comment.js)

```javascript
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  text: {
    type: String,
    required: [true, 'Comment text is required']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
```

### Authentication Controller (server/controllers/auth.controller.js)

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

### Services Controller (server/controllers/services.controller.js)

```javascript
import Service from '../models/Service.js';
import Comment from '../models/Comment.js';

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get service by slug
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Get comments for this service
    const comments = await Comment.find({ service: service._id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ service, comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new service (admin only)
export const createService = async (req, res) => {
  try {
    const { title, description, imageUrl, features, pricing, isPopular, order } = req.body;
    
    const service = await Service.create({
      title,
      description,
      imageUrl,
      features: features || [],
      pricing: pricing || { startingAt: 0 },
      isPopular: isPopular || false,
      order: order || 0
    });
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update service (admin only)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete service (admin only)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Delete associated comments
    await Comment.deleteMany({ service: req.params.id });
    
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```

### Contact Controller (server/controllers/contact.controller.js)

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

### Comments Controller (server/controllers/comments.controller.js)

```javascript
import Comment from '../models/Comment.js';
import Service from '../models/Service.js';

// Add a comment to a service
export const addComment = async (req, res) => {
  try {
    const { serviceId, text, rating } = req.body;
    
    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Create comment
    const comment = await Comment.create({
      user: req.user._id,
      service: serviceId,
      text,
      rating: rating || 5
    });
    
    // Populate user information
    await comment.populate('user', 'name');
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get comments for a service
export const getServiceComments = async (req, res) => {
  try {
    const comments = await Comment.find({ service: req.params.serviceId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete comment (admin or owner)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user is comment owner or admin
    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await comment.deleteOne();
    
    res.json({ message: 'Comment removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```

### Admin Controller (server/controllers/admin.controller.js)

```javascript
import User from '../models/User.js';
import Service from '../models/Service.js';
import Contact from '../models/Contact.js';
import Comment from '../models/Comment.js';

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const serviceCount = await Service.countDocuments();
    const contactCount = await Contact.countDocuments();
    const commentCount = await Comment.countDocuments();
    
    // New messages count
    const newMessagesCount = await Contact.countDocuments({ status: 'new' });
    
    // Recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      stats: {
        users: userCount,
        services: serviceCount,
        contacts: contactCount,
        comments: commentCount,
        newMessages: newMessagesCount
      },
      recentContacts,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user's comments
    await Comment.deleteMany({ user: req.params.id });
    
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```

### Auth Middleware (server/middleware/auth.middleware.js)

```javascript
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};
```

### Send Email Utility (server/utils/sendEmail.js)

```javascript
import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  // Email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };
  
  // Send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
```

### Error Handler Utility (server/utils/errorHandler.js)

```javascript
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
```

### Auth Routes (server/routes/auth.routes.js)

```javascript
import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;
```

### Services Routes (server/routes/services.routes.js)

```javascript
import express from 'express';
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from '../controllers/services.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, admin, createService);
router.put('/:id', protect, admin, updateService);
router.delete('/:id', protect, admin, deleteService);

export default router;
```

### Contact Routes (server/routes/contact.routes.js)

```javascript
import express from 'express';
import {
  submitContact,
  getAllContacts,
  updateContactStatus
} from '../controllers/contact.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, admin, getAllContacts);
router.put('/:id/status', protect, admin, updateContactStatus);

export default router;
```

### Comments Routes (server/routes/comments.routes.js)

```javascript
import express from 'express';
import {
  addComment,
  getServiceComments,
  deleteComment
} from '../controllers/comments.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, addComment);
router.get('/service/:serviceId', getServiceComments);
router.delete('/:id', protect, deleteComment);

export default router;
```

### Admin Routes (server/routes/admin.routes.js)

```javascript
import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  deleteUser
} from '../controllers/admin.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply middleware to all routes
router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;
```

## Frontend Implementation

### App.jsx (client/src/App.jsx)

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
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
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
```

Continuing from where I left off:

### Frontend Implementation (continued)

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

#### Notification Context (client/src/context/NotificationContext.jsx)

```jsx
import { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info', duration = 5000) => {
    setNotification({ message, type });
    
    // Automatically hide notification after duration
    setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
      {notification && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-md ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'error' ? 'bg-red-500' : 
          'bg-blue-500'
        } text-white`}>
          <p>{notification.message}</p>
          <button 
            onClick={hideNotification}
            className="absolute top-1 right-1 text-white"
          >
            ×
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
};
```

#### Auth API Service (client/src/api/auth.js)

```javascript
const API_URL = '/api/auth';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to register');
  }
  
  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to login');
  }
  
  return data;
};

export const getUserProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get user profile');
  }
  
  return data;
};
```

#### Contact API Service (client/src/api/contact.js)

```javascript
const API_URL = '/api/contact';

export const submitContactForm = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit contact form');
  }
  
  return data;
};

export const getAllContacts = async (token) => {
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get contacts');
  }
  
  return data;
};

export const updateContactStatus = async (id, statusData, token) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(statusData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update contact status');
  }
  
  return data;
};
```

#### Services API Service (client/src/api/services.js)

```javascript
const API_URL = '/api/services';

export const getAllServices = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get services');
  }
  
  return data;
};

export const getServiceBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/${slug}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get service');
  }
  
  return data;
};

export const createService = async (serviceData, token) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(serviceData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create service');
  }
  
  return data;
};

export const updateService = async (id, serviceData, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(serviceData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update service');
  }
  
  return data;
};

export const deleteService = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete service');
  }
  
  return data;
};
```

#### Comments API Service (client/src/api/comments.js)

```javascript
const API_URL = '/api/comments';

export const addComment = async (commentData, token) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to add comment');
  }
  
  return data;
};

export const getServiceComments = async (serviceId) => {
  const response = await fetch(`${API_URL}/service/${serviceId}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get comments');
  }
  
  return data;
};

export const deleteComment = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete comment');
  }
  
  return data;
};
```

#### useAuth Custom Hook (client/src/hooks/useAuth.js)

```javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
```

#### useFetch Custom Hook (client/src/hooks/useFetch.js)

```javascript
import { useState, useEffect } from 'react';

const useFetch = (initialUrl, initialOptions = {}) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => {
    setRefetchIndex(prevIndex => prevIndex + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'An error occurred');
        }
        
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (url) {
      fetchData();
    }
  }, [url, options, refetchIndex]);

  return { data, isLoading, error, refetch, setUrl, setOptions };
};

export default useFetch;
```

#### Protected Route Component (client/src/components/auth/ProtectedRoute.jsx)

```jsx
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

#### Admin Route Component (client/src/components/auth/AdminRoute.jsx)

```jsx
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default AdminRoute;
```

#### Navbar Component (client/src/components/common/Navbar.jsx)

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-blue-600 text-white fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold">
              PrintPress
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/services" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Services
                </Link>
                <Link to="/about" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Link>
                <Link to="/contact" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="relative">
                  <div className="flex items-center">
                    <span className="mr-3">{user.name}</span>
                    {isAdmin && (
                      <Link to="/admin" className="bg-blue-800 hover:bg-blue-900 px-3 py-2 rounded-md text-sm font-medium mr-2">
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-blue-800 hover:bg-blue-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/login" className="bg-blue-800 hover:bg-blue-900 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-white text-blue-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-blue-700">
            {isAuthenticated ? (
              <div className="px-2 space-y-1">
                <div className="block px-3 py-2 text-base font-medium">{user.name}</div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
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
import useAuth from '../../hooks/useAuth';

const MessagesList = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getAllContacts(user.token);
        setMessages(data);
      } catch (error) {
        setError('Failed to load messages');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user.token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatedMessage = await updateContactStatus(id, { status: newStatus }, user.token);
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

#### Admin Users List (client/src/pages/admin/UsersList.jsx)

```jsx
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const API_URL = '/api/admin/users';

const UsersList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch users');
        }
        
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.token]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`${API_URL}/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user role');
      }
      
      // Update users list with updated user
      setUsers(users.map(u => u._id === userId ? data : u));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }
      
      // Remove deleted user from list
      setUsers(users.filter(u => u._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading users...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="
```