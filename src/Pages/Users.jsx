import Container from "../Components/Shared/Container";
import useAuth from "../Hooks/useAuth";
import Skeleton from "../Components/Loader/Skeleton";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import useUsers from "../Hooks/useUsers";
import { HoverEffect } from "../Components/ui/HoverEffect";
import Tabs from "../Components/Tabs/Tabs";
import useFriends from "../Hooks/useFriends";

const Users = () => {
    const { user } = useAuth();
    const [users, isLoading] = useUsers();
    const [on, setOn] = useState(true);
    const [friends, ldng] = useFriends();
    // Use useMemo to filter once data is available and prevent recalculating on each render
    const remaining = useMemo(() => {
        return users.filter(usr => usr.name !== user?.displayName);
    }, [users, user?.displayName]);

    const handleSetOn = () => {
        setOn(!on);
    }

    if (isLoading) return <Skeleton />;
    return (
        <Container>
            <Helmet>
                <title>Chattigo | {on? 'Users': 'Friends'}</title>
            </Helmet>
            { user && <Tabs on={on} handleSetOn={handleSetOn}></Tabs>}
            {/* <div className="border-2 p-3 grid md:grid-cols-4 grid-cols-2 gap-3 text-white min-h-screen rounded-xl">
                {remaining && remaining.map(user => <Link
                    to={`/profile/${user._id}`}
                    key={user._id}
                    state={{ name: user.name, photo: user.photo }}>
                    <UserBox name={user.name} sid={sid} photo={user.photo} id={user._id}></UserBox>
                </Link>)}
            </div> */}
            {
                <div className="max-w-5xl mx-auto min-h-screen bg-fixed bg-cover px-8" style={{ backgroundImage: 'url("../../public/CHAT by.png")' }}>
                    {on ? (

                        remaining && <HoverEffect items={remaining}></HoverEffect>

                    ) : (

                        friends && <HoverEffect items={friends}></HoverEffect>

                    )}
                </div>

            }

        </Container>
    );
};

export default Users;