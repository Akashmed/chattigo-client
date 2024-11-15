import { Link } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";
import Container from "../Components/Shared/Container";
import useRequests from "../Hooks/useRequests";
const Requests = () => {
    const [requests] = useRequests();

    return (
        <Container>
            <div className="flex flex-col items-center gap-4">
                {requests?.requestsCount > 0 && (
                    requests?.users.map(user => (
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

export default Requests;