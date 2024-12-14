import { Link } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";
import Container from "../Components/Shared/Container";
import useRequests from "../Hooks/useRequests";
import EmptyState from "../Components/Empty state/EmptyState";
import { Helmet } from "react-helmet-async";
import Skeleton from "../Components/Loader/Skeleton";
const Requests = () => {
    const [requests, ldng] = useRequests();
    if (ldng) return <Skeleton/>
    return (
        <Container>
            <Helmet>
                <title>Requests</title>
            </Helmet>
            <div className="flex flex-col items-center pt-8 md:pt-2 space-y-3 w-full">
                {requests?.requestsCount > 0 ? (
                    requests?.users.map(user => (
                        <Link to={`/profile/${user._id}`} className="block w-full md:w-1/3" key={user._id} >
                            <ProfileCard name={user.name} photo={user.photo}>
                            </ProfileCard>
                        </Link>
                    ))
                ): <EmptyState message="No requests yet" />}
            </div>
        </Container>

    );
};

export default Requests;