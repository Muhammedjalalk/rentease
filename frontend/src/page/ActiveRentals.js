import React, { useEffect, useState } from "react";
import axios from "axios";

const ActiveRentals = () => {
  const [rentals, setRentals] = useState([]);

  const userId = localStorage.getItem("userId");

  const fetchRentals = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/rentals/active/${userId}`
      );

      setRentals(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const returnRental = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/rentals/return/${id}`
      );

      alert("Rental Returned");
      fetchRentals();
    } catch (error) {
      console.log(error);
    }
  };

  const extendRental = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/rentals/extend/${id}`
      );

      alert("Rental Extended");
      fetchRentals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Active Rentals</h2>

      {rentals.length === 0 ? (
        <p>No Active Rentals</p>
      ) : (
        rentals.map((rental) => (
          <div
            key={rental._id}
            className="card mb-3 p-3"
          >
            <h5>{rental.product?.name}</h5>

            <p>
              End Date:
              {" "}
              {new Date(
                rental.endDate
              ).toLocaleDateString()}
            </p>

            <button
              className="btn btn-success me-2"
              onClick={() =>
                extendRental(rental._id)
              }
            >
              Extend
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                returnRental(rental._id)
              }
            >
              Return
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ActiveRentals;