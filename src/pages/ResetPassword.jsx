import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        try {
            await axios.post("https://videostack.onrender.com/api/v1/reset-password", { email, newPassword });
            alert("Password reset successfully");
            navigate("/Login");
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900">
            <div className="bg-zinc-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                    Reset Password
                </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        New Password:
                    </label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 text-zinc-900 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 text-zinc-900 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    onClick={handleResetPassword}
                    className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
