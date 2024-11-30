import { updateBio } from "../Api/route";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useUsers from "../Hooks/useUsers";
import { useState } from "react";
import Skeleton from "../Components/Loader/Skeleton";
import { imageUpload } from "../Api/utensils";
import useAuth from "../Hooks/useAuth";

const EditBio = () => {
    const { Id } = useParams();
    const [users, isLoading, refetch] = useUsers();
    const { updateUserProfile } = useAuth();
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const user = users?.find(usr => usr._id === Id);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const bio = e.target.bio.value;
        const name = e.target.name.value;
        const img = e.target.image.files[0];

        const info = {
            bio,
            name
        }
        try {
            // Update bio
            const photo = img ? await imageUpload(img) : null;
            if (photo) {
                info.photo = photo?.data?.display_url;
            }
            await updateUserProfile(name, info.photo);
            await updateBio(Id, info);
            refetch();
            navigate(`/profile/${Id}`);
            toast.success('Updated successfully');
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    }

    return (
        <div className="flex flex-col items-center space-y-8 justify-center mt-10 w-1/2 md:w-1/3 mx-auto">
            <form className="w-full flex flex-col space-y-8" onSubmit={handleUpdate}>
                <div className="w-full flex flex-col">
                    <p className="text-gray-400 text-xl font-bold mb-1">Change Name</p>
                    <input
                        className="w-full p-2 border bg-transparent text-white outline-none focus:border-none focus:outline-blue-600 border-gray-300 rounded-lg"
                        type="text"
                        defaultValue={user?.name}
                        placeholder="Name here..."
                        maxLength={20}
                        name="name"
                    />
                </div>
                <div className="w-full">
                    <p className="text-gray-400 text-xl font-bold mb-1">Change Picture</p>
                    <label
                        htmlFor="dropzone-file"
                        className="flex items-center px-3 py-3 mx-auto text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-300 dark:bg-gray-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-300 dark:text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <h2 className="mx-3 text-gray-400">{image ? image : 'Profile Photo'}</h2>
                        <input onChange={(e) => setImage(e.target.files[0].name)} name='image' id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                <div className="w-full flex flex-col">
                    <p className="text-gray-400 text-xl font-bold mb-1">Update Bio</p>
                    <input
                        className="w-full p-2 border bg-transparent text-white outline-none focus:border-none focus:outline-blue-600 border-gray-300 rounded-lg"
                        type="text"
                        defaultValue={user?.bio}
                        placeholder="Within 70 characters..."
                        maxLength={70}
                        name="bio"
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-500 text-white w-full p-2 rounded-lg mt-2"
                    >Update
                    </button>
                </div>
            </form>

        </div>
    );
};

export default EditBio;