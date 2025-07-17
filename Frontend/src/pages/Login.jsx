import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/Auth.css";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Đăng nhập thành công!");

        // ✅ Sau khi đăng nhập chuyển tới trang chính
        navigate("/");
      } else {
        alert(`❌ ${result.error || "Đăng nhập thất bại"}`);
      }
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      alert("🚫 Không thể kết nối tới server");
    }
  };

  return (
    <div className="auth-container">
      <Header />
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input {...register("email")} type="email" required />

        <label>Mật khẩu</label>
        <input {...register("password")} type="password" required />

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
