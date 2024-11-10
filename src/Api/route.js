import axiosSecure from ".";

// save users
export const saveUsers = async user => {
    const User = {
        name: user?.displayName,
        email: user?.email,
        photo: user.photoURL,
        lastLogIn: user?.metadata?.lastSignInTime,
        creationTime: user?.metadata?.creationTime
    };

    const { data } = await axiosSecure.put(`/users/${user.email}`, User);
    return data;
}

// get all users
export const allUsers = async () => {
    const { data } = await axiosSecure('/users');
    return data;
}

// get all messages
export const allmessages = async(id, rid) =>{
    const {data} = await axiosSecure(`/messages/${id}/${rid}`);
    return data ;
}