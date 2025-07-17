import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProductManager.css";

function AdminProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", keywords: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      keywords: form.keywords.split(",").map(k => k.trim())
    };
    if (editId) {
      await axios.put(`http://localhost:5000/api/products/${editId}`, payload);
    } else {
      await axios.post("http://localhost:5000/api/products", payload);
    }
    setForm({ name: "", price: "", image: "", keywords: "" });
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({ ...product, keywords: product.keywords.join(", ") });
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-container">
      <h2>Quản lý sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Tên sản phẩm" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Giá (vd: 100000)" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="URL ảnh" required />
        <input name="keywords" value={form.keywords} onChange={handleChange} placeholder="Từ khóa, cách nhau bằng dấu phẩy" required />
        <button type="submit">{editId ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Ảnh</th>
            <th>Từ khóa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td><img src={p.image} alt={p.name} width="50" /></td>
              <td>{p.keywords.join(", ")}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Sửa</button>
                <button onClick={() => handleDelete(p.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductManager;
