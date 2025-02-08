import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://videostack.onrender.com/api/v1/get-user-cart", { headers });
      setCart(response.data.data);
    };
    fetch();
  }, []);

  const deleteItem = async (videoId) => {
    try {
      await axios.put(`https://videostack.onrender.com/api/v1/remove-video-from-cart/${videoId}`, {}, { headers });
      setCart((prevCart) => prevCart.filter((item) => item._id !== videoId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    const total = Cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(total);
  }, [Cart]);

  const placeOrder = async () => {
    setLoading(true); // Show loader
    try {
      const response = await axios.post(
        "https://videostack.onrender.com/api/v1/place-order",
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      setCart([]); // Clear cart after successful order
      setTotal(0); // Reset total
      navigate("/Profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen px-6 py-12 text-white font-sans">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-200">Your Cart</h1>

      {loading ? (
        <Loader /> // Show loader when placing order
      ) : Cart.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl text-gray-500">Your cart is empty</h1>
        </div>
      ) : (
        <div className="container mx-auto">
          {Cart.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row items-center p-6 bg-gray-800 rounded-lg shadow-md mb-4 transition-all duration-200 hover:shadow-xl space-y-4 md:space-y-0 md:space-x-6">
              <img src={item.url} alt="" className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-lg" />

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-400 mt-2">{item.desc.slice(0, 100)}...</p>
              </div>

              <div className="flex flex-col md:flex-row items-center md:space-x-4">
                <p className="text-lg font-semibold text-green-400">RS. {item.price}</p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-200 transform hover:scale-105"
                  onClick={() => deleteItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className='mt-8 w-full flex items-center justify-between'>
            <div className="text-lg font-semibold">
              <h2 className="text-gray-300">Total Amount</h2>
              <h2 className="text-2xl text-green-400">RS. {Total}</h2>
            </div>
            <button
              className='bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-bold text-lg transition duration-200 transform hover:scale-105'
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
