import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/Auth.css";

function Register() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate(); // ✅ Hook để chuyển trang

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Đăng ký thành công!");
        reset();

        // ✅ Chuyển hướng sang trang đăng nhập sau 1s
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        alert(`❌ Lỗi: ${result.error || "Không xác định"}`);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("🚫 Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="auth-container">
      <Header />
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Họ và tên</label>
        <input {...register("name")} type="text" required />

        <label>Email</label>
        <input {...register("email")} type="email" required />

        <label>Mật khẩu</label>
        <input {...register("password")} type="password" required />

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
