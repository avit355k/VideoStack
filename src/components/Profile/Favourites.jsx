import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../VideoCard/VideoCard';

const Favourites = () => {
  const [Favourites, setFavourites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items to display per page

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://videostack.onrender.com/api/v1/get-favourite-video", { headers });
      setFavourites(response.data.data);
    };
    fetch();
  }, []);

  // Function to remove video from favourites in the state
  const removeFromFavourites = (videoid) => {
    setFavourites(prevFavourites => prevFavourites.filter(item => item._id !== videoid));
  };

  // Pagination logic
  const totalItems = Favourites.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedFavourites = Favourites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {paginatedFavourites.length === 0 ? (
          <p>No Favourite is Found</p>
        ) : (
          paginatedFavourites.map((item, i) => (
            <VideoCard key={i} data={item} favourites={true} onRemove={removeFromFavourites} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-4 sm:space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-700 text-white py-2 px-3 sm:px-4 sm:py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-700 text-white py-2 px-3 sm:px-4 sm:py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Favourites;
