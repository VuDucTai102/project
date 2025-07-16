import React from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import "../styles/Auth.css";

function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Đăng ký:", data);
  };

  return (
    <div className="auth-container">
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
