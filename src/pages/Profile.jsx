import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import Loader from '../components/Loader/Loader';

const Profile = () => {
  useEffect(() => {
    const handleTouchStart = (event) => {
      // Your touchstart logic here
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);


  //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://videostack.onrender.com/api/v1/get-user-information", { headers });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-auto py-8 gap-4 text-white'>
      {!profile &&
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>}
      {profile &&
        <>
          <div className='w-full md:w-1/6'>
            <Sidebar data={profile} />
          </div>
          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      }
    </div>
  );
}

export default Profile;

