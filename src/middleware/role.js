// Middleware to check user role
exports.isStore = (req, res, next) => {
  if (req.user && req.user.role === "store") {
    next(); 
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Store role required.",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
  }
};

