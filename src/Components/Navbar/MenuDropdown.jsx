import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import avatarImg from '../../assets/placeholder.jpg'
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const MenuDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useAuth();

    const handleLogout = async()=>{
        try{
            await logOut();
            toast.success('Logout successful');
        }catch(err){
            console.log(err);
            toast.error(err?.message);
        }
    }

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
                < AiOutlineMenu className='text-gray-900'/>
                <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                        className="rounded-full"
                        referrerPolicy="no-referrer"
                        src={user ? user.photoURL : avatarImg}
                        alt="profile"
                        height="30"
                        width="30"
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {user ? <>
                            <Link
                                to="/profile"
                                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                                Profile
                            </Link>
                            <div 
                                onClick={handleLogout}
                                to="/signup"
                                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                                Logout
                            </div>
                        </> : <>
                            <Link
                                to="/login"
                                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                                Sign Up
                            </Link>
                        </>}

                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuDropdown;
