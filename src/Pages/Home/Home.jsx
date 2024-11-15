import { Helmet } from "react-helmet-async";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Chattigo | Home</title>
            </Helmet>
            <header className="bg-white dark:bg-gray-900">
                <nav className="border-t-4 border-blue-500">
                    <div className="container flex items-center justify-between px-6 py-3 mx-auto">
                        <a href="#">
                            <img
                                className="w-auto h-6 sm:h-7"
                                src="https://merakiui.com/images/full-logo.svg"
                                alt=""
                            />
                        </a>

                        <a
                            className="my-1 text-sm font-medium text-gray-500 rtl:-scale-x-100 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 lg:mx-4 lg:my-0"
                            href="#"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </nav>

                <div className="container px-6 py-16 mx-auto">
                    <div className="items-center lg:flex">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                                    Welcome To <span className="text-blue-500">Chattigo</span>
                                </h1>

                                <p className="mt-3 text-gray-600 dark:text-gray-400">
                                    Connect. Share. <span className="font-medium text-blue-500">Go Beyond.</span>
                                </p>

                                <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                                    <Link to='users'
                                        className="w-auto px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                                    >
                                        Users <FaArrowRight />
                                    </Link>

                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                            <img
                                className="w-full h-full max-w-md"
                                src="https://merakiui.com/images/components/Email-campaign-bro.svg"
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