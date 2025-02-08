import React from 'react'
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ UserDivData, UserDiv, setUserDiv }) => {

  return (
    <>
      <div
        className={`${UserDiv} top-0 left-0 h-screen w-full bg-black opacity-60`}>
      </div>
      <div
        className={`${UserDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
        <div className='bg-gray-800 text-gray-300 rounded-lg border border-gray-600 p-6 w-[80%] md:w-[50%] lg:w-[40%]'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-semibold text-teal-400'>User Information</h1>
            <button onClick={() => setUserDiv("hidden")}>
              <RxCross1 className="text-gray-500 hover:text-gray-300" />
            </button>
          </div>
          <div className='mt-4'>
            <label>
              Username: <span className='font-semibold'>{UserDivData.username}</span>
            </label>
          </div>
          <div className='mt-4'>
            <label>
              Email: <span className='font-semibold'>{UserDivData.email}</span>
            </label>
          </div>
          <div className='mt-4'>
            <label>
              Address: <span className='font-semibold'>{UserDivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeeUserData