/* eslint-disable react/prop-types */

const Empty = ({text}) => {
    return (
        <div className="h-[70vh] bg-transparent text-2xl text-gray-400 flex justify-center items-center">
            {
                text ? <span>No such {text} found</span> : <span>Not found</span>
            }
            
        </div>
    );
};

export default Empty;