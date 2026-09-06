const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const CustomerUser = require('../models/CustomerUser');
const { protectCustomer, inMemoryCustomers } = require('../middleware/customerAuth');

const jwtSecret = process.env.JWT_SECRET || 'sharmapackaging_jwt_secret_2024_secure_key';

// Helper to generate token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      companyName: user.companyName,
      role: 'customer'
    },
    jwtSecret,
    { expiresIn: '30d' }
  );
};

// POST /api/customer/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, companyName, address, country, inquiryType, password } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, Email, and Phone are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCompany = (companyName || 'Individual Customer').trim();
    const userPassword = password || 'Customer@123';

    // DB Registration
    if (mongoose.connection.readyState === 1) {
      try {
        const existingUser = await CustomerUser.findOne({ email: cleanEmail });
        if (existingUser) {
          return res.status(400).json({ message: 'An account with this email already exists. Please sign in.' });
        }

        const newUser = await CustomerUser.create({
          name: name.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          companyName: cleanCompany,
          address: (address || '').trim(),
          country: (country || 'India').trim(),
          inquiryType: (inquiryType || 'General Enquiry').trim(),
          password: userPassword,
          accountStatus: 'active'
        });

        const token = generateToken(newUser);
        const userObj = newUser.toObject();
        delete userObj.password;

        return res.status(201).json({ token, user: userObj });
      } catch (dbErr) {
        console.warn('DB registration fallback trigger:', dbErr.message);
      }
    }

    // Fallback Registration (In-Memory)
    const memId = 'cust-' + Date.now();
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const memUser = {
      _id: memId,
      id: memId,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      companyName: companyName.trim(),
      address: (address || '').trim(),
      country: (country || 'India').trim(),
      inquiryType: (inquiryType || 'General Enquiry').trim(),
      password: hashedPassword,
      accountStatus: 'active',
      createdAt: new Date()
    };

    inMemoryCustomers.set(memId, memUser);
    inMemoryCustomers.set(cleanEmail, memUser);

    const token = generateToken(memUser);
    const returnUser = { ...memUser };
    delete returnUser.password;

    res.status(201).json({ token, user: returnUser });
  } catch (error) {
    console.error('Customer registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// POST /api/customer/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter your email and password.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (mongoose.connection.readyState === 1) {
      try {
        const dbUser = await CustomerUser.findOne({ email: cleanEmail });
        if (dbUser) {
          const isMatch = await dbUser.matchPassword(password);
          if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials. Please check your password.' });
          }
          if (dbUser.accountStatus === 'blocked') {
            return res.status(403).json({ message: 'Your account has been suspended. Please contact support.' });
          }

          const token = generateToken(dbUser);
          const userObj = dbUser.toObject();
          delete userObj.password;
          return res.json({ token, user: userObj });
        }
      } catch (dbErr) {
        console.warn('DB login lookup warning:', dbErr.message);
      }
    }

    // In-memory fallback check
    const memUser = inMemoryCustomers.get(cleanEmail);
    if (memUser) {
      const isMatch = await bcrypt.compare(password, memUser.password);
      if (isMatch) {
        const token = generateToken(memUser);
        const returnUser = { ...memUser };
        delete returnUser.password;
        return res.json({ token, user: returnUser });
      }
    }

    return res.status(401).json({ message: 'No account found with this email. Please register first.' });
  } catch (error) {
    console.error('Customer login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// GET /api/customer/me
router.get('/me', protectCustomer, async (req, res) => {
  res.json(req.customer);
});

// PATCH /api/customer/profile
router.patch('/profile', protectCustomer, async (req, res) => {
  try {
    const { name, phone, companyName, address, country, inquiryType } = req.body;
    const customerId = req.customer._id || req.customer.id;

    if (mongoose.connection.readyState === 1) {
      try {
        const updated = await CustomerUser.findByIdAndUpdate(
          customerId,
          {
            $set: {
              ...(name && { name: name.trim() }),
              ...(phone && { phone: phone.trim() }),
              ...(companyName && { companyName: companyName.trim() }),
              ...(address && { address: address.trim() }),
              ...(country && { country: country.trim() }),
              ...(inquiryType && { inquiryType: inquiryType.trim() })
            }
          },
          { new: true }
        ).select('-password');

        if (updated) return res.json(updated);
      } catch (err) {
        console.warn('DB update profile error:', err.message);
      }
    }

    const memUser = inMemoryCustomers.get(customerId) || req.customer;
    if (name) memUser.name = name.trim();
    if (phone) memUser.phone = phone.trim();
    if (companyName) memUser.companyName = companyName.trim();
    if (address) memUser.address = address.trim();
    if (country) memUser.country = country.trim();
    if (inquiryType) memUser.inquiryType = inquiryType.trim();

    inMemoryCustomers.set(customerId, memUser);
    res.json(memUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;
