import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5002/api/cart", {
        headers: {
          Authorization: token
        }
      });

      setCart(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const items = cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity
      }));

      const totalAmount = cart.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      );

      await axios.post(
        "http://localhost:5002/api/place-order",
        {
          items,
          totalAmount,
          paymentMethod
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Order Placed Successfully ✅");
      setCart([]);

    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>My Cart 🛒</h1>
       {cart.length === 0 && (
  <h3 className="empty-message">Your cart is empty 🛒</h3>
)}
      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
            display: "flex",
            gap: "15px",
            alignItems: "center"
          }}
        >
          <img
            src={item.productId?.image}
            alt={item.productId?.title}
            style={{
              width: "140px",
              height: "110px",
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />

          <div>
            <h3>{item.productId?.title}</h3>
            <p>₹ {item.productId?.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ margin: "10px", padding: "10px" }}>
          <h3>Select Payment Method</h3>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>

          <br /><br />

          <button onClick={placeOrder}>
            Place Order 📦
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;