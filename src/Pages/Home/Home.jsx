import { Helmet } from "react-helmet-async";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import img from '../../../public/cover p.png'
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import About from "../About/About";
const Home = () => {
    const [on, setOn] = useState(false);
    const toggle = () => {
        setOn(!on);
    };
    return (
        <div className="relative w-full">
            <Helmet>
                <title>Chattigo | Home</title>
            </Helmet>
            <About on={on} toggle={toggle} />
            <header className="bg-gray-900">
                <div className="container px-6 py-16 mx-auto">
                    <div className="items-center lg:flex">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                                    Welcome To <span className="text-blue-500">Chattigo</span>
                                </h1>

                                <p className="mt-3 text-gray-400">
                                    Connect. Share. <span className="font-medium text-blue-500">Go Beyond.</span>
                                </p>

                                <div className="flex  mt-6  space-y-0 flex-row">
                                    <Link
                                        to="users"
                                        className="w-auto px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                                    >
                                        Users <FaArrowRight />
                                    </Link>
                                    <button onClick={()=>setOn(true)}
                                        title="About Chattigo"
                                        className="w-auto px-5 py-2 text-sm ml-3 tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                                    >
                                        <FaInfoCircle />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full mt-6 lg:mt-4 lg:w-1/2">
                            <img
                                className="w-full h-full max-w-md"
                                src={img}
                                alt="email illustration vector art"
                            />
                        </div>
                    </div>
                </div>
            </header>
            
        </div>
    );
};

export default Home;