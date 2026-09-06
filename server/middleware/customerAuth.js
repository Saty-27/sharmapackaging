const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const CustomerUser = require('../models/CustomerUser');

// In-memory store for standalone/offline fallback mode
const inMemoryCustomers = new Map();

const protectCustomer = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const jwtSecret = process.env.JWT_SECRET || 'sharmapackaging_jwt_secret_2024_secure_key';
      const decoded = jwt.verify(token, jwtSecret);

      if (decoded.role !== 'customer') {
        return res.status(403).json({ message: 'Access denied. Customer token required.' });
      }

      if (mongoose.connection.readyState === 1) {
        try {
          const dbUser = await CustomerUser.findById(decoded.id).select('-password');
          if (dbUser) {
            req.customer = dbUser;
            return next();
          }
        } catch (dbErr) {
          console.warn('DB customer lookup error:', dbErr.message);
        }
      }

      // Standalone memory fallback
      if (inMemoryCustomers.has(decoded.id)) {
        req.customer = inMemoryCustomers.get(decoded.id);
        return next();
      }

      req.customer = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.name || 'Customer',
        email: decoded.email,
        phone: decoded.phone || '',
        companyName: decoded.companyName || 'Company',
        accountStatus: 'active'
      };

      return next();
    } catch (error) {
      console.error('Customer auth middleware error:', error.message);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token provided' });
};

module.exports = { protectCustomer, inMemoryCustomers };
