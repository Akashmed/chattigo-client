import Skeleton from "../Components/Loader/Skeleton"
import Container from "../Components/Shared/Container";
import { Link } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";
import useFriends from "../Hooks/useFriends";
import { Helmet } from "react-helmet-async";

const Friends = () => {
    const [friends, ldng] = useFriends();

    if (ldng) return <Skeleton></Skeleton>
    return (
        <Container>
            <Helmet>
                <title>Chattigo | Friends</title>
            </Helmet>
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