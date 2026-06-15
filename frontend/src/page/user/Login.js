


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/authService";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("✅ Login Successful");
      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "❌ Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // 👇 UI DESIGN PART (REPLACE YOUR OLD RETURN)
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to your account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


// 👇 ADD THIS AT THE BOTTOM (OUTSIDE FUNCTION)
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    color: "#777",
    fontSize: "14px",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  linkText: {
    marginTop: "15px",
    fontSize: "14px",
  },

  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "bold",
  },
};