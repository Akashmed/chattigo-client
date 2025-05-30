import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";
import useAuth from "../../Hooks/useAuth";
import Skeleton from "../../Components/Loader/Skeleton";
import pCover from "../../../public/CHAT by.png";
import { useQuery } from "@tanstack/react-query";
import { FaUserMinus } from "react-icons/fa";
import { dltRelation, getRelation, setRelation, updateRelation } from "../../Api/route";
import { FaEdit, FaHome } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Profile = () => {
    const { Id } = useParams();
    const [users, isLoading] = useUsers();
    const { user, loading } = useAuth();
    const navigate = useNavigate();


    const isLoadingAll = isLoading || loading;

    let recipient = null;
    let sender = null;

    if (!isLoadingAll) {
        recipient = users?.find(usr => usr._id === Id);
        sender = users?.find(usr => usr.name === user?.displayName);
    }

    // Check if recipient and sender are defined before running the query
    const { data: relation, isLoading: ldng, refetch } = useQuery({
        enabled: !!user && !isLoadingAll && !!recipient && !!sender,
        queryKey: ['relation', sender?._id, recipient?._id],
        queryFn: () => {
            if (sender?._id && recipient?._id) {
                return getRelation(sender._id, recipient._id);
            }
            return null;
        },
    });


    // returns in boolean 
    const meExists = sender?._id === Id;

    const handleConnect = async () => {
        try {
            const res = await setRelation(sender?._id, recipient?._id);
            console.log(res);
            refetch();
            if (res === 'exists') {
                toast.success('Wait for acceptance');
            } else {
                toast.success('Request sent');
            }

        } catch (err) {
            console.log(err);
            toast.error(err?.message)
        }
    }

    const acceptReq = async () => {
        try {
            const result = await updateRelation(sender?._id, recipient?._id)
            toast.success('Request accepted');
            refetch();
        } catch (err) {
            console.log(err);
            toast.error("Error accepting request")
        }
    }

    const deleteRelation = async () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                background: "#1a202c",
                color: "#f9fafb",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes !",
                cancelButtonText: "No",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const result = await dltRelation(sender?._id, recipient?._id)
                    toast.success('Disconnection successful');
                    refetch();
                }
            });

        } catch (err) {
            console.log(err);
            toast.error("An error occured");
        }
    }


    const date = new Date(recipient?.creationTime);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });


    if (isLoadingAll || ldng) {
        return <Skeleton />;
    }
    return (
        <div className='bg-gray-900 flex justify-center items-center h-screen'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='bg-gray-800 shadow-lg border-t-2 border-gray-800 rounded-2xl w-3/4 md:w-3/6'>
                <img
                    alt='profile'
                    src={pCover}
                    className='w-full mb-4 object-cover rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 relative -mt-16'>
                    <Link to='#' className='relative block'>
                        <img
                            alt='profile'
                            src={recipient?.photo}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </Link>

                    <p className='p-2 px-4 mt-1 font-bold text-sm text-black bg-blue-400 rounded-full'>
                        {recipient?.name}
                    </p>
                    <p className='mt-2  sm:text-center text-gray-400 '>
                        {meExists ? sender?.bio : recipient?.bio}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap space-y-4 items-center justify-between text-sm text-gray-300 '>
                            <div className="md:flex justify-between w-full space-y-2 md:w-2/3">
                                <p className='flex flex-col'>
                                    Since
                                    <span className='font-bold text-gray-300 '>
                                        {formattedDate}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    Email
                                    <span className='font-bold text-gray-300'>{recipient?.email}</span>
                                </p>
                            </div>

                            <div>
                                {relation ?
                                    (
                                        relation?.status !== 'known' ? relation?.senderId === sender?._id ? <>
                                            <button onClick={deleteRelation} className='bg-red-600 font-semibold px-10 py-1 rounded-lg text-white cursor-pointer  hover:bg-red-700 block mb-1'>
                                                Cancel Req
                                            </button>
                                        </> : <>
                                            <button onClick={acceptReq} className='bg-blue-500 font-semibold px-10 py-1 rounded-lg text-white cursor-pointer  hover:bg-blue-600 block mb-2'>
                                                Accept
                                            </button>
                                            <button onClick={deleteRelation} className='bg-red-600 font-semibold px-10 py-1 rounded-lg text-white cursor-pointer  hover:bg-red-700 block'>
                                                Delete
                                            </button>
                                        </>
                                            : <>
                                                <Link to={`/inbox/${Id}`} className='bg-blue-500 text-center px-10 py-1 rounded-lg text-white font-semibold cursor-pointer  hover:bg-blue-600 block mb-1'>
                                                    Message
                                                </Link>
                                                <button onClick={deleteRelation} className='bg-red-600 px-10 py-1 rounded-lg text-white font-semibold cursor-pointer  hover:bg-red-700 block mt-2'>
                                                    Disconnect
                                                </button>

                                            </>

                                    ) : (
                                        meExists ?
                                            <Link to={`/friends/${Id}`} className='bg-blue-500 font-semibold px-10 py-1 rounded-lg text-white cursor-pointer  hover:bg-blue-600 block mb-1'>
                                                Friends
                                            </Link> : <button
                                                onClick={handleConnect}
                                                className='bg-blue-500 px-10 py-1 rounded-lg text-white  font-semibold cursor-pointer  hover:bg-blue-600 block mb-1'>
                                                Connect
                                            </button>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    {meExists && <Link to={`/edit/${sender?._id}`}
                        title="update bio"
                        className="absolute top-16 right-12 md:right-16 text-xl text-blue-400 hover:text-blue-600 "><FaEdit />
                    </Link>}

                    <button onClick={() => navigate('/')} className={`absolute top-16 right-4 md:right-8 text-xl text-blue-400 hover:text-blue-600`}><FaHome /></button>
                </div>
            </div>
        </div>
    )
};

export default Profile;