import { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5002/api/wishlist", {
        headers: {
          Authorization: token
        }
      });

      setWishlist(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const buyNow = async (product) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5002/api/place-order",
        {
          items: [
            {
              productId: product._id,
              quantity: 1
            }
          ],
          totalAmount: product.price,
          paymentMethod: "COD"
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Order Placed Successfully ✅");

    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>My Wishlist ❤️</h1>
      {wishlist.length === 0 && <h3>Your wishlist is empty ❤️</h3>}

      {wishlist.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <img
            src={item.productId?.image}
            alt={item.productId?.title}
            style={{
              width: "180px",
              height: "140px",
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />

          <h3>{item.productId?.title}</h3>
          <p>₹ {item.productId?.price}</p>
          <p>{item.productId?.description}</p>

          <button onClick={() => buyNow(item.productId)}>
            Buy Now ⚡
          </button>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;