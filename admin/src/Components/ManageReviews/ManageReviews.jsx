import React from "react";
import "./ManageReviews.css";
import cross_icon from "../../assets/cross_icon.png";
import { useState, useEffect } from "react";

const ManageReviews = () => {
  const [allreviews, setallReviews] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/reviews/getreviews")
      .then((res) => res.json())
      .then((data) => {
        setallReviews(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  const removeReview = async (id) => {
    await fetch(`http://localhost:4000/reviews/removereview/${id}`, {
      method: "DELETE",
    });
    await fetchInfo();
  };
  return (
    <div className="review">
      <h1>All Reviews List</h1>
      <div className="review-format-main">
        <p>Name</p>
        <p>Contents</p>
        <p>Remove</p>
      </div>
      <div className="review-allreviews">
        <hr />
        {allreviews.map((review, i) => {
          return (
            <>
              <div key={i} className="review-format-main review-format">
                <p>{review.name}</p>
                <p>{review.contents}</p>
                <img
                  onClick={() => {
                    removeReview(review._id);
                  }}
                  src={cross_icon}
                  alt="crosss_icon"
                  className="review-remove-icon"
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
export default ManageReviews;
