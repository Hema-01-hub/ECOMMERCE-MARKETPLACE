import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUsers();
    getOrders();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5002/api/all-users",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5002/api/all-orders",
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

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5002/api/update-order-status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Status Updated ✅");

      getOrders();

    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard 👨‍💼</h1>

      <h2>All Users</h2>

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ))}

      <h2>All Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p><strong>Order ID:</strong> {order._id}</p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <p>
            <strong>Total:</strong> ₹ {order.totalAmount}
          </p>

          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Payment Status:</strong> {order.paymentStatus}
          </p>

          <select
            onChange={(e) =>
              updateStatus(order._id, e.target.value)
            }
          >
            <option>Select Status</option>
            <option>Placed</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Admin;