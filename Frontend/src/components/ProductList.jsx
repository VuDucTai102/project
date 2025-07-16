import React from "react";
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
  // Nếu không có kết quả từ props → dùng danh sách mặc định
  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <div className="product-section">
      <h2>{products.length > 0 ? "Kết quả tìm kiếm" : "Sản phẩm nổi bật"}</h2>
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
