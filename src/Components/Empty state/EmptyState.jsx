/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { IoArrowBackOutline } from "react-icons/io5";

const EmptyState = ({ message, address, label }) => {
    return (
      <div className='h-screen gap-5 flex flex-col justify-center items-center pb-16 '>
        <p className='text-gray-600 text-xl lg:text-3xl'>{message}</p>
        <Link to={address}>
            <button className='bg-blue-600 flex items-center justify-center text-white px-4 py-2 rounded-lg mt-5'>
                <IoArrowBackOutline className="mr-1"/>{label}
            </button>
        </Link>
      </div>
    )
  }
  
  export default EmptyState