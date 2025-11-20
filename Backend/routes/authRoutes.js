const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

//  Middleware xác thực & phân quyền
const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorize");

//  Đăng ký & đăng nhập (ai cũng dùng được)
router.post("/register", authController.register);
router.post("/login", authController.login);

// Route: Chỉ người đã đăng nhập mới xem được thông tin cá nhân
router.get("/profile", authenticate, authController.getProfile);

// Route: Bỏ phân quyền, chỉ cần đăng nhập là vào được dashboard
router.get("/admin/dashboard", (req, res) => {
  res.json({ message: "Đây là dashboard!" });
});

module.exports = router;
