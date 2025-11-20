import React, { useState, useEffect } from "react";
import ModalProductDetail from "./components/ModalProductDetail";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./pages/Register";
import AdminProductManager from "./components/AdminProductManager";
import "./index.css";


function App() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Lấy user từ localStorage khi load trang
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    alert("Đã thêm vào giỏ hàng")
    setCartItems([...cartItems, product]);
  };

  const handleBuy = (product) => {
    console.log("Mua hàng:", product);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <Router>
      <Header />
      <Navbar cartItems={cartItems} onCartClick={handleCartClick} user={user} />
      <Banner />

      <Routes>
        {/* Trang chính */}
        <Route
          path="/"
          element={
            <div className="container" style={{ padding: "20px" }}>
              <ProductList products={products} onViewDetail={handleOpenModal} />
            </div>
          }
        />

        {/* Trang sản phẩm */}
        <Route
          path="/products"
          element={
            <div className="container" style={{ padding: "20px" }}>
              <ProductList products={products} onViewDetail={handleOpenModal} />
            </div>
          }
        />

        {/* Trang đăng ký */}
        <Route path="/register" element={<Register />} />

        {/* Trang đăng nhập */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Trang admin */}
        <Route
          path="/admin"
          element={<AdminProductManager />}
        />
      </Routes>

      <Footer />

      {/* Modal chi tiết sản phẩm */}
      <ModalProductDetail
        isOpen={showModal}
        onClose={handleCloseModal}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
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
    </Router>
  );
}

export default App;
