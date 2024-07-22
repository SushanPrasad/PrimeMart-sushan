import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from cookie
  
    token = req.cookies.jwt;
  

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    next(new Error('Not authorized as admin'));
  }
};

export { protect, admin };
