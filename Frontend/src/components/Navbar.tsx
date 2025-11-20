import React from "react";
import "./../styles/Auth.css";
import "./Navbar.css";

interface NavbarProps {
  onCartClick: () => void;
  cartItems: any[];
}

function Navbar({ onCartClick, cartItems }: NavbarProps) {
  const totalItems = cartItems.length;

  return (
    <div className="navbar">
      <div className="logo-section">
        <img src="/image/logo.PNG" alt="Logo" className="logo" />
      </div>
      
      <div className="cart" onClick={onCartClick} style={{ cursor: "pointer" }}>
        🛒<span className="cart-count">{totalItems}</span>
      </div>
    </div>
  );
}

export default Navbar;
