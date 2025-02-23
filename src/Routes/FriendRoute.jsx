/* eslint-disable react/prop-types */
import useFriends from '../Hooks/useFriends';
import { useParams } from 'react-router-dom';
import Skeleton from '../Components/Loader/Skeleton';
import Empty from '../Components/Shared/Empty';
import useMessages from '../Hooks/useMessages';

const FriendRoute = ({ children }) => {
    const [friends, ldng] = useFriends();
    const [data, msgldng] = useMessages();
    const Id = useParams().Id;
    const friend = friends.find(friend => friend._id === Id);
    const msg = data.find(user => user._id === Id);

    if (ldng || msgldng) return <Skeleton />
    if (friend || msg) {
        return children;
    }
    return <Empty text='friend'/>;
};

export default FriendRoute;