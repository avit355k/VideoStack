import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";


const sidebar = ({ data }) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const role = useSelector((state) => state.auth.role);


    console.log(data);
    return (
        <div className='bg-zinc-800 p-4 rounded-md flex flex-col items-between justify-between h-[80vh]'>
            <div className='flex flex-col items-center justify-center'>
                <img
                    src="./images/user.png"
                    alt=""
                    className='h-[12vh] border-solid border-white'
                />
                <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                    {data.username}
                </p>
                <p className='mt-1 text-zinc-300'>
                    {data.email}
                </p>
                <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
            </div>

            {role === "user" &&
                <div className='w-full flex-col items-start justify-start hidden lg:flex'>
                    <Link
                        to="/Profile"
                        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                        Favourites
                    </Link>
                    <Link
                        to="/Profile/orderHistory"
                        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                        Order History
                    </Link>
                    <Link
                        to="/Profile/settings"
                        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                        Settings
                    </Link>
                </div>
            }
            {role === "admin" &&
                <div className='w-full flex-col items-start justify-start hidden lg:flex'>
                    <Link
                        to="/Profile"
                        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                        All Order
                    </Link>
                    <Link
                        to="/Profile/Add-Video"
                        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'
                    >
                        Add Video
                    </Link>
                </div>
            }
            <button
                className='flex items-center justify-center gap-2 w-full py-2 mt-4 text-white font-semibold bg-zinc-900 hover:bg-zinc-700 rounded transition-all duration-300 '
                onClick={() => {
                    dispatch(authActions.logout());
                    dispatch(authActions.changeRole("user"));
                    localStorage.clear("id");
                    localStorage.clear("token");
                    localStorage.clear("role");
                    history("/");
                }}
            >
                log out <IoLogOut className="mr-2" />
            </button>
        </div>
    );
};


export default sidebar