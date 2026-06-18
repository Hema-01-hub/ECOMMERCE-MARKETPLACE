import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5002/api/my-orders",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setOrders(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>My Orders 📦</h1>
       {orders.length === 0 && <h3>No orders placed yet 📦</h3>}
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>Order ID: {order._id}</h3>

          <p>Status: {order.status}</p>
          <p>Total: ₹ {order.totalAmount}</p>
          <p>Payment: {order.paymentMethod}</p>
          <p>Payment Status: {order.paymentStatus}</p>

          <h3>Products</h3>

          {order.items?.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                marginBottom: "15px"
              }}
            >
              <img
                src={item.productId?.image}
                alt={item.productId?.title}
                style={{
                  width: "120px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

              <div>
                <h4>{item.productId?.title}</h4>
                <p>₹ {item.productId?.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;