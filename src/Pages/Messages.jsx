import { Link } from "react-router-dom";
import ProfileCard from "../Components/Card/ProfileCard";
import Container from "../Components/Shared/Container";
import useMessages from "../Hooks/useMessages";
const Messages = () => {
    const [data] = useMessages();
    return (
        <Container>
            <div className="flex flex-col items-center gap-4">
                {data?.messagesCount > 0 && (
                    data?.users.map(user => (
                        <Link to={`/inbox/${user._id}`} className="block w-2/4" key={user._id} >
                            <ProfileCard name={user.name} photo={user.photo}>
                            </ProfileCard>
                        </Link>
                    ))
                )}
            </div>
        </Container>

    );
};

export default Messages;