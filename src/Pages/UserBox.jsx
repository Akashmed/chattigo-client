/* eslint-disable react/prop-types */

import { useState } from "react";
import UserModal from "../Components/Shared/Modal/UserModal";


const UserBox = ({ name, photo, id, sid }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        // setIsOpen was not working directly that's why we used setTimeout
        setTimeout(() => setIsOpen(false), 0);
    }

    return (
        <div className="w-full max-w-xs h-[350px] overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img
                className="object-cover w-full h-56"
                src={photo}
                alt="avatar"
            />
            <div className="py-5 text-center">
                <span
                    className="block text-xl font-bold text-gray-800 dark:text-white"
                    tabIndex="0"
                    role="link"
                >
                    {name}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                    Software Engineer
                </span><br/>
                <button  onClick={() => setIsOpen(true)} className="border p-2">connect</button>
            </div>
            <UserModal isOpen={isOpen} closeModal={closeModal} sid={sid} name={name} photo={photo} id={id}></UserModal>
        </div>
    );
};

export default UserBox;
