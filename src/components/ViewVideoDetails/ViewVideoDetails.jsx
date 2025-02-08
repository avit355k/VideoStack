import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Rating from '../RatingReview/Rating';
import ReviewSummary from '../RatingReview/ReviewSummary';
import ReviewList from '../RatingReview/ReviewList';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';


const ViewVideoDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [summary, setSummary] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);


    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    console.log(isLoggedIn);
    console.log(role);


    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                // Fetch video details
                const videoResponse = await axios.get(
                    `https://videostack.onrender.com/api/v1/get-video-by-id/${id}`
                );
                setData(videoResponse.data.data);

            } catch (error) {
                console.error("Error fetching video data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideoDetails();
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        videoid: id,
    };


    const handleFavourite = async () => {
        try {
            const response = await axios.put(
                `https://videostack.onrender.com/api/v1/add-video-to-favourite`,
                {}, // No body data
                { headers }
            );


            // Additional logic here (e.g., updating state/UI)
            alert(response.data.message);
        } catch (error) {
            console.error("Error adding video to favourites:", error);
        }
    };


    const handleCart = async () => {
        try {
            const response = await axios.put(
                `https://videostack.onrender.com/api/v1/add-to-cart`,
                {}, // No body data
                { headers }
            );
            alert(response.data.message);
        } catch (error) {
            console.error("Error adding video to cart:", error);
        }
    };

    const deleteVideo = async () => {
        try {
            const response = await axios.delete(
                `https://videostack.onrender.com/api/v1/delete-video`,
                { headers }
            );
            alert(response.data.message);
            navigate("/");
        } catch (error) {
            console.error("Error adding video to cart:", error);
        }
    };

    if (isLoading) {
        return <Loader />;
    }


    return (
        <>
            {data ? (
                <div>
                    <div className='bg-zinc-900 px-4 py-6 flex flex-col gap-6 sm:gap-8 lg:flex-row lg:justify-center lg:px-12 lg:py-8'>
                        <div className="bg-zinc-800 rounded p-4 w-full sm:w-[90%] lg:w-5/12 flex flex-col sm:flex-row items-center justify-center gap-4 mx-auto lg:mx-0">
                            <img src={data.url} alt="" className='h-[40vh] sm:h-[50vh] lg:h-[70vh] max-w-full rounded' />


                            {isLoggedIn && role === "user" && (
                                <div className='flex flex-row md:flex-col gap-4 sm:gap-2 lg:gap-4 mt-4 sm:mt-0'>
                                    <button
                                        className='p-2 text-3xl sm:text-4xl rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-300 shadow-lg flex items-center justify-center'
                                        onClick={handleFavourite}
                                    >
                                        <FaHeart /> <span className="text-base sm:text-lg ml-2 block lg:hidden"> Add to Favourite</span>
                                    </button>
                                    <button className='p-2 text-3xl sm:text-4xl rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-300 shadow-lg flex items-center'
                                        onClick={handleCart}
                                    >
                                        <FaCartPlus />
                                        <span className="text-base sm:text-lg ml-2 block lg:hidden"> Add to cart</span>
                                    </button>
                                </div>
                            )}
                            {isLoggedIn && role === "admin" && (
                                <div className='flex flex-row md:flex-col gap-4 sm:gap-2 lg:gap-4 mt-4 sm:mt-0'>
                                    <Link to={`/Update-video/${id}`}
                                        className='p-2 text-3xl sm:text-4xl rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-300 shadow-lg flex items-center justify-center'>
                                        <FaEdit /> <span className="text-base sm:text-lg ml-2 block lg:hidden"> Edit</span>
                                    </Link>
                                    <button className='p-2 text-3xl sm:text-4xl rounded-full bg-white text-red-600 shadow-lg flex items-center'
                                        onClick={deleteVideo}>
                                        <MdDelete />
                                        <span className="text-base sm:text-lg ml-2 block lg:hidden"> Delete </span>
                                    </button>
                                </div>
                            )}
                        </div>


                        <div className="bg-zinc-900 p-4 w-full sm:w-[90%] lg:w-5/12 font-mono mx-auto lg:mx-0">
                            <div className='mb-3 w-2/12'>
                                <Rating avgrating={data.avgrating} reviewCount={data.reviewCount} />
                            </div>


                            <h2 className="text-2xl font-semibold text-white">{data.title}</h2>
                            <p className='mt-2 text-gray-500'>{data.desc}</p>
                            <p className="flex mt-4 items-center text-gray-600">
                                <GrLanguage className='mr-3' />
                                {data.language}
                            </p>
                            <p className="mt-2 text-gray-200">Price: RS.{data.price}</p>
                        </div>
                    </div>
                    <div>
                        {isLoggedIn && role === "user" && (
                            <ReviewSummary videoid={id} />
                        )}
                        <ReviewList videoid={id} />
                    </div>
                </div>

            ) : (
                <div className='h-screen bg-zinc-900 flex items-center justify-center'>
                    <Loader />
                </div>
            )}
        </>
    );
};


export default ViewVideoDetails;
