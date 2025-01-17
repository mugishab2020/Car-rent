import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import client from "../config/axios";
import '../styles/Order.css';

const Order = () => {
  const location = useLocation();
  const { carId } = location.state || {}; 
  const [carDetails, setCarDetails] = useState(null);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await client.get(`cars/carbyId/${carId}`);
        console.log(response)
        setCarDetails(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);
  console.log(carDetails);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Order placed!");
  };

  if (!carDetails) {
    return <p>Loading...</p>;
  }

  const handleBooking = async (event) => {
    event.preventDefault();

    const rentDate = new Date(event.target.rentdate.value).toISOString();
    const returnDate = new Date(event.target.returndate.value).toISOString();

    console.log("Booking data:", {
      UserId: userId,
      CarId: carId,
      date_ordered: rentDate,
      returnDate: returnDate,
      priceperday: carDetails.pricePerDay,
    });

    try {
      const response = await client.post("/orders/makeorder", {
        UserId: userId,
        CarId: carId,
        date_ordered: rentDate,
        returnDate: returnDate,
        priceperday: carDetails.pricePerDay,
      });
      console.log("Response:", response.data);
      alert("Order placed successfully!");
      window.location.href = "/";
      } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
       const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      console.log("Error:", error.response?.data);
      alert(`Error placing order: ${errorMessage}`);
  }
  };

  return (
    <div className="order-container">
      <h2 className="order-title">Place Your Order</h2>
      <form onSubmit={handleBooking} className="order-form">
        <label>
          Car ID:
          <input type="text" value={carId} disabled />
        </label>
        <label>
          Price Per Day:
          <input type="text" value={carDetails.pricePerDay} disabled />
        </label>
        <label>
          Brand:
          <input type="text" value={carDetails.brand} disabled />
        </label>
        <label>
          Date to pick the Car:
          <input type="date" name="rentdate" defaultValue={new Date().toISOString().split("T")[0]} required />
        </label>
        <label>
          Date to return the Car:
          <input type="date" name="returndate" required />
        </label>
        <label>
          Customer ID:
          <input type="text" value={userId} disabled />
        </label>
        <button type="submit" className="submit-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Order;
