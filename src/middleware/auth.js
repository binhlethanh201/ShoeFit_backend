const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

    // Verify token
    const token = authHeader.split(' ')[1];
    console.log('Token received:', token ? `${token.substring(0, 15)}...` : 'none');

    try {
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined in environment variables');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error'
        });
      }
      
      // Add extra error handling for JWT verification
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.user = decoded;
        
        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
          return res.status(401).json({
            success: false,
            message: 'Token has expired'
          });
        }
        
        next();
      } catch (jwtError) {
        if (jwtError.name === 'JsonWebTokenError') {
          return res.status(401).json({
            success: false,
            message: 'Invalid token format'
          });
        } else if (jwtError.name === 'TokenExpiredError') {
          return res.status(401).json({
            success: false,
            message: 'Token has expired'
          });
        } else {
          throw jwtError; // Let it be caught by the outer catch block
        }
      }
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || 'unknown'}) is not allowed to access this resource`
      });
    }
    next();
  };
};

const isStore = (req, res, next) => {
  if (req.user && req.user.role === 'store') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Store role required.',
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.',
    });
  }
};

const isUserOrStore = (req, res, next) => {
  if (req.user && (req.user.role === 'user' || req.user.role === 'store')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Store or User role required.',
    });
  }
};

module.exports = {
 checkAuth,
 authorizeRoles,
 isStore,
 isAdmin,
 isUserOrStore
};