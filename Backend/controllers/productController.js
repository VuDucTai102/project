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
