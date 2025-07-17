import React from "react";
import "./Navbar.css";

function Navbar({ onCartClick, cartItems }) {
  const totalItems = cartItems.length;

  return (
    <div className="navbar">
      <div className="logo-section">
        <img src="/image/logo.PNG" alt="Logo" className="logo" />
      </div>
      <div className="search-section">
        <input type="text" placeholder="Bạn cần tìm sản phẩm gì?" />
        <button>🔍</button>
      </div>
      <div className="cart" onClick={onCartClick} style={{ cursor: "pointer" }}>
        🛒<span className="cart-count">{totalItems}</span>
      </div>
    </div>
  );
}

export default Navbar;
