import { Link } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";
import Container from "../Components/Shared/Container";
import useRequests from "../Hooks/useRequests";
import EmptyState from "../Components/Empty state/EmptyState";
import { Helmet } from "react-helmet-async";
const Requests = () => {
    const [requests] = useRequests();

    return (
        <Container>
            <Helmet>
                <title>Requests</title>
            </Helmet>
            <div className="flex flex-col items-center gap-4">
                {requests?.requestsCount > 0 ? (
                    requests?.users.map(user => (
                        <Link to={`/profile/${user._id}`} className="block w-2/4" key={user._id} >
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