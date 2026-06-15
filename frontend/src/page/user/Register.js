// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../../services/authService";

// function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.password) {
//       return alert("Please fill all fields");
//     }

//     try {
//       setLoading(true);

//       const res = await API.post("/auth/register", form);

//       alert("✅ Registered Successfully");

//       // redirect to login
//       navigate("/");

//     } catch (err) {
//       alert(err.response?.data?.message || "❌ Registration Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Create Account 🚀</h2>
//         <p style={styles.subtitle}>Register to get started</p>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             name="name"
//             placeholder="Enter your name"
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             name="email"
//             placeholder="Enter your email"
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Enter your password"
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <button type="submit" style={styles.button}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p style={styles.linkText}>
//           Already have an account?{" "}
//           <Link to="/" style={styles.link}>
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;


// // 🎨 SAME STYLE AS LOGIN (KEEP CONSISTENT UI)
// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #667eea, #764ba2)",
//   },

//   card: {
//     background: "#fff",
//     padding: "30px",
//     borderRadius: "10px",
//     width: "320px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//     textAlign: "center",
//   },

//   title: {
//     marginBottom: "5px",
//   },

//   subtitle: {
//     color: "#777",
//     fontSize: "14px",
//     marginBottom: "20px",
//   },

//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },

//   input: {
//     padding: "10px",
//     marginBottom: "15px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },

//   button: {
//     padding: "10px",
//     borderRadius: "5px",
//     border: "none",
//     background: "#667eea",
//     color: "#fff",
//     fontWeight: "bold",
//     cursor: "pointer",
//   },

//   linkText: {
//     marginTop: "15px",
//     fontSize: "14px",
//   },

//   link: {
//     color: "#667eea",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
// };
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/authService";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
    isDefault: true,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Personal Info Validation ─────────────────────────────────────────────
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password) {
      return alert("Please fill all personal info fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return alert("Please enter a valid email address.");
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      return alert("Please enter a valid 10-digit phone number.");
    }

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match.");
    }

    // ── Address Validation ───────────────────────────────────────────────────
    if (
      !address.name.trim() ||
      !address.phone.trim() ||
      !address.line1.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !address.pincode.trim()
    ) {
      return alert("Please fill all address fields.");
    }

    if (!/^[0-9]{6}$/.test(address.pincode)) {
      return alert("Please enter a valid 6-digit pincode.");
    }

    if (!/^[0-9]{10}$/.test(address.phone)) {
      return alert("Please enter a valid 10-digit phone number for address.");
    }

    try {
      setLoading(true);

      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        addresses: [address],   // send as array to match User model
      });

      alert("✅ Registered Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Register to get started</p>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* ── Personal Info ── */}
          <p style={styles.sectionLabel}>Personal Info</p>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number (10 digits)"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
            maxLength={10}
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />

          {/* ── Default Address ── */}
          <p style={styles.sectionLabel}>Default Address</p>

          <input
            name="name"
            placeholder="Recipient Name"
            value={address.name}
            onChange={handleAddressChange}
            style={styles.input}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Recipient Phone (10 digits)"
            value={address.phone}
            onChange={handleAddressChange}
            style={styles.input}
            maxLength={10}
          />
          <input
            name="line1"
            placeholder="Address Line (House No, Street)"
            value={address.line1}
            onChange={handleAddressChange}
            style={styles.input}
          />
          <input
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
            style={styles.input}
          />
          <input
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleAddressChange}
            style={styles.input}
          />
          <input
            name="pincode"
            placeholder="Pincode (6 digits)"
            value={address.pincode}
            onChange={handleAddressChange}
            style={styles.input}
            maxLength={6}
          />

          {/* ── Address Type ── */}
          <select
            name="type"
            value={address.type}
            onChange={handleAddressChange}
            style={styles.select}
          >
            <option value="Home">🏠 Home</option>
            <option value="Office">🏢 Office</option>
            <option value="Other">📍 Other</option>
          </select>

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "30px 16px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  subtitle: {
    color: "#777",
    fontSize: "14px",
    marginBottom: "20px",
  },
  sectionLabel: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: "13px",
    color: "#667eea",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "10px",
    marginTop: "6px",
    borderBottom: "1px solid #eee",
    paddingBottom: "6px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
  },
  select: {
    padding: "10px 12px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
    background: "#fff",
    cursor: "pointer",
  },
  button: {
    padding: "11px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "14px",
  },
  linkText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "bold",
  },
};