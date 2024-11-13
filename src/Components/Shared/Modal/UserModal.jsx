/* eslint-disable react/prop-types */
import { getRelation, setRelation } from "../../../Api/route";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UserModal = ({ isOpen, closeModal, name, photo, id, sid }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (isOpen) {
        const data = async () => {
            await getRelation(sid, id);
        }
        console.log(data);
    }

    // use tanstack to get relation . if status is known then convert connect button to send message with 
    // Link to chat inbox using route
   

    const handleConnect = async () => {
        try {
            const res = await setRelation(sid, id);
            console.log(res);
            if (res === 'exists') {
                toast.success('Wait for acceptance');
            } else {
                toast.success('Request sent');
            }

        } catch (err) {
            console.log(err);
            toast.error(err?.message)
        } finally {
            closeModal();
        }
    }

    const linkLogin = () => {
        navigate('/login');
    }

    return (
        <div className="relative flex justify-center">
            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-10 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div
                            className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                        >
                            <div className="flex items-center justify-center">
                                <img className="object-cover w-16 h-16 rounded-full ring ring-white" src={photo} alt="image" />

                            </div>

                            <div className="mt-4 text-center">
                                <h3 className="font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                    {name}
                                </h3>
                                {
                                    user ? <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        The user is not connected with you. Please connect before to continue.
                                    </p> : <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Login is required !
                                    </p>
                                }

                            </div>



                            <div className="mt-4 sm:mt-6 sm:flex sm:items-center sm:-mx-2">
                                <button
                                    onClick={closeModal}
                                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                >
                                    Cancel
                                </button>

                                {user ? (
                                    <button
                                        onClick={handleConnect}
                                        className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    >
                                        Connect
                                    </button>
                                ) : (
                                    <button onClick={linkLogin}
                                        className="w-full px-4 py-2 mt-3 text-center text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserModal;
