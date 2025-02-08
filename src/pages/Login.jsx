import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from "../store/auth";
import { useDispatch} from "react-redux";
import axios from 'axios';

const Login = () => {
  const [Values, setValue] = useState({
    role: "user",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();  // Prevents the default form submission
    try {
      if (Values.username === "" || Values.password === "" || Values.role === "") {
        alert("All fields are Required");
      } else {
        const response = await axios.post(
          "https://videostack.onrender.com/api/v1/sign-in", Values
        );
        //console.log(response.data.id);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        alert("Log in Successful");
        navigate("/Profile"); // Change to your desired route after login
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="bg-zinc-800 p-8 rounded shadow-md w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-gray-300">Role</label>
            <select
              name="role"
              value={Values.role}
              onChange={change}
              className="w-full px-4 py-2 border border-zinc-600 rounded-md bg-zinc-700 text-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300">Username</label>
            <input
              type="username"
              name="username"
              placeholder="Enter your username"
              required
              value={Values.username}
              onChange={change}
              className="w-full px-4 py-2 border border-zinc-600 rounded-md bg-zinc-700 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={Values.password}
              onChange={change}
              className="w-full px-4 py-2 border border-zinc-600 rounded-md bg-zinc-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-blue-400 hover:text-blue-500 text-sm">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account? <Link to="/CreateAccount" className="text-blue-400 hover:text-blue-500">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
