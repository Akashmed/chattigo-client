import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";
import useAuth from "../../Hooks/useAuth";
import Skeleton from "../../Components/Loader/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { getRelation, setRelation, updateRelation } from "../../Api/route";
import toast from "react-hot-toast";

const Profile = () => {
    const { Id } = useParams();
    const [users, isLoading] = useUsers();
    const { user, loading } = useAuth();

    // Simplify state check for loading
    const isLoadingAll = isLoading || loading;

    // Default to null to prevent undefined errors
    let recipient = null;
    let sender = null;

    // Populate sender and recipient once users and auth are loaded
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

    // .some function returns in boolean 
    const meExists = sender?._id === Id;
    console.log(meExists)

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


    const date = new Date(recipient?.creationTime);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    if (isLoadingAll && ldng) return <Skeleton></Skeleton>
    return (
        <div className='flex justify-center items-center h-screen'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className='bg-white shadow-lg rounded-2xl w-3/5'>
                <img
                    alt='profile'
                    src='https://wallpapercave.com/wp/wp10784415.jpg'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={recipient?.photo}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='p-2 px-4 font-semibold text-xs text-white bg-pink-500 rounded-full'>
                        {recipient?.name}
                    </p>
                    <p className='mt-2 text-xl font-medium text-gray-800 '>
                        User Id: {recipient?._id}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Since
                                <span className='font-bold text-black '>
                                    {formattedDate}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{recipient?.email}</span>
                            </p>

                            <div>
                                {relation ?
                                    (
                                        relation?.status !== 'known' ? relation?.senderId === sender?._id ? 'request sent' : (
                                            <button onClick={acceptReq} className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                                Accept
                                            </button>)
                                            : (
                                                <Link to={`/inbox/${Id}`} className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                                    Send Message
                                                </Link>
                                            )
                                    ) : (
                                        meExists ?
                                            <Link to='/friends' className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                                Friends
                                            </Link> : <button
                                                onClick={handleConnect}
                                                className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                                Connect
                                            </button>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;