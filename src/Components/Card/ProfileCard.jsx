/* eslint-disable react/prop-types */

const ProfileCard = ({ photo, name, count }) => {
  return (
    <div className="mx-auto hover:dark:bg-gray-700 border-white p-4 dark:bg-gray-800 rounded-lg w-auto shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center">
          <div className="w-16 h-16">
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="ml-4 text-lg text-white font-semibold">{name}</div>
        </div>
        <div>
          {
            count && <div className="flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5">{count}</div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;