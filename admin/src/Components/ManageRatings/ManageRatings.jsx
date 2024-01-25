import React from "react";
import "./ManageRatings.css";
import cross_icon from "../../assets/cross_icon.png";
import { useState } from "react";
import { useEffect } from "react";

const ManageRatings = () => {
  const [allratings, setallRatings] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/ratings/getratings")
      .then((res) => res.json())
      .then((data) => {
        setallRatings(data);
      });
  };

  const removerating = async (id) => {
    await fetch(`http://localhost:4000/ratings/removerating/${id}`, {
      method: "DELETE",
    });
    await fetchInfo();
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="rating">
      <h1>All Ratings List</h1>
      <div className="rating-format-main">
        <p>Rating</p>
        <p>Product Name</p>
        <p>Product ID</p>
        <p>Remove</p>
      </div>
      <div className="rating-allratings">
        <hr />
        {allratings.map((rating, i) => {
          return (
            <>
              <div key={i} className="rating-format-main rating-format">
                <p>{rating.rating}</p>
                <p>{rating.product_name}</p>
                <p>{rating.product_id}</p>
                <img
                  onClick={() => {
                    removerating(rating._id);
                  }}
                  src={cross_icon}
                  alt="crosss_icon"
                  className="rating-remove-icon"
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ManageRatings;
