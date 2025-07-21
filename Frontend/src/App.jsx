import React, { useState } from "react";
import ModalProductDetail from "./components/ModalProductDetail";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Modal from "react-modal";
Modal.setAppElement("#root");
import ImageSearch from "./components/ImageSearch"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminProductManager from "./components/AdminProductManager";
import "./index.css";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = (product) => {
    console.log("🛒 Đã thêm:", product);
    setCartItems([...cartItems, product]);
    setShowModal(false);
  };

  const handleBuy = () => {
    alert("Mua ngay: " + selectedProduct.name);
    setShowModal(false);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div>
      <Header />
      <Navbar cartItems={cartItems} onCartClick={handleCartClick} />
      <Banner />

      {/* Danh sách sản phẩm */}
      <div className="container" style={{ padding: "20px" }}>
        <h2>Danh sách sản phẩm</h2>
        <ProductList onViewDetail={handleOpenModal} />
      </div>

      <Footer />

      {/* Modal chi tiết sản phẩm */}
      <ModalProductDetail
        isOpen={showModal}
        onClose={handleCloseModal}
        product={selectedProduct}
        onAddToCart={handleAddToCart} // Không được gọi sẵn ở đây!
        onBuy={handleBuy}
      />

      {/* Modal giỏ hàng */}
      <Modal isOpen={isCartOpen} onRequestClose={handleCloseCart} contentLabel="Giỏ hàng">
        <h2>🛒 Giỏ hàng của bạn</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price}₫
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleCloseCart}>Đóng</button>
      </Modal>
    </div>
  );
}

export default App;
