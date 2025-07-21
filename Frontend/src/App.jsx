import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminProductManager from "./components/AdminProductManager";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <div>
        <Routes>
          {/* Trang đăng nhập */}
          <Route path="/login" element={<Login />} />

          {/* Trang đăng ký */}
          <Route path="/register" element={<Register />} />

          {/* Trang admin quản lý sản phẩm */}
          <Route path="/admin" element={<AdminProductManager />} />

          {/* Trang sản phẩm riêng (tùy chọn) */}
          <Route
            path="/products"
            element={
              <>
                <Header />
                <Navbar />
                <ProductList products={products} />
                <Footer />
              </>
            }
          />

          {/* Trang chính */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Navbar />
                <Banner />
                <ProductList products={products} />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
