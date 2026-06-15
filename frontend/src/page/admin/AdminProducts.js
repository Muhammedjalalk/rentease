
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const token = localStorage.getItem("token");

  // 🔹 Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔴 DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token }
      });

      alert("❌ Product Deleted");
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // 🟡 UPDATE PRODUCT
  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        editProduct,
        {
          headers: { Authorization: token }
        }
      );

      alert("✅ Product Updated");
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>All Products</h2>

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
            position: "relative"
          }}
        >
          {/* 🔥 OFFER BADGE */}
          {p.offer?.isActive && (
            <span style={styles.badge}>
              {p.offer.text || `${p.offer.discountPercent}% OFF`}
            </span>
          )}

          <h3>{p.name}</h3>
          <p>{p.description}</p>

          {/* 🔥 MULTIPLE IMAGES */}
          <div>
            {p.images?.map((img, i) => (
              <img key={i} src={img} alt="" width="100" />
            ))}
          </div>

          <p>₹{p.monthlyRent}</p>

          <button onClick={() => setEditProduct(p)}>✏️ Update</button>
          <button onClick={() => deleteProduct(p._id)}>❌ Delete</button>
        </div>
      ))}

      {/* ✏️ UPDATE FORM */}
      {editProduct && (
        <div style={{ marginTop: 20 }}>
          <h3>Edit Product</h3>

          {/* NAME */}
          <input
            placeholder="Name"
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
          />
          <br /><br />

          {/* RENT */}
          <input
            placeholder="Monthly Rent"
            value={editProduct.monthlyRent}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                monthlyRent: e.target.value
              })
            }
          />
          <br /><br />

          {/* 🔥 OFFER TOGGLE */}
          <label>
            <input
              type="checkbox"
              checked={editProduct.offer?.isActive || false}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  offer: {
                    ...editProduct.offer,
                    isActive: e.target.checked
                  }
                })
              }
            />
            Enable Offer
          </label>
          <br /><br />

          {/* OFFER TEXT */}
          <input
            placeholder="Offer Text (Example: 20% OFF)"
            value={editProduct.offer?.text || ""}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                offer: {
                  ...editProduct.offer,
                  text: e.target.value
                }
              })
            }
          />
          <br /><br />

          {/* DISCOUNT */}
          <input
            placeholder="Discount %"
            type="number"
            value={editProduct.offer?.discountPercent || 0}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                offer: {
                  ...editProduct.offer,
                  discountPercent: e.target.value
                }
              })
            }
          />
          <br /><br />

          <button onClick={updateProduct}>Save</button>
          <button onClick={() => setEditProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;


// 🎨 STYLE
const styles = {
  badge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "red",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px"
  }
};