import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-section">
        <img src="/image/logo.PNG" alt="Logo" className="logo" />
        {/* <h1 className="brand">MONA</h1> */}
      </div>
      <div className="search-section">
        <input type="text" placeholder="Bạn cần tìm sản phẩm gì?" />
        <button>🔍</button>
      </div>
      <div className="cart">
        🛒<span className="cart-count">0</span>
      </div>
    </div>
  );
}

export default Navbar;
