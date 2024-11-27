import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";

const Main = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <Navbar />
            <div className='pt-20 min-h-screen'>
                <Outlet />
            </div>
            <Footer />

        </div>
    );
};

export default Main;