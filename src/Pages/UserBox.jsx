/* eslint-disable react/prop-types */


const UserBox = ({ name, photo,}) => {

    return (
        <div className="w-full max-w-xs h-[350px] overflow-hidden rounded-lg shadow-lg bg-gray-800">
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
            </div>
        </div>
    );
};

export default UserBox;
