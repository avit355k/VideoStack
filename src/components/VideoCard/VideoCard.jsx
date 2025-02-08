import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import Loader from '../Loader/Loader';
import Rating from '../RatingReview/Rating'

const VideoCard = ({ data, favourites, onRemove }) => {
  const [removing, setRemoving] = useState(false); // New state for tracking removal status
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    videoid: data._id,
  };

  const handleRemoveFromFavourites = async () => {
    setRemoving(true); // Show loader/spinner on button

    try {
      // Optimistically update UI before waiting for the response
      if (onRemove) onRemove(data._id);

      const response = await axios.put("https://videostack.onrender.com/api/v1/delete-video-from-favourite", {}, { headers });

      // Notify user of success with a toast
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to remove video from favorites", error);
      alert("Error removing item. Please try again.");

      // Revert UI change on error
      if (onRemove) onRemove(null); // Pass null or original data ID to re-add if needed
    } finally {
      setRemoving(false); // Hide loader
    }
  };

  return (
    <div className="bg-zinc-900 relative rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 duration-200 ease-out border border-zinc-600">
      <Link to={`/view-video-details/${data._id}`} className="block">
        <div className="bg-zinc-800 flex items-center justify-center overflow-hidden">
          <img
            src={data.url}
            alt="Video Thumbnail"
            className="w-full h-[45vh] sm:h-[15vh] md:h-[30vh] lg:h-[45vh] xl:h-[45vh] object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        <div className="p-4">
          <div className='mb-2 w-1/3'>
            <Rating avgrating={data.avgrating} reviewCount={data.reviewCount} />
          </div>
          <h2 className="text-xl font-semibold text-white">{data.title}</h2>
          <p className="mt-2 text-zinc-400 text-sm">{data.language}</p>
          <p className="mt-2 text-lg text-zinc-200 font-bold">RS. {data.price}</p>
        </div>
      </Link>

      {favourites && (
        <button
          type="button"
          className="absolute bottom-3 right-3 p-2 bg-red-600 rounded-full focus:outline-none hover:bg-red-700 transition-colors duration-200"
          onClick={handleRemoveFromFavourites}
          disabled={removing} // Disable button while removing
        >
          {removing ? (
            <Loader size={16} /> // Show a loader if removing
          ) : (
            <FaTrash color="white" size={16} />
          )}
        </button>
      )}
    </div>
  );
};

export default VideoCard;
