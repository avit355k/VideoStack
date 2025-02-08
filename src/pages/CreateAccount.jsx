import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [Values, setValue] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Values, [name]: value });
  };

  const submit = async () => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "") {
        alert("All fields are Required");
      }
      if (!emailPattern.test(Values.email)) {
        alert("Please enter a valid email address");
        return;
      }
      if (Values.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      else {
        const response = await axios.post(
          "https://videostack.onrender.com/api/v1/sign-up", Values
        );
        alert(response.data.message);
        navigate("/Login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-zinc-200">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-zinc-100">Create Account</h2>

        <div>
          <label className="block text-zinc-200">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            required
            value={Values.username}
            onChange={change}
            className="w-full px-4 py-2 border rounded-md bg-zinc-700 border-zinc-600 text-zinc-200 placeholder-zinc-400"
          />
        </div>
        <div>
          <label className="block text-zinc-200">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={Values.email}
            onChange={change}
            className="w-full px-4 py-2 border rounded-md bg-zinc-700 border-zinc-600 text-zinc-200 placeholder-zinc-400"
          />
        </div>
        <div>
          <label className="block text-zinc-200">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={Values.password}
            onChange={change}
            className="w-full px-4 py-2 border rounded-md bg-zinc-700 border-zinc-600 text-zinc-200 placeholder-zinc-400"
          />
        </div>
        <div>
          <label className="block text-zinc-200">Address</label>
          <textarea
            rows="5"
            name="address"
            placeholder="Enter your address"
            required
            value={Values.address}
            onChange={change}
            className="w-full px-4 py-2 border rounded-md bg-zinc-700 border-zinc-600 text-zinc-200 placeholder-zinc-400 outline-none"
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 "
          onClick={submit}
        >
          Sign Up
        </button>

        <p className="text-zinc-400 text-sm mt-4 text-center">
          Already have an account? <Link to="/Login" className="text-blue-400 hover:text-blue-300">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
