import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;

    const handleVerifyOTP = async () => {
        try {
            await axios.post("https://videostack.onrender.com/api/v1/verify-otp", { email, otp });
            alert("OTP verified successfully");
            navigate("/Reset-Password", { state: { email } });
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900">
            <div className="bg-zinc-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                    Verify OTP
                </h2>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 text-zinc-900 rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleVerifyOTP}
                    className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300"
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default VerifyOTP;
