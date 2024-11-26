import Container from "../Components/Shared/Container";
import useAuth from "../Hooks/useAuth";
import Skeleton from "../Components/Loader/Skeleton";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import useUsers from "../Hooks/useUsers";
import { HoverEffect } from "../Components/ui/HoverEffect";

const Users = () => {
    const { user } = useAuth();
    const [users, isLoading] = useUsers();

    // Use useMemo to filter once data is available and prevent recalculating on each render
    const remaining = useMemo(() => {
        return users.filter(usr => usr.name !== user?.displayName);
    }, [users, user?.displayName]);

    if (isLoading) return <Skeleton />;
    return (
        <Container>
            <Helmet>
                <title>Chattigo | Users</title>
            </Helmet>
            {/* <div className="border-2 p-3 grid md:grid-cols-4 grid-cols-2 gap-3 text-white min-h-screen rounded-xl">
                {remaining && remaining.map(user => <Link
                    to={`/profile/${user._id}`}
                    key={user._id}
                    state={{ name: user.name, photo: user.photo }}>
                    <UserBox name={user.name} sid={sid} photo={user.photo} id={user._id}></UserBox>
                </Link>)}
            </div> */}
            <div className="max-w-5xl mx-auto min-h-screen bg-fixed bg-cover px-8" style={{ backgroundImage: 'url("../../public/CHAT by.png")' }}>
                <HoverEffect items={remaining}></HoverEffect>
            </div>
        </Container>
    );
};

export default Users;