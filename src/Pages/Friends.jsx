import Skeleton from "../Components/Loader/Skeleton"
import Container from "../Components/Shared/Container";
import { Link, useParams } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";
import useFriends from "../Hooks/useFriends";
import { Helmet } from "react-helmet-async";
import Empty from "../Components/Shared/Empty";

const Friends = () => {
    const [friends, ldng] = useFriends();
    const {Id} = useParams();

    

    if (ldng) return <Skeleton></Skeleton>
    return (
        <Container>
            <Helmet>
                <title>Chattigo | Friends</title>
            </Helmet>
            <div className="flex flex-col items-center md:pt-4 pt-8 gap-4">
                {friends.length > 0 ? (
                    friends.map(user => (
                        <Link to={`/profile/${user._id}`} className="block w-full md:w-2/5" key={user._id} >
                            <ProfileCard name={user.name} photo={user.photo}>
                            </ProfileCard>
                        </Link>
                    ))
                ): <Empty/>}
            </div>
        </Container>
    );
};

export default Friends;