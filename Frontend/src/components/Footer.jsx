import React from "react";
import "./Footer.css"; 

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h4>Về MONA</h4>
          <p>MONA chuyên cung cấp các sản phẩm văn phòng phẩm chất lượng cao.</p>
          <p>Giá cả hợp lý phù hợp với mọi đối tượng khách hàng.</p>
          <p>Dịch vụ tận tâm, hỗ trợ khách hàng 24/7.</p>
        </div>

        <div className="footer-section">
          <h4>Liên hệ</h4>
          <p>📍 123 Đường Phạm Văn Đồng, Hà Nội, Việt Nam</p>
          <p>📞 0222 666 888</p>
          <p>✉ contact@mona.com</p>
        </div>
        <div className="footer-section">
          <h4>Kết nối với chúng tôi</h4>
          <p>
             <a href="https://facebook.com" target="_blank">Facebook</a><br />
             <a href="https://twitter.com" target="_blank">Twitter</a><br />
             <a href="https://instagram.com" target="_blank">Instagram</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MONA. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
