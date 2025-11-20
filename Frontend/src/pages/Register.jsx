import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const cleanForm = {
        ...form,
        email: form.email.trim().toLowerCase(),
      };
      console.log("Submitting registration form:", cleanForm);
      const res = await axios.post("http://localhost:5000/api/auth/register", cleanForm);
      console.log("res", res);
      setSuccess("Đăng ký thành công! Đang chuyển sang trang đăng nhập...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Đăng ký thất bại. Email có thể đã tồn tại."
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Đăng ký</h2>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        {success && (
          <div style={{ color: "green", marginBottom: 10 }}>{success}</div>
        )}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Họ và tên"
          required
          autoFocus
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          required
        />
        <button type="submit">Đăng ký</button>
        <div className="auth-link">
          <span>Đã có tài khoản? </span>
          <a href="/login">Đăng nhập</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
