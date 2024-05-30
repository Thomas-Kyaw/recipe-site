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

// Define a Mongoose schema and model for the user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Seed the database with an admin user
const seedAdminUser = async () => {
  try {
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      const newAdmin = new User({
        username: 'admin',
        password: 'admin' // In a real application, hash this password
      });
      await newAdmin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Failed to seed admin user:', error);
  }
};

seedAdminUser();

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

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'An error occurred during login' });
  }
});

// Endpoint to fetch all contacts with pagination
app.get('/contacts', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const contacts = await Contact.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Contact.countDocuments();

    res.status(200).json({
      contacts,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts', error: error });
  }
});


// Endpoint to update a contact
app.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(400).json({ message: 'Error updating contact', error: error });
  }
});

// Endpoint to delete a contact
app.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(400).json({ message: 'Error deleting contact', error: error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
