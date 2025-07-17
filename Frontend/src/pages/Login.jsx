import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import "../styles/Auth.css";
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const onLoginSuccess = () => {
    // Điều hướng đến trang chính sau khi đăng nhập thành công
    navigate("/update-product");
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Đăng nhập:", data);
  };

  return (
    <div className="auth-container">
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
