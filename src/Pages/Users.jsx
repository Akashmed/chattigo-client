import { useQuery } from "@tanstack/react-query";
import Container from "../Components/Shared/Container";
import { allUsers } from "../Api/route";
import UserBox from "./UserBox";
import useAuth from "../Hooks/useAuth";
import Skeleton from "../Components/Loader/Skeleton";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Users = () => {
    const { user } = useAuth();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: allUsers,
    });
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
            <div className="border-2 p-3 grid md:grid-cols-4 grid-cols-2 gap-3 text-white min-h-screen rounded-xl">
                {remaining && remaining.map(user => <Link
                    to={`/inbox/${user._id}`}
                    key={user._id}
                    state={{ name: user.name, photo: user.photo }}>
                    <UserBox name={user.name} photo={user.photo}></UserBox>
                </Link>)}
            </div>
        </Container>
    );
};

export default Users;