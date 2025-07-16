const pool = require("../db/pool");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role",
    [name, email, hashed]
  );
  res.status(201).json(result.rows[0]);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rows.length === 0) return res.status(401).json({ error: "Sai email" });

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Sai mật khẩu" });

  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
};
