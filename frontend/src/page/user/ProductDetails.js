import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/authService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTenure, setSelectedTenure] = useState(null);

  // ✅ Fetch product
  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedTenure(res.data.tenureOptions?.[0] || null);
      })
      .catch(err => console.log(err));
  }, [id]);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImage(0);
  }, [product]);

  // ================= ADD TO CART =================
 // ================= ADD TO CART =================
const handleAddToCart = () => {
  if (!selectedTenure) {
    alert("Please select tenure");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(
    item =>
      item.productId === product._id &&
      item.tenure.months === selectedTenure.months
  );

  if (exists) {
    alert("This plan already in cart");
    return;
  }

  const cartItem = {
    productId: product._id,
    name: product.name,
    monthlyRent: selectedTenure.price,
    deposit: product.deposit,
    tenure: selectedTenure,
    image: product.images?.[0] || ""
  };

  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));

  if (window.confirm("Added to cart ✅\nGo to Cart?")) {
    navigate("/cart");
  }
};

  // ================= RENT NOW =================
  const handleRentNow = () => {
    if (!selectedTenure) {
      alert("Please select tenure");
      return;
    }

    navigate("/checkout", {
      state: {
        product,
        tenure: selectedTenure
      }
    });
  };

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["placeholder.jpg"];

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/300";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000/uploads/${img}`;
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* IMAGE SECTION */}
        <div style={styles.imageSection}>
          <img
            src={getImageUrl(images[currentImage])}
            alt="product"
            style={styles.mainImage}
          />

          {images.length > 1 && (
            <>
              <button onClick={prevImage} style={styles.navBtn}>‹</button>
              <button
                onClick={nextImage}
                style={{ ...styles.navBtn, right: 0 }}
              >
                ›
              </button>
            </>
          )}

          {/* Thumbnails */}
          <div style={styles.thumbnailContainer}>
            {images.map((img, index) => (
              <img
                key={index}
                src={getImageUrl(img)}
                alt="thumb"
                onClick={() => setCurrentImage(index)}
                style={{
                  ...styles.thumbnail,
                  border:
                    currentImage === index
                      ? "2px solid blue"
                      : "1px solid #ccc"
                }}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div style={styles.details}>
          <h2>{product.name}</h2>

          <p><b>Category:</b> {product.category}</p>

         <h3>
  ₹{selectedTenure?.price || 0} / month
  {product.tenureOptions.length > 1 && (
    <span style={{ fontSize: "14px", color: "gray" }}>
      {" "} (varies by duration)
    </span>
  )}
</h3>

          <p><b>Deposit:</b> ₹{product.deposit}</p>

          <p><b>Description:</b> {product.description}</p>

          {/* Tenure */}
       {product.tenureOptions?.length > 1 && <h4>Select Duration:</h4>}

<div>
  {(product.tenureOptions || []).map((t, index) => (
    <span
      key={index}
      onClick={() => setSelectedTenure(t)}
      style={{
        ...styles.tenure,
        background:
          selectedTenure?.months === t.months
            ? "#007bff"
            : "#fff",
        color:
          selectedTenure?.months === t.months
            ? "#fff"
            : "#000"
      }}
    >
      {t.months} months - ₹{t.price}/mo
    </span>
  ))}
</div>

          {/* BUTTONS */}
          <div style={{ marginTop: "15px" }}>
            <button style={styles.btn} onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button
              style={{ ...styles.btn, background: "green" }}
              onClick={handleRentNow}
            >
      Rent Now ({selectedTenure?.months || 0} months)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;


// ================= STYLES =================
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f5f5f5"
  },

  card: {
    display: "flex",
    gap: "30px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "900px",
    width: "100%"
  },

  imageSection: {
    position: "relative"
  },

  mainImage: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  navBtn: {
    position: "absolute",
    top: "45%",
    left: 0,
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer"
  },

  thumbnailContainer: {
    display: "flex",
    marginTop: "10px",
    gap: "5px"
  },

  thumbnail: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    cursor: "pointer",
    borderRadius: "5px"
  },

  details: {
    flex: 1,
    textAlign: "left"
  },

  tenure: {
    display: "inline-block",
    marginRight: "10px",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer"
  },

  btn: {
    padding: "10px 15px",
    marginRight: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};