import { useState } from "react";
import { updateBio } from "../Api/route";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditBio = () => {
    const [text, setText] = useState('');
    const {Id} = useParams();
    const navigate = useNavigate();

    const handleUpdate = async() => {
        try{
            // Update bio
            await updateBio(Id, text);
            navigate(`/profile/${Id}`);
            toast.success('Bio updated');
            setText('');
        }catch(err){
            console.log(err);
            toast.error(err?.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center mt-10 w-1/3 mx-auto">
            <p className="text-gray-400 mb-4">Update Bio within 70 characters</p>
            <input
                className="w-full p-2 border bg-transparent text-white outline-none focus:border-none focus:outline-blue-600 border-gray-300 rounded-lg"
                type="text"
                placeholder="Update Bio..."
                maxLength={70}
                onChange={e => setText(e.target.value)}
            />
            <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-500 text-white w-full p-2 rounded-lg mt-2"
            >Update</button>
        </div>
    );
};

export default EditBio;