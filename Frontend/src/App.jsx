import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import ImageSearch from "./components/ImageSearch"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
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

          {/* Trang chính */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Navbar />
                <Banner />

                {/* Tìm kiếm bằng hình ảnh */}
                <div className="container" style={{ padding: "20px" }}>
                  <h2 style={{ marginBottom: "10px" }}>
                    Tìm kiếm sản phẩm bằng hình ảnh
                  </h2>
                  <ImageSearch onSearchResult={setProducts} />
                  <ProductList products={products} />
                </div>

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
