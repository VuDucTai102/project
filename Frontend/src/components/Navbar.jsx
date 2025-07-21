import React from "react";
import "./../styles/Auth.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo-section">
        <img src="/image/logo.PNG" alt="Logo" className="logo" />
      </div>

      

      <div className="cart">
        🛒<span className="cart-count">0</span>
      </div>
    </div>
  );
}

export default Navbar;
