import React from 'react';
import { FaStar } from 'react-icons/fa';

export const getColor = (rating) => {
  if (rating >= 4) return 'text-green-500';
  if (rating >= 2) return 'text-yellow-500';
  return 'text-red-500';
};

const Rating = ({ avgrating, reviewCount }) => {
  return (
    <div className="flex items-center gap-1 bg-black/80 rounded-lg px-2 py-2 text-white text-sm font-medium">
      <div className="flex items-center gap-1">
        <span>{avgrating.toFixed(1)}</span>
        <FaStar className={getColor(avgrating)} size={18} />
      </div>
      <div className="w-px h-4 bg-white"></div>
      <span>{reviewCount}</span>
    </div>
  );
};

export default Rating;
