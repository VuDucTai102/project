const pool = require("../db/pool");

exports.getAllProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
};

exports.createProduct = async (req, res) => {
  const { name, price, image, keywords } = req.body;
  const result = await pool.query(
    "INSERT INTO products (name, price, image, keywords) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, price, image, keywords]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image, keywords } = req.body;
  const result = await pool.query(
    "UPDATE products SET name = $1, price = $2, image = $3, keywords = $4 WHERE id = $5 RETURNING *",
    [name, price, image, keywords, id]
  );
  res.json(result.rows[0]);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
  res.json({ message: "Đã xoá thành công" });
};

exports.searchProducts = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Thiếu tham số tìm kiếm" });
  }
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE $1",
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server khi tìm kiếm sản phẩm..." });
  }
};

