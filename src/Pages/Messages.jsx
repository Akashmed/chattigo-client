import { Outlet, useNavigate } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";
import Container from "../Components/Shared/Container";
import useMessages from "../Hooks/useMessages";
import { Helmet } from "react-helmet-async";
import useFriends from "../Hooks/useFriends";
import { useState } from "react";
import Skeleton from "../Components/Loader/Skeleton";
const Messages = () => {
    const [data,,refetch] = useMessages();
    const [friends, ldng] = useFriends();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const navigate = useNavigate();

    let mergedFriends = [];
    if (data && friends) {
        mergedFriends = [
            ...data,
            ...friends.filter(friend => !data.some(user => user._id === friend._id))
        ];
    }

    // Handle profile card click
    const handleProfileClick = (friend) => {
        setSelectedFriend(null);
        refetch();
        setTimeout(() => {
            setSelectedFriend(friend);
            navigate(`/messages/inbox/${friend._id}`);
        }, 100);
    };

    if (ldng) return <Skeleton></Skeleton>
    return (
        <Container>
            <Helmet>
                <title>Messages</title>
            </Helmet>
            <div className="flex justify-center h-screen">
                {/* Friends List (Left Side) */}
                <div className={`flex flex-col items-center space-y-3 w-1/3 ${selectedFriend && 'hidden md:block'}`}>
                    {mergedFriends.map(friend => (
                        <div
                            key={friend._id}
                            onClick={() => handleProfileClick(friend)}
                            className={`block w-full md:p-2 rounded-md  cursor-pointer ${selectedFriend && selectedFriend._id === friend._id ? 'bg-gray-600' : ''}`}
                        >
                            <ProfileCard
                                name={friend.name}
                                photo={friend.photo}
                                count={friend.messageCount}
                            />
                        </div>
                    ))}
                </div>

                {/* Chat Inbox (Right Side) */}
                <div className={`flex-1 -mt-8 md:-mt-16 relative ${selectedFriend ? 'block' : 'hidden'}`}>
                    {selectedFriend && (
                        <div className="absolute top-0 left-0 w-full -translate-y-4">

                            <Outlet />
                        </div>
                    )}
                </div>
            </div>
        </Container>

    );
};

export default Messages;