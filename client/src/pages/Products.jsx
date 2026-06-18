import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");
  const [search, setSearch] = useState("");

  const subcategoryOptions = {
    All: ["All"],
    Clothes: ["All", "Men", "Women", "Kids"],
    Electronics: ["All", "Mobiles", "Laptops", "Headphones"],
    Home: ["All", "Furniture"],
    Beauty: ["All", "Skincare"],
    Groceries: ["All", "Sugar"],
    Books: ["All", "Books"],
    Bags: ["All", "Backpack"],
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/products");
      setProducts(Array.isArray(res.data) ? res.data : res.data.products || []);
    } catch (error) {
      console.log(error);
      alert("Products not loading ❌");
    }
  };

  const getImage = (product) => {
    return product.image || "https://via.placeholder.com/300x200?text=No+Image";
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        return;
      }

      await axios.post(
        "http://localhost:5002/api/add-to-cart",
        { productId, quantity: 1 },
        { headers: { Authorization: token } }
      );

      alert("Added to Cart ✅");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        return;
      }

      await axios.post(
        "http://localhost:5002/api/add-to-wishlist",
        { productId },
        { headers: { Authorization: token } }
      );

      alert("Added to Wishlist ❤️");
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const normalize = (text) => text?.toString().toLowerCase().trim() || "";

  const filteredProducts = products.filter((product) => {
    const productName = normalize(product.title || product.name);
    const productCategory = normalize(product.category);
    const productSubcategory = normalize(product.subcategory);
    const productDescription = normalize(product.description);

    const selectedCategory = normalize(category);
    const selectedSubcategory = normalize(subcategory);
    const searchText = normalize(search);

    const matchCategory =
      category === "All" ||
      productCategory === selectedCategory ||
      (category === "Clothes" && productCategory === "fashion");

    const matchSubcategory =
      subcategory === "All" || productSubcategory === selectedSubcategory;

    const matchSearch =
      searchText === "" ||
      productName.includes(searchText) ||
      productDescription.includes(searchText) ||
      productCategory.includes(searchText) ||
      productSubcategory.includes(searchText);

    return matchCategory && matchSubcategory && matchSearch;
  });

  return (
    <div>
      <div className="hero">
        <h1>Big Shopping Sale 🛒</h1>
        <p>Best deals on Electronics, Fashion, Groceries, Books and Bags</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("All");
          }}
        >
          <option value="All">All Categories</option>
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home</option>
          <option value="Beauty">Beauty</option>
          <option value="Groceries">Groceries</option>
          <option value="Books">Books</option>
          <option value="Bags">Bags</option>
        </select>

        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        >
          {(subcategoryOptions[category] || ["All"]).map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Subcategories" : item}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          😔 No Products Found
          <br />
          <small>Try another search or category</small>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              {product.offer && (
                <span className="offer-badge">
                  🔥 {product.discountPercentage || 10}% OFF
                </span>
              )}

              <img
                src={getImage(product)}
                alt={product.title || product.name}
              />

              <h3>{product.title || product.name}</h3>

              <p>{product.description}</p>

              <div className="rating">⭐⭐⭐⭐⭐ 4.8</div>

              <h3 className="price">₹{product.price}</h3>

              <p>
                {product.category === "Fashion" ? "Clothes" : product.category} /{" "}
                {product.subcategory || "General"}
              </p>

              <div className="btn-row">
                <button
                  className="cart-btn"
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </button>

                <button
                  className="wishlist-btn"
                  onClick={() => addToWishlist(product._id)}
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="footer">
        <h3>ShopKart 🛍️</h3>
        <p>Best online shopping experience for your portfolio project</p>
        <p>About | Contact | Privacy Policy | Terms</p>
      </div>
    </div>
  );
}

export default Products;