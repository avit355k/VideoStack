import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            await axios.post("https://videostack.onrender.com/api/v1/forgot-password", { email });
            alert("OTP sent to your email");
            console.log("Navigating to /verify-otp with email:", email);
            navigate("/verify-otp", { state: { email } });
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900">
            <div className="bg-zinc-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                    Forgot Password
                </h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 text-zinc-900 rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleForgotPassword}
                    className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300"
                >
                    Send OTP
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
