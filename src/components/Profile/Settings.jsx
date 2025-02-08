import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [profileData, setProfileData] = useState(null);
  const [value, setValue] = useState({ address: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://videostack.onrender.com/api/v1/get-user-information", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfileData(response.data);
        setValue({ address: response.data.address || "" });
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const submitAddress = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.put("https://videostack.onrender.com/api/v1/update-address", value, { headers });
      alert(response.data.message || "Address updated successfully.");
    } catch (err) {
      console.error("Failed to update address:", err);
      alert("Failed to update address. Please try again.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-900 py-8">
      <div className="bg-zinc-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-300 mb-6 text-center">Account Information</h1>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : profileData ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <span className="text-gray-400 font-medium">Username:</span>
              <span className="text-gray-50">{profileData.username}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-600 pb-2">
              <span className="text-gray-400 font-medium">Email:</span>
              <span className="text-gray-50">{profileData.email}</span>
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="text-gray-400 font-medium mb-2">Address:</label>
              <textarea
                className="p-3 rounded bg-zinc-900 font-semibold text-gray-50 border border-gray-700 focus:outline-none focus:ring focus:ring-yellow-500"
                rows={4}
                name="address"
                placeholder="Enter your address"
                value={value.address}
                onChange={handleChange}
              />
              <button
                onClick={submitAddress}
                className="mt-4 bg-yellow-500 text-zinc-900 font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                Update Address
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default Settings;
