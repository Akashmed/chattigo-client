/* eslint-disable react/prop-types */

const ProfileCard = ({photo, name}) => {
  return (
    <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="w-16 h-16">
        <img
          src={photo}
          alt="Profile"
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="ml-4 text-lg font-semibold">{name}</div>
    </div>
  );
};

export default ProfileCard;
