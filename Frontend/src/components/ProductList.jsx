import React, { useState } from "react";
import "./ProductList.css";

// Danh sách mặc định (hiện tại)
const defaultProducts = [
  { id: 1, name: "Hồ sơ", price: "100,000đ", image: "/image/baothuA4.jpg" },
  { id: 2, name: "Vở ghi Happyday", price: "150,000đ", image: "/image/Tap-Happyday-01.jpg" },
  { id: 3, name: "Bút chì", price: "150,000đ", image: "/image/butchip333.jpg" },
  { id: 4, name: "Bấm ghim", price: "150,000đ", image: "/image/bamkim206.jpg" },
  { id: 5, name: "Màng bọc", price: "150,000đ", image: "/image/mangbong.jpg" },
  { id: 6, name: "Pin", price: "50,000đ", image: "/image/pin2a.jpg" },
  { id: 7, name: "Giấy Kraft", price: "80,000đ", image: "/image/giaykraft.jpg" },
];

function ProductList({ products = [] }) {
  // State cho tìm kiếm
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Nếu có kết quả tìm kiếm thì hiển thị, nếu không thì dùng mặc định
  const displayProducts = searchResults.length > 0 ? searchResults : (products.length > 0 ? products : defaultProducts);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error("Không tìm thấy sản phẩm phù hợp");
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message || "Lỗi khi tìm kiếm");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-section">
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, width: 220, marginRight: 8 }}
        />
        <button onClick={handleSearch} style={{ padding: 8 }}>Tìm kiếm</button>
      </div>
      {loading && <div>Đang tìm kiếm...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h2>{searchResults.length > 0 ? "Kết quả tìm kiếm" : "Sản phẩm nổi bật"}</h2>
      <div className="product-grid">
        {displayProducts.map((p, index) => (
          <div key={index} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
