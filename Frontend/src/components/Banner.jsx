import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner1">
      <img  className="banner-img" src="/image/banner.jpg" alt="Banner" />
      <div className="banner-text">
        <h1>Chào mừng đến với MONA Shop</h1>
        <p>Sản phẩm chất lượng - Dịch vụ tận tâm</p>
      </div>
    </div>
  );
}

export default Banner;
