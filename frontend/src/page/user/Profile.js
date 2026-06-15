// import React, { useEffect, useState } from "react";
// import API from "../../services/authService";
// import { useNavigate } from "react-router-dom";


// function Profile() {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     phone: ""
//   });
//   const [addressForm, setAddressForm] = useState({
//   name: "",
//   phone: "",
//   line1: "",
//   city: "",
//   state: "",
//   pincode: ""
// });



//   const [addresses, setAddresses] = useState([]);
//   const [avatar, setAvatar] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//   currentPassword: "",
//   newPassword: ""
// });



//   const navigate = useNavigate();

//   // 🔄 Fetch Profile
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await API.get("/auth/profile");
//       console.log("PROFILE DATA:", res.data); // debug
//       setUser(res.data);
// setAddresses(res.data.addresses || []);
//     } catch (err) {
//       console.log(err.response);
//       alert("❌ Failed to load profile");
//     }
//   };
// // ✏️ Handle Input
//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   // 💾 Update Profile
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       await API.put("/auth/profile", user);

//       alert("✅ Profile updated successfully");
//     } catch (err) {
//       console.log(err.response);
//       alert(err.response?.data?.message || "❌ Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

// const handleAvatarUpload = async () => {
//   if (!avatar) {
//     alert("Please select an image");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("avatar", avatar);

//   try {
//     await API.post("/users/avatar", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     });

//     alert("Avatar uploaded successfully");
//   } catch (err) {
//     console.log(err);
//     alert("Upload failed");
//   }
// };

// const handlePasswordChange = async () => {
//   try {
//     await API.put("/users/change-password", passwordData);

//     alert("✅ Password changed successfully");

//     setPasswordData({
//       currentPassword: "",
//       newPassword: ""
//     });
//   } catch (err) {
//     alert(err.response?.data?.message || "❌ Password change failed");
//   }
// };
// const handleAddAddress = async () => {
//   try {
//     await API.post("/users/address", addressForm);

//     alert("✅ Address Added");

//     fetchProfile();

//     setAddressForm({
//       name: "",
//       phone: "",
//       line1: "",
//       city: "",
//       state: "",
//       pincode: ""
//     });
//   } catch (err) {
//     alert("❌ Failed to add address");
//   }
// };
//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>👤 My Profile</h2>

//        <form onSubmit={handleUpdate}>
//   <input
//     name="name"
//     value={user.name}
//     onChange={handleChange}
//     placeholder="Name"
//     style={styles.input}
//   />

//   <input
//     name="email"
//     value={user.email}
//     onChange={handleChange}
//     placeholder="Email"
//     style={styles.input}
//   />
//   <h3>🔒 Change Password</h3>

// <input
//   type="password"
//   placeholder="Current Password"
//   value={passwordData.currentPassword}
//   onChange={(e) =>
//     setPasswordData({
//       ...passwordData,
//       currentPassword: e.target.value
//     })
//   }
//   style={styles.input}
// />

// <input
//   type="password"
//   placeholder="New Password"
//   value={passwordData.newPassword}
//   onChange={(e) =>
//     setPasswordData({
//       ...passwordData,
//       newPassword: e.target.value
//     })
//   }
//   style={styles.input}
// />

// <button
//   type="button"
//   onClick={handlePasswordChange}
//   style={styles.button}
// >
//   Change Password
// </button>

//   <input
//     name="phone"
//     value={user.phone || ""}
//     onChange={handleChange}
//     placeholder="Phone"
//     style={styles.input}
//   />
//   <h3>📍 Add Address</h3>

// <input
//   placeholder="Name"
//   value={addressForm.name}
//   onChange={(e) =>
//     setAddressForm({
//       ...addressForm,
//       name: e.target.value
//     })
//   }
//   style={styles.input}
// />

// <input
//   placeholder="Phone"
//   value={addressForm.phone}
//   onChange={(e) =>
//     setAddressForm({
//       ...addressForm,
//       phone: e.target.value
//     })
//   }
//   style={styles.input}
// />

// <input
//   placeholder="Address Line"
//   value={addressForm.line1}
//   onChange={(e) =>
//     setAddressForm({
//       ...addressForm,
//       line1: e.target.value
//     })
//   }
//   style={styles.input}
// />

// <input
//   placeholder="City"
//   value={addressForm.city}
//   onChange={(e) =>
//     setAddressForm({
//       ...addressForm,
//       city: e.target.value
//     })
//   }
//   style={styles.input}
// />

// <input
//   placeholder="State"
//   value={addressForm.state}
//   onChange={(e) =>
//     setAddressForm({
//       ...addressForm,
//       state: e.target.value
//     })
//   }
//   style={styles.input}
// />

// <input
//   placeholder="Pincode"
//   value={addressForm.pincode}
//   onChange={(e) =>
//     setAddressForm({
//       ...addressForm,
//       pincode: e.target.value
//     })
//   }
//   style={styles.input}
// />

// <button
//   type="button"
//   onClick={handleAddAddress}
//   style={styles.button}
// >
//   Add Address
// </button>
// <h3>My Addresses</h3>

// {addresses.map((addr, index) => (
//   <div
//     key={index}
//     style={{
//       border: "1px solid #ddd",
//       padding: "10px",
//       marginTop: "10px"
//     }}
//   >
//     <p><strong>{addr.name}</strong></p>
//     <p>{addr.phone}</p>
//     <p>{addr.line1}</p>
//     <p>{addr.city}, {addr.state}</p>
//     <p>{addr.pincode}</p>
//   </div>
// ))}

//   <h3>Profile Photo</h3>

//   <input
//     type="file"
//     onChange={(e) => setAvatar(e.target.files[0])}
//   />

//   <button
//     type="button"
//     onClick={handleAvatarUpload}
//     style={styles.button}
//   >
//     Upload Avatar
//   </button>

//   <br />
//   <br />

//   <button type="submit" style={styles.button}>
//     {loading ? "Updating..." : "Update Profile"}
//   </button>
// </form>

//         <button onClick={() => navigate("/home")} style={styles.backBtn}>
//           ⬅ Back
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Profile;

// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#f4f4f4"
//   },
//   card: {
//     background: "#fff",
//     padding: "30px",
//     borderRadius: "10px",
//     width: "320px",
//     textAlign: "center",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "15px",
//     borderRadius: "5px",
//     border: "1px solid #ccc"
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     background: "#667eea",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px"
//   },
//   backBtn: {
//     marginTop: "10px",
//     padding: "8px",
//     background: "#ccc",
//     border: "none",
//     borderRadius: "5px"
//   }
// };

import React, { useEffect, useState } from "react";
import API from "../../services/authService";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  // ─── Fetch Profile ────────────────────────────────────────────────────────
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      const { name, email, phone, addresses: addrs, avatar: av } = res.data;
      setUser({ name: name || "", email: email || "", phone: phone || "" });
      setAddresses(addrs || []);
      if (av) setAvatarPreview(av);
    } catch (err) {
      console.error(err.response);
      alert("❌ Failed to load profile");
    }
  };

  // ─── Update Profile ───────────────────────────────────────────────────────
  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user.name.trim() || !user.email.trim()) {
      alert("Name and email are required.");
      return;
    }
    try {
      setProfileLoading(true);
      // Send only profile fields — not addresses or other backend data
      await API.put("/auth/profile", {
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      alert("✅ Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Update failed");
    } finally {
      setProfileLoading(false);
    }
  };

  // ─── Change Password ──────────────────────────────────────────────────────
  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert("Please fill in both password fields.");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }
    try {
      setPasswordLoading(true);
      await API.put("/users/change-password", passwordData);
      alert("✅ Password changed successfully");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "❌ Password change failed");
    } finally {
      setPasswordLoading(false);
    }
  };

  // ─── Avatar Upload ────────────────────────────────────────────────────────
  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB.");
      return;
    }
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    if (!avatar) {
      alert("Please select an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", avatar);
    try {
      setAvatarLoading(true);
      await API.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Avatar uploaded successfully");
      setAvatar(null);
    } catch (err) {
      alert("❌ Upload failed");
    } finally {
      setAvatarLoading(false);
    }
  };

  // ─── Add Address ──────────────────────────────────────────────────────────
  const handleAddAddress = async () => {
    const { name, phone, line1, city, state, pincode } = addressForm;
    if (!name.trim() || !line1.trim() || !city.trim() || !pincode.trim()) {
      alert("Name, address line, city, and pincode are required.");
      return;
    }
    try {
      setAddressLoading(true);
      await API.post("/users/address", addressForm);
      alert("✅ Address added");
      fetchProfile();
      setAddressForm({
        name: "",
        phone: "",
        line1: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (err) {
      alert("❌ Failed to add address");
    } finally {
      setAddressLoading(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button onClick={() => navigate("/home")} style={styles.backBtn}>
          ← Back
        </button>

        <h2 style={styles.heading}>My Profile</h2>

        {/* ── Avatar ── */}
        <div style={styles.section}>
          <h3 style={styles.subheading}>Profile Photo</h3>
          {avatarPreview && (
            <img src={avatarPreview} alt="avatar" style={styles.avatarImg} />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarSelect}
            style={{ marginBottom: "10px" }}
          />
          <button
            onClick={handleAvatarUpload}
            style={styles.button}
            disabled={avatarLoading}
          >
            {avatarLoading ? "Uploading…" : "Upload Photo"}
          </button>
        </div>

        {/* ── Profile Info ── */}
        <div style={styles.section}>
          <h3 style={styles.subheading}>Personal Info</h3>
          <form onSubmit={handleUpdate}>
            <input
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Full Name"
              style={styles.input}
            />
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              style={styles.input}
            />
            <input
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Phone"
              style={styles.input}
            />
            <button
              type="submit"
              style={styles.button}
              disabled={profileLoading}
            >
              {profileLoading ? "Saving…" : "Save Changes"}
            </button>
          </form>
        </div>

        {/* ── Change Password ── */}
        <div style={styles.section}>
          <h3 style={styles.subheading}>Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, currentPassword: e.target.value })
            }
            style={styles.input}
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            style={styles.input}
          />
          <button
            onClick={handlePasswordChange}
            style={styles.button}
            disabled={passwordLoading}
          >
            {passwordLoading ? "Changing…" : "Change Password"}
          </button>
        </div>

        {/* ── Add Address ── */}
        <div style={styles.section}>
          <h3 style={styles.subheading}>Add Address</h3>
          {[
            { key: "name", ph: "Full Name" },
            { key: "phone", ph: "Phone" },
            { key: "line1", ph: "Address Line" },
            { key: "city", ph: "City" },
            { key: "state", ph: "State" },
            { key: "pincode", ph: "Pincode" },
          ].map(({ key, ph }) => (
            <input
              key={key}
              placeholder={ph}
              value={addressForm[key]}
              onChange={(e) =>
                setAddressForm({ ...addressForm, [key]: e.target.value })
              }
              style={styles.input}
            />
          ))}
          <button
            onClick={handleAddAddress}
            style={styles.button}
            disabled={addressLoading}
          >
            {addressLoading ? "Adding…" : "Add Address"}
          </button>
        </div>

        {/* ── Saved Addresses ── */}
        {addresses.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.subheading}>Saved Addresses</h3>
            {addresses.map((addr, index) => (
              <div key={addr._id || index} style={styles.addressCard}>
                <p style={{ fontWeight: "bold", margin: "0 0 4px" }}>
                  {addr.name}
                </p>
                <p style={styles.addrLine}>{addr.phone}</p>
                <p style={styles.addrLine}>{addr.line1}</p>
                <p style={styles.addrLine}>
                  {addr.city}, {addr.state} — {addr.pincode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "#f0f2f5",
    padding: "40px 16px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 20px",
    color: "#1a1a2e",
  },
  subheading: {
    fontSize: "15px",
    fontWeight: "600",
    margin: "0 0 12px",
    color: "#444",
  },
  section: {
    borderTop: "1px solid #eee",
    paddingTop: "20px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "11px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    opacity: 1,
  },
  backBtn: {
    padding: "6px 14px",
    background: "transparent",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    marginBottom: "16px",
    color: "#555",
  },
  avatarImg: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
    alignSelf: "center",
    border: "2px solid #667eea",
  },
  addressCard: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "10px",
    background: "#fafafa",
  },
  addrLine: {
    margin: "2px 0",
    fontSize: "13px",
    color: "#555",
  },
};