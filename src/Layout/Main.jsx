import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Main = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <Navbar />
            <div className='pt-20 min-h-[calc(100vh-68px)]'>
                <Outlet />
            </div>

        </div>
    );
};

export default Main;