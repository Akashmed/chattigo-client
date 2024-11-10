/* eslint-disable react/prop-types */


const UserBox = ({ name, photo }) => {
    

    return (
        <div  className="w-full max-w-xs h-[350px] overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img
                className="object-cover w-full h-56"
                src={photo}
                alt="avatar"
            />
            <div className="py-5 text-center">
                <span
                    className="block text-xl font-bold text-gray-800 dark:text-white"
                    tabIndex="0"
                    role="link"
                >
                    {name}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                    Software Engineer
                </span>
            </div>
        </div>
    );
};

export default UserBox;
