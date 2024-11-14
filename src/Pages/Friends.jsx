import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useUsers from "../Hooks/useUsers";
import Skeleton from "../Components/Loader/Skeleton"
import { getFriends } from "../Api/route";
import Container from "../Components/Shared/Container";
import { Link } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";

const Friends = () => {
    const [users, isLoading] = useUsers();
    const { user, loading } = useAuth();

    const isLoadingAll = isLoading || loading;

    let sender = null;

    if (!isLoadingAll) {
        sender = users?.find(usr => usr.name === user?.displayName);
    }

    // Check if recipient and sender are defined before running the query
    const { data: friends = [], isLoading: ldng } = useQuery({
        enabled: !!user && !isLoadingAll && !!sender,
        queryKey: ['relation', sender?._id],
        queryFn: () => {
            if (sender?._id) {
                return getFriends(sender._id);
            }
            return null;
        },
    });

    if (ldng) return <Skeleton></Skeleton>
    console.log(friends);

    return (
        <Container>
            <div className="flex flex-col items-center gap-4">
                {friends && (
                    friends.map(user => (
                        <Link to={`/profile/${user._id}`} className="block w-2/4" key={user._id} >
                            <ProfileCard name={user.name} photo={user.photo}>
                            </ProfileCard>
                        </Link>
                    ))
                )}
            </div>
        </Container>
    );
};

export default Friends;