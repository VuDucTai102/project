function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
    }

    next();
  };
}

module.exports = authorizeRoles;