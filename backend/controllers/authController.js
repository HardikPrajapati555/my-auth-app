const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createUser, findUserByEmail, verifyUserEmail } = require('../models/userModel');
const { sendVerificationEmail } = require('../utils/emailService');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');

    const user = await createUser({
      firstName, lastName, email,       
      passwordHash: hash,
      role,
      verificationToken: token
    });

    await sendVerificationEmail(email, token);

    res.status(201).json({ message: 'Registered successfully. Check email to verify.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await verifyUserEmail(token);

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
    res.send('Email verified successfully');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not allowed to login from here' });
    }

    if (!user.is_verified) return res.status(401).json({ message: 'Email not verified' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, verifyEmail, loginAdmin };
