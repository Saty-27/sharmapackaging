const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const { protect } = require('../middleware/auth');

const DEFAULT_ADMIN = {
  id: 'default-admin-id-12345',
  name: 'Admin',
  email: 'admin@sharmapackagings.com',
  password: 'sharmapackaging@2024',
  role: 'superadmin'
};

const DEFAULT_USERS_LIST = [
  { _id: 'default-admin-id-12345', name: 'Admin', email: 'admin@sharmapackagings.com', role: 'superadmin', createdAt: new Date() }
];

let inMemoryAdminUsers = [...DEFAULT_USERS_LIST];

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const inputEmail = email.trim().toLowerCase();
    const jwtSecret = process.env.JWT_SECRET || 'sharmapackaging_jwt_secret_2024_secure_key';

    let user = null;
    let isMatch = false;

    // Try MongoDB authentication if connection is ready
    if (mongoose.connection.readyState === 1) {
      try {
        const dbUser = await AdminUser.findOne({ email: inputEmail });
        if (dbUser) {
          const match = await dbUser.matchPassword(password);
          if (match) {
            user = dbUser;
            isMatch = true;
          }
        }
      } catch (dbErr) {
        console.warn('DB query error during login:', dbErr.message);
      }
    }

    // Fallback authentication for default admin
    if (!isMatch && inputEmail === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      user = {
        _id: DEFAULT_ADMIN.id,
        name: DEFAULT_ADMIN.name,
        email: DEFAULT_ADMIN.email,
        role: DEFAULT_ADMIN.role
      };
      isMatch = true;
    }

    if (!isMatch || !user) {
      return res.status(401).json({ message: 'Invalid credentials. Please check email and password.' });
    }

    const token = jwt.sign(
      { id: user._id || user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return res.json({
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// GET /api/admin/profile
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

// GET /api/admin/users
router.get('/users', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const users = await AdminUser.find().select('-password').sort({ createdAt: -1 });
        return res.json(users.length > 0 ? users : inMemoryAdminUsers);
      } catch (err) {
        console.warn('DB users query failed:', err.message);
      }
    }
    res.json(inMemoryAdminUsers);
  } catch (error) {
    res.json(DEFAULT_USERS_LIST);
  }
});

// POST /api/admin/users
router.post('/users', protect, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (mongoose.connection.readyState === 1) {
      try {
        const exists = await AdminUser.findOne({ email: email.toLowerCase() });
        if (exists) return res.status(400).json({ message: 'User already exists' });
        const user = await AdminUser.create({ name, email, password, role });
        return res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
      } catch (err) {
        console.warn('DB create user failed:', err.message);
      }
    }

    const newUser = { _id: 'usr-' + Date.now(), name, email: email.toLowerCase(), role: role || 'admin', createdAt: new Date() };
    inMemoryAdminUsers.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        await AdminUser.findByIdAndDelete(req.params.id);
      } catch (err) {
        console.warn('DB delete user failed:', err.message);
      }
    }
    inMemoryAdminUsers = inMemoryAdminUsers.filter(u => u._id !== req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
