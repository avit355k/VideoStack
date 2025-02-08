import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewSummary = ({ videoid }) => {
  const [review, setReview] = useState({ name: "", rating: "", comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [isEdit, setIsEdit] = useState(false); // To toggle between add and update

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    videoid: videoid,
  };

  // Fetch existing review
  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const response = await axios.get(
          `https://videostack.onrender.com/api/v1/get-user-review/${videoid}/${localStorage.getItem("id")}`,
          { headers }
        );
        if (response.data.success) {
          setReview(response.data.data);
          setIsEdit(true); // Set edit mode if a review exists
        }
      } catch (error) {
        console.log("No existing review found or error occurred.", error);
      }
    };
    fetchUserReview();
  }, [videoid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.name || !review.rating || !review.comment) {
      return alert("All fields are required");
    }

    try {
      const url = isEdit
        ? "https://videostack.onrender.com/api/v1/update-review"
        : "https://videostack.onrender.com/api/v1/add-review";

      const response = await axios({
        method: isEdit ? "put" : "post",
        url,
        data: review,
        headers,
      });

      alert(response.data.message);
      if (!isEdit) {
        setReview({ name: "", rating: "", comment: "" });
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Error submitting review");
    }
  };

  return (
    <div className="bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 shadow-md px-8 pt-6 pb-8  mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">
          {isEdit ? "Edit Your Rating" : "Your Rating"} *
        </h2>

        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              className="cursor-pointer"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <input
                type="radio"
                name="rating"
                value={star}
                checked={parseInt(review.rating, 10) === star}
                onChange={(e) =>
                  setReview({ ...review, rating: parseInt(e.target.value, 10) })
                }
                required
                className="hidden"
              />
              <span
                className={`text-3xl ${hoverRating >= star || review.rating >= star
                  ? "text-orange-500"
                  : "text-gray-200"
                  }`}
              >
                ★
              </span>
            </label>
          ))}
        </div>

        <div className="mb-4 text-zinc-300 font-serif">
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Nickname *
          </label>
          <input
            type="text"
            name="name"
            value={review.name}
            onChange={(e) => setReview({ ...review, name: e.target.value })}
            required
            placeholder="Enter your nickname"
            className="shadow appearance-none border rounded w-[90%] py-2 px-3  bg-zinc-900 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-4 text-zinc-300 font-serif">
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Review *
          </label>
          <textarea
            name="comment"
            placeholder="Write your review here"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
            className="shadow appearance-none border rounded w-[90%] py-2 px-3 bg-zinc-900 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-400 h-24"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEdit ? "Update Review" : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewSummary;
