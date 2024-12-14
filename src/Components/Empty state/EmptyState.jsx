/* eslint-disable react/prop-types */

import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const EmptyState = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className='h-screen gap-5 flex flex-col justify-center items-center pb-16 '>
      <p className='text-gray-600 text-xl lg:text-3xl'>{message}</p>

      <button onClick={()=> navigate(-1)} className='bg-blue-600 flex items-center justify-center text-white px-4 py-2 rounded-lg mt-5'>
        <IoArrowBackOutline className="mr-1" />Go back
      </button>

    </div>
  )
}

export default EmptyState