import { FaArrowRight } from "react-icons/fa";
import useUsers from "../Hooks/useUsers";
import { AiOutlineUserDelete } from "react-icons/ai";
import useAuth from "../Hooks/useAuth";
import { useMemo, useState } from "react";
import { deleteUser, searchUsers } from "../Api/route";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Skeleton from "../Components/Loader/Skeleton";
import Empty from "../Components/Shared/Empty";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, isLoading, refetch] = useUsers();
    const { user, loading } = useAuth();
    const [search, setSearch] = useState(null);
    const navigate = useNavigate();

    const remaining = useMemo(() => {
        return users.filter(usr => usr.role !== 'Admin');
    }, [users]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        const searchResults = await searchUsers(search);
        const filtered = searchResults.filter(usr => usr.name !== user?.displayName);
        setSearch(filtered);
    }

    const handleDelete = async (id) => {
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
                    await deleteUser(id);
                    toast.success('User deleted successfully');
                    refetch();
                }
            });
            // ----
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    }
    if (loading && isLoading) return <Skeleton />;
    return (

        <div className="flex flex-col items-center space-y-8 bg-gray-900 pt-3 min-h-screen">
            <span className="text-2xl text-white">Manage Users</span>
            <div className="text-white flex items-center">
                <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative w-auto">
                        <input
                            className="bg-transparent w-full border-b border-gray-700 rounded-lg outline-none focus:border-none focus:outline-blue-500 p-2 pr-10"
                            placeholder="Find here..."
                            name="search"
                        />
                        <button
                            type="submit"
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-blue-400"
                        >
                            <FaArrowRight className="text-2xl" />
                        </button>
                    </div>
                </form>
                <button onClick={() => navigate('/')} className="text-2xl text-blue-400 ml-5"><FaHome /></button>
            </div>
            <div className="grid md:grid-cols-3 w-2/3 gap-4">
                {(search ? search : remaining).map((user) => (
                    <div key={user._id} className="w-auto flex items-center hover:bg-gray-700 justify-between bg-gray-800 rounded-lg shadow-lg p-4">
                        <div className="flex items-center gap-2">
                            <img
                                src={user.photo}
                                alt="user"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <p className="text-center text-gray-800 dark:text-white font-semibold">
                                {user.name}
                            </p>
                        </div>
                        <button title="delete user" onClick={() => handleDelete(user._id)} className="text-red-800 text-2xl"><AiOutlineUserDelete /></button>
                    </div>
                ))}
            </div>
            {search && search.length === 0 && <Empty />}
        </div>

    );
};

export default ManageUsers;