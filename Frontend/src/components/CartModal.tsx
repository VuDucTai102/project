// CartModal.tsx
import React from "react";
import "./ModalProductDetail.css"; // dùng chung CSS cho đơn giản

interface CartItem {
  name: string;
  price: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

function CartModal({ isOpen, onClose, cartItems }: CartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Giỏ hàng của bạn</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price.toLocaleString()}₫
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CartModal;
