import axiosSecure from ".";

// get token
export const getToken = async email => {
    const { data } = await axiosSecure.post('/jwt', { email });
    return data;
}

// remove cookie
export const removeCookie = async () => {
    const { data } = await axiosSecure.get('/logout');
    return data;
}

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
export const allmessages = async (id, rid) => {
    const { data } = await axiosSecure(`/messages/${id}/${rid}`);
    return data;
}

// post relations
export const setRelation = async (sid, rid) => {
    const doc = {
        senderId: sid,
        recepientId: rid,
        status: 'pending'
    }
    const { data } = await axiosSecure.post('/relations', doc);
    return data;
}

// get relation status
export const getRelation = async (myId, rId) => {
    const { data } = await axiosSecure(`/relation/${myId}/${rId}`);
    return data;
}

// update relation (accept relation)
export const updateRelation = async (myId, sId) => {
    const { data } = await axiosSecure.patch(`/accept/${myId}/${sId}`);
    return data;
}

// get received messages and senders
export const receivedMsgs = async (myId) => {
    const { data } = await axiosSecure(`/receivedMsg/${myId}`)
    return data;
}

// get all user requests and count
export const receivedRqsts = async (myId) => {
    const { data } = await axiosSecure(`/rqstsReceived/${myId}`)
    return data;
}

// get friends
export const getFriends = async (myId) => {
    const { data } = await axiosSecure(`/friends/${myId}`)
    return data;
}

// delete request or unfriend users
export const dltRelation = async (myId, id) => {
    const { data } = await axiosSecure.delete(`/dltRelations/${myId}/${id}`)
    return data;
}

// search users
export const searchUsers = async (name) => {
    const { data } = await axiosSecure(`/search?query=${name}`);
    return data;
}

// update user bio, name
export const updateBio = async (id, info) => {
    const { data } = await axiosSecure.patch(`/bio/${id}`, info );
    return data;
}

// delete user (Admin)
export const deleteUser = async (id) => {
    const { data } = await axiosSecure.delete(`/dltUser/${id}`);
    return data;
}