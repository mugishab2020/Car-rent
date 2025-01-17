import React, { useEffect, useState } from "react";
import client from "../config/axios";
import '../styles/userorders.css';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("UserID: " + userId);
        const response = await client.get(`/orders/getorderbyUserId/${userId}`);
        setOrders(response.data);
        console.log("Found order", response.data);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        setError("Error fetching orders:", err.message);
        setLoading(false);
       } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <p className="loading-text">Loading orders...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-text">You have not made any orders yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Car ID</th>
              <th>Rent Date</th>
              <th>Return Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.CarId}</td>
                <td>{new Date(order.date_ordered).toLocaleDateString()}</td>
                <td>{new Date(order.returnDate).toLocaleDateString()}</td>
                <td>${order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;
