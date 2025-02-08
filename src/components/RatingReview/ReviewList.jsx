import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = ({ videoid }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Video ID:", videoid);
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://videostack.onrender.com/api/v1/get-all-reviews/${videoid}`);
        if (response.status === 404) {
          setError("No reviews found for this video.");
        } else if (response.data.success) {
          setReviews(response.data.reviews);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setError("No reviews found for this video.");
        } else {
          setError("Failed to fetch reviews.");
          console.error("Error fetching reviews:", err.message);
        }
      }
    };
    fetchReviews();
  }, [videoid]);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        Error: {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No reviews yet. Be the first to review!
      </div>
    );
  }
  return (
    <div className=" bg-zinc-900">
    <div className="mx-7">
    <h3 className="text-2xl font-semibold  text-gray-100">Customer Reviews ({reviews.length})</h3>
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border border-zinc-700 p-4 w-[90%] shadow-md bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <p className="bg-zinc-900 text-orange-500 font-semibold">
              {review.rating || "N/A"} ★
            </p>
          </div>
          <p className="text-gray-400 font-mono mt-1">{review.comment || "No comment provided."}</p>

          <div className="flex items-center space-x-2 font-mono">
            <h5 className="text-lg text-gray-500">{review.name}</h5>
            <span className="text-gray-500">|</span>
            <small className="text-gray-500">
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Date not available"}
            </small>
          </div>
        </div>

      ))}
    </div>
    </div>
  );
};

export default ReviewList;
