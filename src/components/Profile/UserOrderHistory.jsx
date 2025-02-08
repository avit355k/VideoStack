import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://videostack.onrender.com/api/v1/get-order-history", { headers });
        setOrderHistory(response.data.data || []); // Set to an empty array if no data
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-12 font-sans">
      {!orderHistory ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-100">
          <h1 className="text-4xl font-bold text-gray-400 mb-6">No Order History Available</h1>
          <img src="/images/removecart.png" alt="No Orders" className=" h-48 mb-8 opacity-75 " />
        </div>
      ) : (
        <div className="h-full p-4">
          <h1 className="text-4xl font-semibold text-gray-300 mb-8">Your Order History</h1>
          <div className="grid grid-cols-12 gap-4 bg-zinc-800 p-3 rounded-lg text-orange-400 text-lg font-medium">
            <div className="col-span-1 text-center">Sr.</div>
            <div className="col-span-3">Items</div>
            <div className="col-span-5">Description</div>
            <div className="col-span-1 text-center">Price</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-1 text-center hidden md:block">Mode</div>
          </div>
          {orderHistory.map((item, index) => (
            <div key={item._id || index} className="grid grid-cols-12 gap-4 bg-zinc-800 p-3 mt-2 rounded-lg hover:bg-gray-700 transition duration-300">
              <div className="col-span-1 text-center text-gray-300">{index + 1}</div>
              <div className="col-span-3 text-gray-100 font-medium">
                {item.video ? (
                  <Link to={`/view-video-details/${item.video._id}`} className="hover:text-blue-500 transition duration-300">
                    {item.video.title}
                  </Link>
                ) : (
                  <span className="text-gray-500">No video details</span>
                )}
              </div>
              <div className="col-span-5 text-gray-300">{item.video ? `${item.video.desc.slice(0, 50)}...` : 'No description available'}</div>
              <div className="col-span-1 text-center text-gray-300">{item.video ? item.video.price : '-'}</div>
              <div className="col-span-1 text-center font-semibold">
                <span
                  className={`${item.status === 'canceled'
                    ? 'text-red-500'
                    : item.status === 'order placed'
                      ? 'text-yellow-400'
                      : 'text-green-500'
                    }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="col-span-1 text-center hidden md:block text-sm text-gray-400">COD</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
