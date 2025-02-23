/* eslint-disable react/prop-types */
import { FaArrowRight } from "react-icons/fa6";

const Tabs = ({ on, input, setInput, handleSetOn, handleSearch }) => {

    return (
        <div className="flex gap-2 mt-3  md:gap-0 justify-between">
            <div className="hidden md:block lg:w-40" />
            <div className="flex overflow-x-auto overflow-y-hidden border-b whitespace-nowrap border-gray-700">
                <button onClick={handleSetOn} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center ${on ? 'border-blue-400 text-blue-300' : ' border-transparent text-white hover:border-gray-400'}  bg-transparent border-b-2 sm:px-4 whitespace-nowrap focus:outline-none `}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                    </svg>
                    <span className="mx-1 text-sm sm:text-base">Users</span>
                </button>

                <button onClick={handleSetOn} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center ${on ? 'border-transparent text-white hover:border-gray-400 ' : ' border-blue-400 text-blue-300'} bg-transparent border-b-2 sm:px-4 whitespace-nowrap focus:outline-none `}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                    </svg>
                    <span className="mx-1 text-sm sm:text-base">Friends</span>
                </button>
            </div>
            <div className="text-white md:w-auto w-1/2 flex items-center">
                <form onSubmit={handleSearch} className="flex items-center">
                    <div className="relative md:w-auto ml-auto">
                        <input
                            className="bg-transparent w-full border-b border-gray-700 rounded-lg outline-none focus:border-none focus:outline-blue-500 p-2 pr-10"
                            placeholder="Find here..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute bg-transparent top-1/2 right-2 transform -translate-y-1/2 text-blue-400"
                        >
                            <FaArrowRight className="text-2xl" />
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Tabs;