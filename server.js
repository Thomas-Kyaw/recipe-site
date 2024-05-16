const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enables CORS for all domains, adjust as needed for production

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/vueapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema and model for the contact form
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  inquiryType: { type: String, required: true },
  question: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});

// Endpoint to create a new user from the contact form
app.post('/contacts', async (req, res) => {
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      inquiryType: req.body.inquiryType,
      question: req.body.question
    });

    await newContact.save();
    res.status(201).send({ message: 'Contact saved successfully', data: newContact });
  } catch (error) {
    console.error('Failed to save contact:', error);
    res.status(400).send({ message: 'Failed to save contact', error: error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
