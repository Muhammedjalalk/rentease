
import React, { useEffect, useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    deposit: "",
    tenureOptions: [{ months: "", price: "" }],
    images: [],
    brand: "",
    color: "",
    material: "",
    dimensions: "",
    offer: {
      isActive: false,
      text: "",
      discountPercent: 0
    }
  });

  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  // ================= BASIC =================
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ================= TENURE (FIXED) =================
 const handleTenureChange = (index, field, value) => {
  const updated = [...product.tenureOptions];

  // convert safely
  const num = Number(value);

  // HARD BLOCK invalid values
  updated[index][field] =
    value === "" || !Number.isFinite(num) ? "" : num;

  setProduct({ ...product, tenureOptions: updated });
};

  const addTenure = () => {
    setProduct({
      ...product,
      tenureOptions: [...product.tenureOptions, { months: "", price: "" }]
    });
  };

  const removeTenure = (index) => {
    const updated = product.tenureOptions.filter((_, i) => i !== index);
    setProduct({ ...product, tenureOptions: updated });
  };

  // ================= OFFER =================
  const handleOfferChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      offer: {
        ...product.offer,
        [name]: type === "checkbox" ? checked : value
      }
    });
  };

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updated = [...product.images, ...files];

    if (updated.length > 4) return alert("Max 4 images");

    setProduct({ ...product, images: updated });
  };

  const removeImage = (index) => {
    const updated = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updated });
  };

  // ================= SUBMIT (FULL FIXED) =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 SAFE TENURE CLEANING (NO NaN ALLOWED)
    const cleanedTenure = product.tenureOptions
  .map((t) => ({
    months: Number(t.months),
    price: Number(t.price),
  }))
  .filter((t) =>
    typeof t.months === "number" &&
    typeof t.price === "number" &&
    Number.isFinite(t.months) &&
    Number.isFinite(t.price) &&
    t.months > 0 &&
    t.price > 0
  );

    if (!product.category) {
      return alert("Category is required");
    }

    if (cleanedTenure.length === 0) {
      return alert("Please add valid tenure options");
    }

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      if (key !== "images" && key !== "offer" && key !== "tenureOptions") {
        if (key === "deposit") {
          formData.append(key, Number(product[key]));
        } else {
          formData.append(key, product[key]);
        }
      }
    });

    formData.append("offer", JSON.stringify(product.offer));
    formData.append("tenureOptions", JSON.stringify(cleanedTenure));

    product.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      }
    });

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Product Updated");
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Product Added");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  // ================= RESET =================
  const resetForm = () => {
    setProduct({
      name: "",
      category: "",
      description: "",
      deposit: "",
      tenureOptions: [{ months: "", price: "" }],
      images: [],
      brand: "",
      color: "",
      material: "",
      dimensions: "",
      offer: {
        isActive: false,
        text: "",
        discountPercent: 0
      }
    });
  };

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete?")) return;

    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchProducts();
  };

  // ================= EDIT =================
  const editProduct = (p) => {
    setEditId(p._id);

    setProduct({
      name: p.name,
      category: p.category,
      description: p.description,
      deposit: p.deposit,
      tenureOptions: p.tenureOptions || [{ months: "", price: "" }],
      images: p.images || [],
      brand: p.specifications?.brand || "",
      color: p.specifications?.color || "",
      material: p.specifications?.material || "",
      dimensions: p.specifications?.dimensions || "",
      offer: {
        isActive: p.offer?.isActive || false,
        text: p.offer?.text || "",
        discountPercent: p.offer?.discountPercent || 0
      }
    });
  };

  return (
    <div style={styles.page}>
      <h2>{editId ? "✏️ Update Product" : "➕ Add Product"}</h2>

      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} style={styles.input} />

            <select name="category" value={product.category} onChange={handleChange} style={styles.input}>
              <option value="">Category</option>
              <option value="Furniture">Furniture</option>
              <option value="Appliance">Appliance</option>
            </select>

            <input name="deposit" placeholder="Deposit" value={product.deposit} onChange={handleChange} style={styles.input} />
          </div>
          

          <h4>📅 Tenure Pricing</h4>

          {product.tenureOptions.map((t, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="number"
                placeholder="Months"
                value={t.months}
                onChange={(e) => handleTenureChange(index, "months", e.target.value)}
                style={styles.input}
              />

              <input
                type="number"
                placeholder="Price / month"
                value={t.price}
                onChange={(e) => handleTenureChange(index, "price", e.target.value)}
                style={styles.input}
              />

              <button type="button" onClick={() => removeTenure(index)}>❌</button>
            </div>
          ))}

          <button type="button" onClick={addTenure}>➕ Add Tenure</button>

          <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} style={styles.textarea} />

          <h4>🔥 Offer</h4>
          <label>
            <input type="checkbox" name="isActive" checked={product.offer.isActive} onChange={handleOfferChange} />
            Enable Offer
          </label>

          <input name="text" placeholder="Offer text" value={product.offer.text} onChange={handleOfferChange} style={styles.input} />
          <input type="number" name="discountPercent" placeholder="Discount %" value={product.offer.discountPercent} onChange={handleOfferChange} style={styles.input} />

          <input type="file" multiple onChange={handleImageChange} />

          <div style={styles.preview}>
            {product.images.map((img, i) => (
              <div key={i} style={styles.previewBox}>
                <img
                  src={
                    typeof img === "string"
                      ? `http://localhost:5000/uploads/${img}`
                      : URL.createObjectURL(img)
                  }
                  style={styles.previewImg}
                  alt=""
                />
                <button type="button" onClick={() => removeImage(i)} style={styles.removeBtn}>
                  X
                </button>
              </div>
            ))}
          </div>

          <button style={styles.button}>{editId ? "Update" : "Add"}</button>
        </form>
      </div>
      <div style={styles.card}>
  <h3>📦 Product List</h3>

  <table style={styles.table}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Deposit</th>
        <th>Date & Time</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {products.length === 0 ? (
        <tr>
          <td colSpan="4">No products found</td>
        </tr>
      ) : (
        products.map((p) => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>{p.deposit}</td>
           <td>
  {new Date(p.createdAt).toLocaleString()}
</td>
<td>
              <button onClick={() => editProduct(p)}>✏️</button>
              <button onClick={() => deleteProduct(p._id)}>🗑</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
    </div>
    
  );
}
export default AddProduct;
const styles = {
  page: { padding: 30, background: "#f4f6f9", minHeight: "100vh" },
  card: { background: "#fff", padding: 20, marginBottom: 20, borderRadius: 10 },
  grid: { display: "grid", gap: 10 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #ccc" },
  textarea: { padding: 10, borderRadius: 8, border: "1px solid #ccc", width: "100%" },
  button: { padding: 10, background: "#007bff", color: "#fff", border: "none", borderRadius: 8 },
  preview: { display: "flex", gap: 10, marginTop: 10 },
  previewBox: { position: "relative" },
  previewImg: { width: 80, height: 80, borderRadius: 5 },
  removeBtn: { position: "absolute", top: 0, right: 0, background: "red", color: "#fff", border: "none", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse" }
};