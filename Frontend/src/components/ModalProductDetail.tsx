// ModalProductDetail.tsx
import React from "react";
import "./ModalProductDetail.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onBuy: () => void;
  onAddToCart: (product: any) => void;
}

const ModalProductDetail: React.FC<Props> = ({ isOpen, onClose, product, onBuy, onAddToCart }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <button className="close-btn" onClick={onClose}>X</button>
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>Giá: {product.price.toLocaleString()}</p>

        <div className="dialog-actions">
          <button onClick={onBuy}>Mua ngay</button>
          <button onClick={() => onAddToCart(product)}>Thêm vào giỏ</button>
        </div>
      </div>
    </div>
  );
};

export default ModalProductDetail;
