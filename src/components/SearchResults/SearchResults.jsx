import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import VideoCard from '../VideoCard/VideoCard'; // Adjust the import path as necessary
import Loader from '../Loader/Loader'; // Assuming you have a Loader component

const SearchResults = () => {
  const location = useLocation();
  const [videos, setVideos] = useState(location.state?.videos || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch videos based on the search title from query params
  useEffect(() => {
    if (videos.length === 0) {
      const query = new URLSearchParams(location.search);
      const title = query.get('title') || '';

      const fetchVideos = async () => {
        try {
          const response = await axios.get("https://videostack.onrender.com/api/v1/search-video", {
            params: { title },
          });

          setVideos(response.data.data); // Access `data` within the response
        } catch (error) {
          setError("Error fetching search results. Please try again.");
        }
      };

      fetchVideos();
    }
  }, [location.search, videos.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 h-auto container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-zinc-600">Search Results</h1>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos found matching your search criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} data={video} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SearchResults;
