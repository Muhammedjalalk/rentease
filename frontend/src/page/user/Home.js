

// import React, { useEffect, useState } from "react";
// import API from "../../services/authService";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const navigate = useNavigate();

//   const bannerImages = [
//     "https://images.pexels.com/photos/35430095/pexels-photo-35430095.jpeg",
//     "https://images.pexels.com/photos/36777883/pexels-photo-36777883.jpeg",
//     "https://images.pexels.com/photos/31362244/pexels-photo-31362244.jpeg"
//   ];

//   // 🔥 Fetch Products
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await API.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 🔥 Auto Banner
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // 🔥 ONLY OFFER PRODUCTS
//   const offerProducts = products.filter((p) => p.offer?.isActive);

//   // 🔍 SEARCH INSIDE OFFER PRODUCTS
//   const filteredProducts = products.filter((p) =>
//   p.name.toLowerCase().includes(search.toLowerCase()) ||
//   p.category.toLowerCase().includes(search.toLowerCase())
// );

//   return (
//     <div style={styles.container}>

//       {/* HEADER */}
//       <div style={styles.header}>
//         <h1 style={styles.logo}>RentEase 🏠</h1>

//         <button style={styles.cartBtn} onClick={() => navigate("/cart")}>
//           🛒 Cart
//         </button>
//       </div>

//       {/* SEARCH */}
//       <div style={styles.searchBox}>
//         <input
//           type="text"
//           placeholder="Search offer products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={styles.input}
//         />
//       </div>

//       {/* BANNER */}
//       <div style={styles.banner}>
//         <img
//           src={bannerImages[currentSlide]}
//           alt="banner"
//           style={styles.bannerImage}
//         />
//         <div style={styles.bannerText}>
//           <h2>Special Discount Deals</h2>
//           <p>Grab the best rental offers now</p>
//         </div>
//       </div>

//       {/* 🔥 OFFER PRODUCTS ONLY */}
//       <h2 style={styles.offerTitle}>🔥 Offer Products</h2>

//       <div style={styles.grid}>
//         {(search ? filteredProducts : offerProducts).map((p) => (
//           <div
//             key={p._id}
//             style={styles.offerCard}
//             onClick={() => navigate(`/product/${p._id}`)}
//           >
//             <img
//               src={
//                 p.images?.length
//                   ? `http://localhost:5000/uploads/${p.images[0]}`
//                   : "https://via.placeholder.com/200"
//               }
//               style={styles.image}
//               alt=""
//             />

//             <h3>{p.name}</h3>

//             <p style={styles.offerText}>
//               {p.offer?.text} ({p.offer?.discountPercent}% OFF)
//             </p>

//             <p style={styles.price}>₹{p.monthlyRent}/month</p>
//             <p style={styles.deposit}>Deposit: ₹{p.deposit}</p>
//           </div>
//         ))}
//       </div>

//       {/* ❌ NO RESULT */}
//       {(search ? filteredProducts : offerProducts).length === 0 && (
//         <p style={styles.noResult}>No offer products found</p>
//       )}

//     </div>
//   );
// }

// export default Home;


// // ================= STYLES =================

// const styles = {
//   container: {
//     padding: "20px",
//     background: "#f5f5f5",
//     minHeight: "100vh"
//   },

//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },

//   logo: {
//     fontSize: "28px",
//     fontWeight: "bold"
//   },

//   cartBtn: {
//     padding: "10px 15px",
//     background: "#16a34a",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer"
//   },

//   searchBox: {
//     margin: "15px 0",
//     display: "flex",
//     justifyContent: "center"
//   },

//   input: {
//     width: "60%",
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     outline: "none"
//   },

//   banner: {
//     position: "relative",
//     height: "250px",
//     borderRadius: "10px",
//     overflow: "hidden"
//   },

//   bannerImage: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover"
//   },

//   bannerText: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     color: "#fff",
//     textAlign: "center",
//     background: "rgba(0,0,0,0.5)",
//     padding: "20px",
//     borderRadius: "10px"
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "20px",
//     marginTop: "20px"
//   },

//   offerCard: {
//     background: "#fff0f0",
//     padding: "15px",
//     borderRadius: "10px",
//     cursor: "pointer",
//     border: "2px solid red",
//     transition: "0.3s"
//   },

//   image: {
//     width: "100%",
//     height: "150px",
//     objectFit: "cover",
//     borderRadius: "8px"
//   },

//   offerTitle: {
//     color: "red",
//     marginTop: "20px"
//   },

//   offerText: {
//     color: "red",
//     fontWeight: "bold"
//   },

//   price: {
//     fontWeight: "bold",
//     marginTop: "5px"
//   },

//   deposit: {
//     fontSize: "13px",
//     color: "#555"
//   },

//   noResult: {
//     textAlign: "center",
//     marginTop: "20px",
//     color: "#999"
//   }
// };

import React, { useEffect, useState } from "react";
import API from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  const bannerImages = [
    "https://images.pexels.com/photos/35430095/pexels-photo-35430095.jpeg",
    "https://images.pexels.com/photos/36777883/pexels-photo-36777883.jpeg",
    "https://images.pexels.com/photos/31362244/pexels-photo-31362244.jpeg"
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Banner Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Offer Products
  // ✅ FINAL DISPLAY LOGIC
const displayProducts = search
  ? products.filter((p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.category || "").toLowerCase().includes(search.toLowerCase())
    )
  : products.filter((p) => p.offer?.isActive);
  return (
    <div className="container">

      {/* HEADER */}
    <div className="header">
  <h1 className="logo">RentEase 🏠</h1>
      <button className="profile-btn" onClick={() => navigate("/profile")}>
      👤 Profile
    </button>

  <button className="cart-btn" onClick={() => navigate("/cart")}>
    🛒 Cart
  </button>

  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search offer products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* BANNER */}
      <div className="banner">
        <img src={bannerImages[currentSlide]} alt="" />
        <div className="overlay">
          <h2>Special Discount Deals</h2>
          <p>Grab the best rental offers now</p>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="title">🔥 Offer Products</h2>

      {/* PRODUCTS */}
      <div className="grid">
        {displayProducts.map((p) => (
          <div
            key={p._id}
            className="card"
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <div className="image-box">
              <img
                src={
                  p.images?.length
                    ? `http://localhost:5000/uploads/${p.images[0]}`
                    : "https://via.placeholder.com/200"
                }
                alt=""
              />
              <span className="badge">
                {p.offer?.discountPercent}% OFF
              </span>
            </div>

            <div className="card-body">
              <h3>{p.name}</h3>
              <p className="offer">{p.offer?.text}</p>
              <p className="price">₹{p.monthlyRent}/month</p>
              <p className="deposit">Deposit ₹{p.deposit}</p>
              <p className="category">{p.category}</p>

              <button className="rent-btn">Rent Now</button>
            </div>
          </div>
        ))}
      </div>

      {displayProducts.length === 0 && (
        <p className="no-result">No offer products found</p>
      )}
    </div>
  );
}

export default Home;