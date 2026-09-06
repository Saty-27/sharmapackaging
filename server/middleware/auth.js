const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const jwtSecret = process.env.JWT_SECRET || 'sharmapackaging_jwt_secret_2024_secure_key';
      const decoded = jwt.verify(token, jwtSecret);

      if (mongoose.connection.readyState === 1) {
        try {
          req.user = await AdminUser.findById(decoded.id).select('-password');
        } catch (dbErr) {
          console.warn('DB lookup error in auth middleware:', dbErr.message);
        }
      }

      // Fallback user if not found in DB or running in standalone mode
      if (!req.user) {
        req.user = {
          _id: decoded.id || 'default-admin-id-12345',
          id: decoded.id || 'default-admin-id-12345',
          name: 'Admin',
          email: decoded.email || 'admin@sharmapackagings.com',
          role: decoded.role || 'superadmin'
        };
      }

      return next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
