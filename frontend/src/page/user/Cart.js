

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];

const updated = data.map(item => ({
  ...item,
  quantity: item.quantity || 1
}));

setCart(updated);
  }, []);

  // ✅ Remove item
 // ✅ Remove item
const handleRemove = (id, months) => {
  const updated = cart.filter(
    item => !(item.productId === id && item.tenure.months === months)
  );
  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

// ✅ ADD HERE 👇 (exact position)
const updateQuantity = (id, months, change) => {
  const updated = cart.map(item => {
    if (item.productId === id && item.tenure.months === months) {
      const newQty = (item.quantity || 1) + change;
      return { ...item, quantity: newQty < 1 ? 1 : newQty };
    }
    return item;
  });

  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

  // ✅ Total
  const getTotal = () => {
  return cart.reduce((total, item) => {
    return total + (
      (item.monthlyRent * item.tenure.months + item.deposit) 
      * (item.quantity || 1)
    );
  }, 0);
};

  return (
  <div style={styles.page}>
    
    {/* HEADER */}
    <div style={styles.header}>
      <h2 style={styles.title}>🛒 My Cart</h2>
      <button style={styles.backBtn} onClick={() => navigate("/")}>
        ← Continue Shopping
      </button>
    </div>

    {/* EMPTY STATE */}
    {cart.length === 0 ? (
      <div style={styles.emptyBox}>
        <h3>Your cart is empty</h3>
        <p>Add some products to continue</p>
        <button onClick={() => navigate("/")} style={styles.shopBtn}>
          Browse Products
        </button>
      </div>
    ) : (
      <div style={styles.layout}>

        {/* CART ITEMS */}
        <div style={styles.list}>
          {cart.map((item) => (
            <div key={item.productId} style={styles.card}>

              <img
                src={
                  item.image
                    ? `http://localhost:5000/uploads/${item.image}`
                    : "https://via.placeholder.com/120"
                }
                alt={item.name}
                style={styles.image}
              />

              <div style={styles.details}>
                <div style={{ marginTop: "8px" }}>
  <button onClick={() => updateQuantity(item.productId, item.tenure.months, -1)}>-</button>

  <span style={{ margin: "0 10px" }}>
    {item.quantity || 1}
  </span>

  <button onClick={() => updateQuantity(item.productId, item.tenure.months, 1)}>+</button>
</div>
                <h3 style={styles.productName}>{item.name}</h3>

                <p style={styles.text}>₹{item.monthlyRent}/month</p>
               <p style={styles.text}>
  {item.tenure.months} months • ₹{item.monthlyRent}/month
</p>
                <span style={styles.badge}>Deposit ₹{item.deposit}</span>
              </div>

              <button
                style={styles.removeBtn}
               onClick={() => handleRemove(item.productId, item.tenure.months)}
              >
                
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div style={styles.summary}>
          <h3>Order Summary</h3>

          <div style={styles.summaryBox}>
            <p>Total Amount</p>
            <h2>₹{getTotal()}</h2>
          </div>

          <button
            style={styles.checkoutBtn}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>
        </div>

      </div>
    )}
  </div>
);
}

export default Cart;

const styles = {
  page: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  backBtn: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    background: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },

  emptyBox: {
    textAlign: "center",
    padding: "50px",
    background: "#f9f9f9",
    borderRadius: "12px",
  },

  shopBtn: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  layout: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },

  list: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  image: {
    width: "90px",
    height: "90px",
    borderRadius: "10px",
    objectFit: "cover",
  },

  details: {
    flex: 1,
  },

  productName: {
    margin: "0 0 5px 0",
  },

  text: {
    margin: "2px 0",
    color: "#555",
  },

  badge: {
    display: "inline-block",
    marginTop: "5px",
    padding: "4px 8px",
    fontSize: "12px",
    background: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "6px",
  },

  removeBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  summary: {
    flex: 1,
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    position: "sticky",
    top: "20px",
  },

  summaryBox: {
    margin: "15px 0",
    padding: "10px",
    background: "#f3f4f6",
    borderRadius: "8px",
  },

  checkoutBtn: {
    width: "100%",
    padding: "12px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};