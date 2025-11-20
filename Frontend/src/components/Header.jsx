import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${encodeURIComponent(keyword)}`);
    }
  };

  const handleAdminClick = (e) => {
    if (user && user.role === "admin") {
      navigate("/admin");
    } else {
      e.preventDefault();
      alert("Bạn không có quyền truy cập trang admin!");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất không?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  };

  return (
    <header className="header-container">
      {/* 🔹 Thanh trên cùng */}
      <div className="header-top">
        {/* Bên trái: Logo + Hotline */}
        <div className="header-left">
          <Link to="/">
            <img src="/image/logo.PNG" alt="Logo" className="logo" />
          </Link>
          <div className="hotline">
            <i className="fa fa-phone"></i>📞 <strong>0222666888</strong>
          </div>
        </div>

        {/* Giữa: Thanh tìm kiếm */}
        <div className="header-center">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">
              <span role="img" aria-label="search">🔍</span>
            </button>
          </form>
        </div>

        {/* Bên phải: Auth */}
        <div className="header-right">
          {!user ? (
            <>
              <Link to="/login" className="auth-btn">
                Đăng nhập
              </Link>
              <Link to="/register" className="auth-btn">
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <span className="welcome">👋 {user.name}</span>
              <Link to="/admin" className="auth-btn" onClick={handleAdminClick}>
                Admin
              </Link>
              <button className="auth-btn logout-btn" onClick={handleLogout}>
                🚪 Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🔹 Thanh danh mục */}
      <nav className="navbar">
        <div className="menu-item">
          <span>Bút viết ▼</span>
          <div className="dropdown">
            <Link to="/products?category=but-bi">Bút bi</Link>
            <Link to="/products?category=but-chi">Bút chì</Link>
            <Link to="/products?category=but-muc">Bút mực</Link>
          </div>
        </div>

        <div className="menu-item">
          <span>Văn phòng phẩm ▼</span>
          <div className="dropdown">
            <Link to="/products?category=keo">Kéo - Dao rọc giấy</Link>
            <Link to="/products?category=kep-giay">Kẹp giấy - Bìa hồ sơ</Link>
            <Link to="/products?category=bang-keo">Băng keo - Hồ dán</Link>
          </div>
        </div>

        <div className="menu-item">
          <span>Dụng cụ học tập ▼</span>
          <div className="dropdown">
            <Link to="/products?category=thuoc-ke">Thước kẻ</Link>
            <Link to="/products?category=tay">Tẩy - Gọt bút</Link>
            <Link to="/products?category=hop-but">Hộp bút</Link>
          </div>
        </div>

        <div className="menu-item">
          <span>Mỹ thuật ▼</span>
          <div className="dropdown">
            <Link to="/products?category=mau-ve">Màu vẽ</Link>
            <Link to="/products?category=co-ve">Cọ vẽ</Link>
            <Link to="/products?category=canvas">Giấy vẽ</Link>
          </div>
        </div>

        <div className="menu-item">
          <span>Giấy in ▼</span>
          <div className="dropdown">
            <Link to="/products?category=a4">Giấy A4</Link>
            <Link to="/products?category=photo">Giấy photo</Link>
          </div>
        </div>

        <div className="menu-item">
          <span>Sách ▼</span>
          <div className="dropdown">
            <Link to="/products?category=sach-giao-khoa">Sách giáo khoa</Link>
            <Link to="/products?category=sach-tham-khao">Sách tham khảo</Link>
            <Link to="/products?category=sach-van-hoc">Sách văn học</Link>
          </div>
        </div>

        <div className="menu-item">
          <span>Sports - Lifestyle ▼</span>
          <div className="dropdown">
            <Link to="/products?category=balo">Balo</Link>
            <Link to="/products?category=binh-nuoc">Bình nước</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
