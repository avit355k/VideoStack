import React, { useEffect, useState } from 'react'
import axios from 'axios'
import VideoCard from '../VideoCard/VideoCard'
import Loader from '../Loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const TopRated = () => {
    const [Data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://videostack.onrender.com/api/v1/top-rated-videos");

            setData(response.data.data);
            setIsLoading(false);
        };
        fetch();
    }, []);

    return (
        <div className='px-5 sm:px-6 md:px-8 lg:px-12 h-auto py-8'>
            <h1 className='text-2xl text-white font-serif font-bold mb-8 md:text-left '>Fan Favourites</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
                    speed={400}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                >
                    {Data && Data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <VideoCard data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

export default TopRated