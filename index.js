const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Connect to MongoDB (Change the URI based on your setup)
mongoose.connect('mongodb://localhost:27017/bankApp', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(express.json()); // Body parsing middleware

const port = 5000;

// User Model
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  balance: { type: Number, default: 1000 },
});

const User = mongoose.model('User', UserSchema);

// Register Endpoint (For user signup)
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });

  await newUser.save();
  res.json({ success: true, message: 'User registered successfully' });
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ success: false, message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ success: false, message: 'Incorrect password' });

  const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
  res.json({ success: true, message: 'Login successful', token });
});

// Transfer Endpoint
app.post('/api/transfer', async (req, res) => {
  const { recipient, amount } = req.body;

  const sender = await User.findOne({ email: 'sender@example.com' }); // Replace with authenticated user info
  const receiver = await User.findOne({ email: recipient });

  if (!sender || !receiver) return res.json({ success: false, message: 'User not found' });

  if (sender.balance < amount) return res.json({ success: false, message: 'Insufficient funds' });

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  res.json({ success: true, message: 'Transfer successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
