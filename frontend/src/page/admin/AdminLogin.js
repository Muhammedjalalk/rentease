

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import APIAdmin from "../../services/adminAuthService";
import "./AdminLogin.css";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await APIAdmin.post("/login", form);
      localStorage.setItem("adminToken", res.data.token);
      alert("Login Success ✅");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed ❌");
      console.error(err.response);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p className="subtitle">Welcome back 👋</p>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;