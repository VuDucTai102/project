import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./../styles/Auth.css"; 

function Header() {
  return (
    <div>
      <div className="header">
        <div className="hotline">
          📞 <strong>Hotline:</strong> 0222666888
        </div>
        <div className="auth">
          <a href="/login" className="auth-btn">🔐 Đăng nhập</a>
          <a href="/register" className="auth-btn">👤 Đăng ký</a>
        </div>
      </div>

      
    </div>
  );
}
export default Header;