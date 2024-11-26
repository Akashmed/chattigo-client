/* eslint-disable react/prop-types */

const ProfileCard = ({ photo, name }) => {
  return (
    <div className="mx-auto hover:border border-white p-4 bg-teal-500 rounded-lg w-2/3 shadow-lg">
      <div className="flex items-center">
        <div className="w-16 h-16">
          <img
            src={photo}
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="ml-4 text-lg text-white font-semibold">{name}</div>
      </div>
    </div>
  );
};

export default ProfileCard;