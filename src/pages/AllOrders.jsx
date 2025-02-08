import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [AllOrder, setAllOrder] = useState([]); // Initialize as empty array
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [UserDiv, setUserDiv] = useState("hidden");
  const [UserDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://videostack.onrender.com/api/v1/get-all-orders`, { headers });
        setAllOrder(response.data.data || []); // Set fetched data or empty array
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []); // Empty dependency array to prevent infinite re-fetching

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrder[i]?._id;
    if (id) {
      try {
        const response = await axios.put(`https://videostack.onrender.com/api/v1/update-status/${id}`, Values, { headers });
        alert(response.data.message);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  return (
    <>
      {!AllOrder.length && (
        <div>
          <Loader />
        </div>
      )}

      {AllOrder.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'> All Order</h1>
          <div className='mt-4 bg-zinc-800 text-orange-400 w-full rounded py-2 px-4 flex gap-2'>
            <div className="w-[3%]"><h1 className='text-center'>Sr.</h1></div>
            <div className="w-[40%] md:w-[22%]"><h1>Items</h1></div>
            <div className="w-0 md:w-[45%] hidden md:block"><h1>Description</h1></div>
            <div className="w-[17%] md:w-[9%]"><h1>Price</h1></div>
            <div className="w-[30%] md:w-[16%]"><h1>Status</h1></div>
            <div className='w-[10%] md:[5%]'><h1><FaUserLarge /></h1></div>
          </div>
          <div>
            {AllOrder.map((item, i) => (
              item && item.video && (
                <div key={item._id} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer'>
                  <div className='w-[3%]'><h1 className='text-center'>{i + 1}</h1></div>
                  <div className="w-[40%] md:w-[22%]">
                    <Link to={`/view-video-details/${item.video._id}`} className="hover:text-blue-500 transition duration-300">
                      {item.video.title}
                    </Link>
                  </div>
                  <div className="w-0 md:w-[45%] hidden md:block">
                    <h1>{item.video.desc.slice(0, 50)}...</h1>
                  </div>
                  <div className="w-[17%] md:w-[9%]">
                    <h1>{item.video.price}</h1>
                  </div>
                  <div className="w-[30%] md:w-[16%]">
                    <button
                      className='font-semibold hover:scale-105 transition-all duration-300'
                      onClick={() => setOptions(i)}
                    >
                      {item.status === 'order placed' ? (
                        <div className='text-yellow-500'>{item.status}</div>
                      ) : item.status === 'canceled' ? (
                        <div className='text-red-500'>{item.status}</div>
                      ) : (
                        <div className='text-green-500'>{item.status}</div>
                      )}
                    </button>
                    <div className={`${Options === i ? "block" : "hidden"} flex mt-4`}>
                      <select
                        name="status"
                        className='bg-gray-800'
                        onChange={change}
                        value={Values.status}
                      >
                        {["order placed", "out for delivery", "delivered", "canceled"].map((status, i) => (
                          <option value={status} key={i}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className='text-green-500 hover:text-pink-600 mx-2'
                        onClick={() => {
                          setOptions(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </div>
                  <div className='w-[10%] md:[5%]'>
                    <button className='text-xl hover:text-orange-500'
                      onClick={() => {
                        setUserDiv("fixed");
                        setUserDivData(item.user);
                      }}>
                      <IoOpenOutline />
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
      {
        UserDivData && (
          <SeeUserData
            UserDivData={UserDivData}
            UserDiv={UserDiv}
            setUserDiv={setUserDiv}
          />
        )
      }
    </>
  );
};

export default AllOrders;
