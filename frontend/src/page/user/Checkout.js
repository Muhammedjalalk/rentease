// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: ""
//   });
//   const [addresses, setAddresses] = useState([]);
// const [selectedAddress, setSelectedAddress] = useState(null);

//   // ✅ Load data (cart OR rent now)
//  // ✅ FIRST useEffect (keep this)
// useEffect(() => {
//   if (location.state?.product) {
//     const { product, tenure } = location.state;

//     setItems([
//       {
//         productId: product._id,
//         name: product.name,
//         monthlyRent: tenure.price,
//         tenure: tenure,
//         deposit: product.deposit,
//         image: product.images?.[0]
//       }
//     ]);
//   } else {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     setItems(cart);
//   }
// }, [location.state]);

// // ✅ SECOND useEffect (MOVE HERE)
// useEffect(() => {
//   fetch("http://localhost:5000/api/user/address", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     }
//   })
//     .then(res => res.json())
//     .then(data => {
//        console.log("ADDRESS DATA:", data);
//       setAddresses(data);

//       const def = data.find(a => a.isDefault);
//       if (def) setSelectedAddress(def);
//     })
//     .catch(err => console.log(err));
// }, []);

//   // ✅ Handle input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//   useEffect(() => {
//   if (selectedAddress) {
//     setForm({
//       name: selectedAddress.name,
//       phone: selectedAddress.phone,
//       address: `${selectedAddress.line1}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`
//     });
//   }
// }, [selectedAddress]);
// useEffect(() => {
//   const saved = JSON.parse(localStorage.getItem("lastAddress"));
//   if (saved) {
//     setForm(saved);
//   }
// }, []);

//   // ✅ Total calculation
//   const getTotal = () => {
//     return items.reduce((total, item) => {
//       return total + (item.monthlyRent * item.tenure.months) + item.deposit;
//     }, 0);
//   };

//   // ✅ Place Order
// // ✅ Place Order (UPDATED - Backend Connected)
// const handleOrder = async () => {
//   if (!form.name || !form.phone || !form.address) {
//     alert("Please fill all details");
//     return;
//   }

//   const orderData = {
//     items,
//     customer: form,
//     total: getTotal()
//   };

//   try {
//     const res = await fetch("http://localhost:5000/api/order/create", {
//       method: "POST",
//      headers: {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${localStorage.getItem("token")}`
// },
//       body: JSON.stringify(orderData)
//     });

//     const data = await res.json();

//     console.log("ORDER SAVED:", data);

//     // ✅ SAVE ADDRESS ALSO (keep this)
//     localStorage.setItem("lastAddress", JSON.stringify(form));

//     alert("Order placed successfully ✅");

//     localStorage.removeItem("cart");
//     navigate("/");

//   } catch (err) {
//     console.log(err);
//     alert("Order failed ❌");
//   }
// };
//  const handlePayment = async () => {

//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login first ❌");
//     navigate("/login");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:5000/api/payment/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ amount: getTotal() })
//     });

//     const data = await res.json();

//     const options = {
//       key: "rzp_test_SkWMPfd8DcTaLl",
//       amount: data.amount,
//       currency: data.currency,
//       order_id: data.id,
//       handler: function (response) {
//         alert("Payment Successful ✅");
//         console.log(response);
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (err) {
//     console.log(err);
//     alert("Payment failed ❌");
//   }
// };


//   const res = await fetch("http://localhost:5000/api/payment/create", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("token")}`
//   },
//   body: JSON.stringify({ amount: getTotal() })
// });

// // 🔍 DEBUG RESPONSE
// const text = await res.text();
// console.log("PAYMENT RESPONSE:", text);

// let data;
// try {
//   data = JSON.parse(text);
// } catch {
//   alert("Backend error: " + text);
//   return;
// }

//   const options = {
//    key: "rzp_test_xxxxxxxx",
//     amount: data.amount,
//     currency: "INR",
//     order_id: data.id,
//     handler: function (response) {
//       alert("Payment Successful ✅");
//     }
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.open();
// };
//   return (
//   <div style={styles.page}>
//     <h2>🧾 Checkout</h2>

//     <div style={styles.container}>

//       {/* LEFT - ITEMS */}
//       <div style={styles.items}>
//         <h3>Order Items</h3>

//         {items.map((item, index) => (
//           <div key={index} style={styles.card}>
//             <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              
//               <img
//                 src={
//                   item.image
//                     ? `http://localhost:5000/uploads/${item.image}`
//                     : "https://via.placeholder.com/80"
//                 }
//                 alt={item.name}
//                 style={{ width: "80px", height: "80px", borderRadius: "8px" }}
//               />

//               <div>
//                 <h4>{item.name}</h4>
//                 <p>₹{item.monthlyRent}/month</p>
//                 <p>{item.tenure?.months} months</p>
//               </div>
//             </div>

//             <p>Deposit: ₹{item.deposit}</p>

//             <p>
//               Subtotal: ₹
//               {item.monthlyRent * item.tenure?.months + item.deposit}
//             </p>
//           </div>
//         ))}

//       </div> {/* ✅ CLOSE LEFT SIDE */}

//       {/* RIGHT - FORM */}
//       <div style={styles.summary}>
//         <h3>Customer Details</h3>
//         <h3>Select Address</h3>

// {addresses.map(addr => (
//   <div
//     key={addr._id}
//     onClick={() => setSelectedAddress(addr)}
//     style={{
//       border: "1px solid #ccc",
//       padding: 10,
//       marginBottom: 10,
//       cursor: "pointer"
//     }}
//   >
//     <p><b>{addr.type}</b> {addr.isDefault && "⭐"}</p>
//     <p>{addr.name} - {addr.phone}</p>
//     <p>{addr.line1}, {addr.city}</p>
//   </div>
// ))}

// <button onClick={() => navigate("/profile")}>
//   + Add New Address
// </button>

//         <input
//   name="name"
//   value={form.name}
//   onChange={handleChange}
//   style={styles.input}
// />

//         <input
//   name="phone"
//   value={form.phone}   // ✅ add this
//   onChange={handleChange}
// />

// <textarea
//   name="address"
//   value={form.address} // ✅ add this
//   onChange={handleChange}
// />

//         <h3>Total: ₹{getTotal()}</h3>

//         <button style={styles.btn} onClick={handlePayment}>
//   Pay Now 💳
// </button>
//       </div>

//     </div> {/* ✅ CLOSE CONTAINER */}

//   </div>
// );
// }
// export default Checkout;

// // ================= STYLES =================
// const styles = {
//   page: { padding: 20, maxWidth: 1000, margin: "auto" },

//   container: { display: "flex", gap: 20 },

//   items: { flex: 2 },

//   card: {
//     padding: 10,
//     border: "1px solid #ddd",
//     marginBottom: 10,
//     borderRadius: 8
//   },

//   summary: {
//     flex: 1,
//     padding: 15,
//     border: "1px solid #ddd",
//     borderRadius: 8
//   },

//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10
//   },

//   btn: {
//     width: "100%",
//     padding: 12,
//     background: "green",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer"
//   }
// };

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: ""
//   });

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   // ================= LOAD ITEMS =================
//   useEffect(() => {
//     if (location.state?.product) {
//       const { product, tenure } = location.state;

//       setItems([
//         {
//           productId: product._id,
//           name: product.name,
//           monthlyRent: tenure.price,
//           tenure: tenure,
//           deposit: product.deposit,
//           image: product.images?.[0]
//         }
//       ]);
//     } else {
//       const cart = JSON.parse(localStorage.getItem("cart")) || [];
//       setItems(cart);
//     }
//   }, [location.state]);

//   // ================= LOAD ADDRESS =================
//   useEffect(() => {
//     fetch("http://localhost:5000/api/user/address", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setAddresses(data);

//         const def = data.find((a) => a.isDefault);
//         if (def) setSelectedAddress(def);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   // ================= AUTO FILL =================
//   useEffect(() => {
//     if (selectedAddress) {
//       setForm({
//         name: selectedAddress.name,
//         phone: selectedAddress.phone,
//         address: `${selectedAddress.line1}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`
//       });
//     }
//   }, [selectedAddress]);

//   // ================= INPUT =================
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ================= TOTAL =================
//   const getTotal = () => {
//     return items.reduce((total, item) => {
//       return total + item.monthlyRent * item.tenure.months + item.deposit;
//     }, 0);
//   };

//   // ================= ORDER (OPTIONAL) =================
//   const handleOrder = async () => {
//     try {
//       await fetch("http://localhost:5000/api/order/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         },
//         body: JSON.stringify({
//           items,
//           customer: form,
//           total: getTotal()
//         })
//       });

//       localStorage.setItem("lastAddress", JSON.stringify(form));
//       localStorage.removeItem("cart");

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= PAYMENT =================
//   const handlePayment = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first ❌");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/payment/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ amount: getTotal() })
//       });

//       const data = await res.json();

//       const options = {
//         key: "rzp_test_SkWMPfd8DcTaLl",
//         amount: data.amount,
//         currency: data.currency,
//         order_id: data.id,
//         handler: async function (response) {
//           alert("Payment Successful ✅");
//           console.log(response);

//           await handleOrder(); // save order after payment
//           navigate("/");
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.log(err);
//       alert("Payment failed ❌");
//     }
//   };

//   // ================= UI =================
//   return (
//     <div style={styles.page}>
//       <h2>🧾 Checkout</h2>

//       <div style={styles.container}>
//         {/* LEFT */}
//         <div style={styles.items}>
//           <h3>Order Items</h3>

//           {items.map((item, index) => (
//             <div key={index} style={styles.card}>
//               <img
//                 src={
//                   item.image
//                     ? `http://localhost:5000/uploads/${item.image}`
//                     : "https://via.placeholder.com/80"
//                 }
//                 alt={item.name}
//                 style={{ width: "80px", height: "80px" }}
//               />

//               <h4>{item.name}</h4>
//               <p>₹{item.monthlyRent}/month</p>
//               <p>{item.tenure?.months} months</p>
//               <p>Deposit: ₹{item.deposit}</p>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT */}
//         <div style={styles.summary}>
//           <h3>Select Address</h3>

//           {addresses.map((addr) => (
//             <div
//               key={addr._id}
//               onClick={() => setSelectedAddress(addr)}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: 10,
//                 marginBottom: 10,
//                 cursor: "pointer"
//               }}
//             >
//               <p>
//                 <b>{addr.type}</b> {addr.isDefault && "⭐"}
//               </p>
//               <p>{addr.name}</p>
//               <p>{addr.phone}</p>
//             </div>
//           ))}

//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Name"
//             style={styles.input}
//           />

//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             style={styles.input}
//           />

//           <textarea
//             name="address"
//             value={form.address}
//             onChange={handleChange}
//             placeholder="Address"
//             style={styles.input}
//           />

//           <h3>Total: ₹{getTotal()}</h3>

//           <button style={styles.btn} onClick={handlePayment}>
//             Pay Now 💳
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;

// // ================= STYLES =================
// const styles = {
//   page: { padding: 20, maxWidth: 1000, margin: "auto" },
//   container: { display: "flex", gap: 20 },
//   items: { flex: 2 },
//   summary: { flex: 1, padding: 15, border: "1px solid #ddd" },
//   card: { padding: 10, border: "1px solid #ddd", marginBottom: 10 },
//   input: { width: "100%", padding: 10, marginBottom: 10 },
//   btn: {
//     width: "100%",
//     padding: 12,
//     background: "green",
//     color: "#fff",
//     border: "none"
//   }
// };

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Checkout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: ""
//   });

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   // ================= LOAD ITEMS =================
//   useEffect(() => {
//     if (location.state?.product) {
//       const { product, tenure } = location.state;

//       setItems([
//         {
//           productId: product._id,
//           name: product.name,
//           monthlyRent: tenure.price,
//           tenure: tenure,
//           deposit: product.deposit,
//           image: product.images?.[0]
//         }
//       ]);
//     } else {
//       const cart = JSON.parse(localStorage.getItem("cart")) || [];
//       setItems(cart);
//     }
//   }, [location.state]);

//   // ================= LOAD LAST USED ADDRESS (FAST) =================
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("lastAddress"));

//     if (saved) {
//       setForm(saved); // instant auto-fill
//     }
//   }, []);

//   // ================= LOAD ADDRESSES FROM API =================
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/user/address", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         });

//         const data = await res.json();
//         console.log("API DATA:", data);

//         if (Array.isArray(data)) {
//           setAddresses(data);

//           if (data.length > 0) {
//             const def = data.find(
//               (a) =>
//                 a.isDefault === true ||
//                 a.isDefault === "true" ||
//                 a.isDefault === 1
//             );

//             setSelectedAddress(def || data[0]);
//           }
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchAddresses();
//   }, []);

//   // ================= AUTO FILL FROM SELECTED ADDRESS =================
//   useEffect(() => {
//     if (!selectedAddress) return;

//     setForm({
//       name: selectedAddress.name || "",
//       phone: selectedAddress.phone || "",
//       address: `${selectedAddress.line1 || ""}, ${selectedAddress.city || ""}, ${selectedAddress.state || ""} - ${selectedAddress.pincode || ""}`
//     });
//   }, [selectedAddress]);

//   // ================= HANDLE INPUT =================
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ================= TOTAL =================
//   const getTotal = () => {
//     return items.reduce(
//       (total, item) =>
//         total + item.monthlyRent * item.tenure.months + item.deposit,
//       0
//     );
//   };

//   // ================= PAYMENT =================
//   const handlePayment = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first ❌");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/payment/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ amount: getTotal() })
//       });

//       const data = await res.json();

//       const options = {
//         key: "rzp_test_SkWMPfd8DcTaLl",
//         amount: data.amount,
//         currency: data.currency,
//         order_id: data.id,
//         handler: function (response) {
//           alert("Payment Successful ✅");

//           // ✅ SAVE LAST USED ADDRESS
//           localStorage.setItem("lastAddress", JSON.stringify(form));

//           localStorage.removeItem("cart");
//           navigate("/");
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.log(err);
//       alert("Payment failed ❌");
//     }
//   };

//   // ================= UI =================
//   return (
//     <div style={styles.page}>
//       <h2>🧾 Checkout</h2>

//       <div style={styles.container}>
//         {/* LEFT */}
//         <div style={styles.items}>
//           <h3>Order Items</h3>

//           {items.map((item, index) => (
//             <div key={index} style={styles.card}>
//               <img
//                 src={
//                   item.image
//                     ? `http://localhost:5000/uploads/${item.image}`
//                     : "https://via.placeholder.com/80"
//                 }
//                 alt={item.name}
//                 style={{ width: 80, height: 80, borderRadius: 8 }}
//               />

//               <div>
//                 <h4>{item.name}</h4>
//                 <p>₹{item.monthlyRent}/month</p>
//                 <p>{item.tenure?.months} months</p>
//                 <p>Deposit: ₹{item.deposit}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT */}
//         <div style={styles.summary}>
//           <h3>Select Address</h3>

//           {addresses.length === 0 && (
//             <p style={{ color: "red" }}>
//               No address found. Please add one.
//             </p>
//           )}

//           {addresses.map((addr, index) => (
//             <div
//               key={addr._id || index}
//               onClick={() => setSelectedAddress(addr)}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: 10,
//                 marginBottom: 10,
//                 cursor: "pointer",
//                 background:
//                   selectedAddress?._id === addr._id
//                     ? "#e6f7ff"
//                     : "#fff"
//               }}
//             >
//               <p>
//                 <b>{addr.type}</b> {addr.isDefault && "⭐"}
//               </p>
//               <p>
//                 {addr.name} - {addr.phone}
//               </p>
//               <p>
//                 {addr.line1}, {addr.city}
//               </p>
//             </div>
//           ))}

//           <button onClick={() => navigate("/profile")}>
//             + Add New Address
//           </button>

//           <h3>Customer Details</h3>

//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Name"
//             style={styles.input}
//           />

//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             style={styles.input}
//           />

//           <textarea
//             name="address"
//             value={form.address}
//             onChange={handleChange}
//             placeholder="Address"
//             style={styles.input}
//           />

//           <h3>Total: ₹{getTotal()}</h3>

//           <button style={styles.btn} onClick={handlePayment}>
//             Pay Now 💳
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;

// // ================= STYLES =================
// const styles = {
//   page: { padding: 20, maxWidth: 1000, margin: "auto" },
//   container: { display: "flex", gap: 20 },
//   items: { flex: 2 },
//   summary: { flex: 1 },
//   card: {
//     display: "flex",
//     gap: 10,
//     border: "1px solid #ddd",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10
//   },
//   btn: {
//     width: "100%",
//     padding: 12,
//     background: "green",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer"
//   }
// };

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // ================= LOAD ITEMS =================
  useEffect(() => {
    if (location.state?.product) {
      const { product, tenure } = location.state;

      setItems([
        {
          productId: product._id,
          name: product.name,
          monthlyRent: tenure.price,
          tenure: tenure,
          deposit: product.deposit,
          image: product.images?.[0]
        }
      ]);
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

const updated = cart.map(item => ({
  ...item,
  quantity: item.quantity || 1
}));

setItems(updated);
    }
  }, [location.state]);

  // ================= LOAD LAST USED ADDRESS =================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lastAddress"));
    if (saved) setForm(saved);
  }, []);

  // ================= LOAD ADDRESSES =================
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/address", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setAddresses(data);

          if (data.length > 0) {
            const def = data.find(
              (a) =>
                a.isDefault === true ||
                a.isDefault === "true" ||
                a.isDefault === 1
            );

            setSelectedAddress(def || data[0]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAddresses();
  }, []);

  // ================= AUTO FILL =================
  useEffect(() => {
    if (!selectedAddress) return;

    setForm({
      name: selectedAddress.name || "",
      phone: selectedAddress.phone || "",
      address: `${selectedAddress.line1 || ""}, ${selectedAddress.city || ""}, ${selectedAddress.state || ""} - ${selectedAddress.pincode || ""}`
    });
  }, [selectedAddress]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= TOTAL =================
 const getTotal = () => {
  return items.reduce((total, item) => {
    return (
      total +
      (
        Number(item.monthlyRent || 0) *
        Number(item.tenure?.months || 0) +
        Number(item.deposit || 0)
      ) *
      Number(item.quantity || 1)
    );
  }, 0);
};

  // ================= PAYMENT =================
  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first ❌");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount: getTotal() })
      });

      const data = await res.json();

      const options = {
        key: "rzp_test_Sl6tA4pv1Af8AO",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        handler: async function (response) {
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            items,
            total: getTotal(),
            address: form
          };

          await fetch("http://localhost:5000/api/payment/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(paymentData)
          });

          // ✅ FIXED CART HANDLING (IMPORTANT)
          localStorage.removeItem("cart");
          setItems([]);

          localStorage.setItem("lastAddress", JSON.stringify(form));

          navigate("/success", { state: paymentData });
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      alert("Payment failed ❌");
    }
  };

  // ================= UI =================
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        
        {/* LEFT */}
        <div style={styles.leftColumn}>
          <div style={styles.card}>
            <h2 style={styles.headerTitle}>Order Items</h2>

            {items.length === 0 && (
              <p style={styles.emptyText}>Your cart is empty.</p>
            )}

            {items.map((item, index) => (
              <div key={index} style={styles.itemRow}>
                <img
                  src={
                    item.image
                      ? `http://localhost:5000/uploads/${item.image}`
                      : "https://via.placeholder.com/150"
                  }
                  style={styles.itemImage}
                />
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <span>₹{item.monthlyRent}/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.rightColumn}>
          <div style={styles.card}>
            <h3>Delivery Address</h3>

            {addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                style={{
                  padding: 10,
                  border:
                    selectedAddress?._id === addr._id
                      ? "2px solid green"
                      : "1px solid #ddd",
                  marginBottom: 10,
                  cursor: "pointer"
                }}
              >
                {addr.name} - {addr.city}
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <h3>Total: ₹{getTotal()}</h3>

            <button style={styles.payBtn} onClick={handlePayment}>
              Pay Now 💳
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

// ================= MODERN STYLES (FIGMA STYLE) =================
const styles = {
  // Page Layout
  body: {
    backgroundColor: "#f8f9fa", // Light gray background to make white cards pop
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: "#333",
    minHeight: "100vh",
    padding: "40px 20px",
    boxSizing: "border-box"
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    gap: "32px",
    flexWrap: "wrap" // Allows wrapping on smaller screens
  },
  
  // Columns
  leftColumn: {
    flex: 2, // Takes up more space
    minWidth: "300px"
  },
  rightColumn: {
    flex: 1.2,
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },

  // Card Styling (White Boxes)
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", // Soft, diffused shadow
    padding: "32px",
    marginBottom: "20px",
    border: "1px solid #f0f0f0"
  },

  // Typography
  headerTitle: {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 24px 0",
    color: "#1a1a1a"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    color: "#1a1a1a"
  },
  emptyText: {
    color: "#888",
    fontStyle: "italic"
  },

  // Order Item Styles
  itemRow: {
    display: "flex",
    gap: "20px",
    padding: "16px",
    borderBottom: "1px solid #f0f0f0",
    alignItems: "center"
  },
  itemImage: {
    width: "100px",
    height: "100px",
    borderRadius: "12px",
    objectFit: "cover",
    backgroundColor: "#f4f4f4"
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    margin: "0 0 8px 0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#2d3436"
  },
  itemMeta: {
    display: "flex",
    gap: "12px",
    marginBottom: "8px"
  },
  priceTag: {
    fontWeight: "600",
    color: "#27ae60"
  },
  tenureTag: {
    color: "#636e72",
    fontSize: "14px"
  },
  depositRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginTop: "8px",
    paddingTop: "8px",
    borderTop: "1px dashed #e0e0e0"
  },
  label: {
    color: "#636e72"
  },
  depositValue: {
    fontWeight: "600",
    color: "#2d3436"
  },

  // Address Styles
  sectionHeader: {
    marginBottom: "20px"
  },
  addressList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  addressCard: {
    border: "2px solid transparent",
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#fff"
  },
  addressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  addressType: {
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: "12px",
    letterSpacing: "0.5px",
    color: "#636e72"
  },
  badge: {
    background: "#ffeaa7",
    color: "#d35400",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 6px",
    borderRadius: "4px",
    textTransform: "uppercase"
  },
  addressText: {
    margin: "0",
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#2d3436"
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#0984e3",
    fontWeight: "600",
    cursor: "pointer",
    padding: "10px 0",
    fontSize: "14px",
    width: "100%",
    textAlign: "left"
  },
  noAddress: {
    textAlign: "center",
    padding: "20px",
    color: "#b2bec3"
  },
  primaryBtnSmall: {
    marginTop: "10px",
    padding: "8px 16px",
    background: "#0984e3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500"
  },

  // Form Styles
  divider: {
    height: "1px",
    background: "#f0f0f0",
    margin: "24px 0"
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "16px",
    border: "1px solid #dfe6e9",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    outline: "none"
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #dfe6e9",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    resize: "vertical",
    outline: "none",
    marginBottom: "10px"
  },
  // Note: In a real app, we'd add :focus style via className or styled-components.
  // Since we use inline styles, we rely on default browser focus or accept the limitation.

  // Payment Summary Styles
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#636e72"
  },
  totalValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#2d3436"
  },
  payBtn: {
    width: "100%",
    padding: "16px",
    background: "#27ae60", // Modern Green
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(39, 174, 96, 0.3)",
    transition: "transform 0.1s ease"
  },
  secureText: {
    textAlign: "center",
    marginTop: "12px",
    fontSize: "12px",
    color: "#b2bec3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
  }
};