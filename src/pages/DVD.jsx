import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard/VideoCard';
import Loader from '../components/Loader/Loader';

const DVD = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items to display per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://videostack.onrender.com/api/v1/get-dvd-videos");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = data.slice(
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
    <div className='bg-zinc-900 px-4 sm:px-6 md:px-8 lg:px-12 py-8 text-white h-auto'>
      <h1 className='text-2xl text-white font-serif font-bold mb-8'>ALL DVDS</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
            {paginatedData.map((item, i) => (
              <VideoCard key={i} data={item} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DVD;
