const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

// ✅ Middleware xác thực & phân quyền
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize");

// ✅ Đăng ký & đăng nhập (ai cũng dùng được)
router.post("/register", authController.register);
router.post("/login", authController.login);

// ✅ Route: Chỉ người đã đăng nhập mới xem được thông tin cá nhân
router.get("/profile", authenticate, authController.getProfile);

// ✅ Route: Chỉ Admin mới vào được trang dashboard
router.get("/admin/dashboard", authenticate, authorizeRoles("admin"), (req, res) => {
  res.json({ message: `Chào Admin ${req.user.username}, đây là dashboard!` });
});

module.exports = router;
