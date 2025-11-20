import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthForm.css";

function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Gửi request đăng nhập tới backend
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      // res.data phải trả về user: { id, name, email, role, ... }
      const userData = res.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          autoFocus
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          required
        />
        <button type="submit">Đăng nhập</button>
        <div className="auth-link">
          <span>Chưa có tài khoản? </span>
          <a href="/register">Đăng ký</a>
        </div>
      </form>
    </div>
  );
}

export default Login;