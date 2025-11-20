const pool = require("../db/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  Đăng ký người dùng
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Chuẩn hóa email
    const cleanEmail = email.trim().toLowerCase();

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [cleanEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm người dùng mới vào database
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, cleanEmail, hashedPassword, role || "user"]
    );

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    console.error("Lỗi đăng ký:", err.message);
    res.status(500).json({ message: "Đăng ký thất bại" });
  }
};

//  Đăng nhập người dùng + trả JWT
exports.login = async (req, res) => {
  try {
    console.log("email, password:", req.body);

    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email.trim().toLowerCase(),
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email không tồn tại" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Sai mật khẩu" });
    }

    //  Kiểm tra biến môi trường JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error(" JWT_SECRET chưa được cấu hình trong .env!");
      return res.status(500).json({ error: "Lỗi cấu hình server (JWT_SECRET thiếu)" });
    }

    //  In log để kiểm tra
    console.log(" JWT_SECRET:", process.env.JWT_SECRET);

    //  Tạo token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    res.status(500).json({ error: "Lỗi server khi đăng nhập" });
  }
};

//  Lấy thông tin người dùng (dành cho route /profile)
exports.getProfile = (req, res) => {
  const user = req.user; // Đã được gán bởi middleware authenticate
  res.json({
    message: "Thông tin người dùng",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
