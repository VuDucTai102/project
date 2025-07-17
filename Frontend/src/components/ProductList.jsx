import React from "react";
import "./ProductList.css";

const defaultProducts = [
  { id: 1, name: "Hồ sơ", price: 100000, image: "/image/baothuA4.jpg" },
  { id: 2, name: "Vở ghi Happyday", price: 150000, image: "/image/Tap-Happyday-01.jpg" },
  { id: 3, name: "Bút chì", price: 150000, image: "/image/butchip333.jpg" },
  { id: 4, name: "Bấm ghim", price: 150000, image: "/image/bamkim206.jpg" },
  { id: 5, name: "Màng bọc", price: 150000, image: "/image/mangbong.jpg" },
  { id: 6, name: "Pin", price: 50000, image: "/image/pin2a.jpg" },
  { id: 7, name: "Giấy Kraft", price: 80000, image: "/image/giaykraft.jpg" },
];

function ProductList({ products = [], onViewDetail }) {
  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <div className="product-section">
      <h2>{products.length > 0 ? "Kết quả tìm kiếm" : "Sản phẩm nổi bật"}</h2>
      <div className="product-grid">
        {displayProducts.map((p, index) => (
          <div key={index} className="product-card" onClick={() => onViewDetail(p)}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price.toLocaleString()}₫</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
