// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Success() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state) {
//     return (
//       <div style={{ textAlign: "center", padding: "50px" }}>
//         <h2>No Payment Data Found ❌</h2>
//         <button onClick={() => navigate("/")}>Go Home</button>
//       </div>
//     );
//   }

//   const {
//     paymentId,
//     orderId,
//     items = [],
//     total = 0,
//     address = {}
//   } = state;

//   return (
//     <div style={{ padding: "30px", maxWidth: "650px", margin: "auto" }}>
      
//       <h1 style={{ color: "green" }}>🎉 Payment Successful</h1>

//       <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>

//         <h3>📄 Receipt</h3>

//         <p><b>Payment ID:</b> {paymentId}</p>
//         <p><b>Order ID:</b> {orderId}</p>
//         <p><b>Total Paid:</b> ₹{total}</p>

//         <hr />

//         <h3>📦 Items</h3>
//         {items.length > 0 ? (
//           items.map((item, i) => (
//             <div key={i} style={{ marginBottom: "10px" }}>
//               <p><b>{item.name}</b></p>
//               <p>₹{item.monthlyRent} × {item.tenure?.months}</p>
//             </div>
//           ))
//         ) : (
//           <p>No items found</p>
//         )}

//         <hr />

//         <h3>🏠 Address</h3>
//         <p>
//           {address.name} <br />
//           {address.phone} <br />
//           {address.address}
//         </p>

//         <div style={{ marginTop: "20px" }}>
//           <button onClick={() => window.print()} style={{ marginRight: "10px" }}>
//             🧾 Print Receipt
//           </button>

//           <button onClick={() => navigate("/home")}>
//             🏠 Go Home
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Success;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "680px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#10b981",
    padding: "32px 24px",
    textAlign: "center",
    color: "#ffffff",
  },
  successIcon: {
    fontSize: "48px",
    marginBottom: "12px",
  },
  headerTitle: {
    fontSize: "28px",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },
  headerSubtitle: {
    fontSize: "14px",
    opacity: "0.9",
    margin: "0",
  },
  content: {
    padding: "32px",
  },
  section: {
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "1px solid #e5e7eb",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f3f4f6",
  },
  infoLabel: {
    fontWeight: "500",
    color: "#6b7280",
  },
  infoValue: {
    fontWeight: "500",
    color: "#1f2937",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 0",
    marginTop: "8px",
    borderTop: "2px solid #e5e7eb",
    fontWeight: "600",
    fontSize: "18px",
  },
  itemCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
  },
  itemName: {
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "8px",
  },
  itemDetails: {
    color: "#6b7280",
    fontSize: "14px",
  },
  addressCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "16px",
    lineHeight: "1.6",
    color: "#374151",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  buttonPrimary: {
    flex: "1",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  buttonSecondary: {
    flex: "1",
    backgroundColor: "#ffffff",
    color: "#374151",
    border: "1px solid #d1d5db",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  errorContainer: {
    textAlign: "center",
    padding: "60px 20px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  errorIcon: {
    fontSize: "64px",
    marginBottom: "24px",
  },
  errorTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#dc2626",
    marginBottom: "16px",
  },
  errorButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    padding: "12px 32px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "24px",
  },
};

function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>❌</div>
        <h2 style={styles.errorTitle}>No Payment Data Found</h2>
        <p style={{ color: "#6b7280" }}>We couldn't find any payment information.</p>
        <button onClick={() => navigate("/")} style={styles.errorButton}>
          Return to Home
        </button>
      </div>
    );
  }

  const { paymentId, orderId, items = [], total = 0, address = {} } = state;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.successIcon}>🎉</div>
          <h1 style={styles.headerTitle}>Payment Successful</h1>
          <p style={styles.headerSubtitle}>Thank you for your purchase</p>
        </div>

        <div style={styles.content}>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>📄</span> Receipt Details
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Payment ID</span>
              <span style={styles.infoValue}>{paymentId}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Order ID</span>
              <span style={styles.infoValue}>{orderId}</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total Paid</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>📦</span> Order Items
            </div>
            {items.length > 0 ? (
              items.map((item, i) => (
                <div key={i} style={styles.itemCard}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemDetails}>
                    ₹{item.monthlyRent?.toLocaleString()} × {item.tenure?.months} months
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px" }}>
                No items in this order
              </p>
            )}
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>🏠</span> Shipping Address
            </div>
            <div style={styles.addressCard}>
              <strong>{address.name}</strong>
              <br />
              {address.phone}
              <br />
              {address.address}
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={() => window.print()}
              style={styles.buttonSecondary}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
              🧾 Print Receipt
            </button>
            <button
              onClick={() => navigate("/home")}
              style={styles.buttonPrimary}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#10b981")}
            >
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;