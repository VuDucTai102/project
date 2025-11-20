const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db'); // Kết nối PostgreSQL

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
  // Trả về thông tin user (không trả về password)
  const { id, name, email: userEmail, role } = user;
  res.json({ id, name, email: userEmail, role });
});

router.post('/register', async (req, res) => {
  let { name, email, password } = req.body;
  email = email.trim().toLowerCase(); // chuẩn hóa email
  try {
    const check = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: 'Email đã tồn tại!' });
    }
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, hash, 'user']
    );
    res.json({ message: 'Đăng ký thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

module.exports = router;