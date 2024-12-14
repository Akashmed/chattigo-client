import { Outlet, useNavigate } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";
import Container from "../Components/Shared/Container";
import useMessages from "../Hooks/useMessages";
import { Helmet } from "react-helmet-async";
import useFriends from "../Hooks/useFriends";
import { useState } from "react";
import Skeleton from "../Components/Loader/Skeleton";
import EmptyState from "../Components/Empty state/EmptyState";
const Messages = () => {
    const [data] = useMessages();
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
            <div className="flex justify-center">
                {/* Friends List (Left Side) */}
                <div className={`flex flex-col items-center pt-8 md:pt-0 space-y-3 w-full md:w-1/3 ${selectedFriend && 'hidden md:block'}`}>
                    {mergedFriends.length > 0 ? (
                        mergedFriends.map(friend => (
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
                        ))
                    ) : <EmptyState message={'No messages yet'} />}
                </div>

                {/* Chat Inbox (Right Side) */}
                <div className={`flex-1 flex justify-center -mt-8 md:-mt-16 relative ${selectedFriend ? 'block' : 'hidden'}`}>
                    {selectedFriend && (
                        <div className="fixed w-full z-10 md:w-2/4">

                            <Outlet />
                        </div>
                    )}
                </div>
            </div>
        </Container>

    );
};

export default Messages;