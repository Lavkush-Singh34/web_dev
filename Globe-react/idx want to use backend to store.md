```jsx


import React
, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show a loading state
    setSubmissionError(null); // Clear any previous errors

    try {
      const response = await fetch('/api/contact', { // Replace '/api/contact' with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Data sent successfully
      console.log('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      alert('Thank you for your message. We will get back to you soon!');
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmissionError('Failed to submit the form. Please try again later.');
      alert(submissionError);
    } finally {
      setIsSubmitting(false); // Hide loading state
    }
  };
// add the form here
};

export default Contact;



```

##- Create a new `server.js` file:

```jsx

const express = require('express');
const { Client, Databases, ID } = require('appwrite');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001; // Choose a port for your server

// Enable CORS for all origins
app.use(cors());

// Appwrite Configuration (SERVER-SIDE ONLY)
const APPWRITE_PROJECT_ID = 'YOUR_PROJECT_ID';
const APPWRITE_DATABASE_ID = 'YOUR_DATABASE_ID';
const APPWRITE_COLLECTION_ID = 'YOUR_COLLECTION_ID';
const APPWRITE_ENDPOINT = 'YOUR_ENDPOINT';
const APPWRITE_API_KEY = 'YOUR_API_KEY'; // You should create this in the appwrite console
const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

// Middleware to parse JSON request bodies
app.use(express.json());

// API Endpoint to Handle Contact Form Submissions
app.post('/api/contact', async (req, res) => {
  try {
    const formData = req.body; // Data from the client-side form

    // Create a new document in Appwrite
    const promise = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      ID.unique(),
      formData
    );
    console.log('Form submitted successfully!',promise);

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Form submission failed:', error);
    res.status(500).json({ error: 'Failed to submit the form.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

###**Frontend `Contact.jsx` (Modified)**

```jsx


import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('http://localhost:3001/api/contact', { // Your server API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      alert('Thank you for your message. We will get back to you soon!');
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmissionError('Failed to submit the form. Please try again later.');
      alert(submissionError);
    } finally {
      setIsSubmitting(false);
    }
  };
    // add the form here
};

export default Contact;

```

