import Container from "../Components/Shared/Container";
import useAuth from "../Hooks/useAuth";
import Skeleton from "../Components/Loader/Skeleton";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import useUsers from "../Hooks/useUsers";
import { HoverEffect } from "../Components/ui/HoverEffect";
import Tabs from "../Components/Tabs/Tabs";
import useFriends from "../Hooks/useFriends";
import { searchUsers } from "../Api/route";
import toast from "react-hot-toast";
import Empty from "../Components/Shared/Empty";

const Users = () => {
    const { user } = useAuth();
    const [users, isLoading] = useUsers();
    const [on, setOn] = useState(true);
    const [friends, ldng] = useFriends();
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    // Use useMemo to filter once data is available and prevent recalculating on each render
    const remaining = useMemo(() => {
        return users.filter(usr => usr.name !== user?.displayName);
    }, [users, user?.displayName]);

    const handleSearch = async e => {
        e.preventDefault();

        setInput('');
        try {

            if (on) {
                const srcResult = await searchUsers(input);
                const filtered = srcResult.filter(usr => usr.name !== user?.displayName);
                setSearchResults(filtered);
            } else {
                const srcFriends = friends.filter(frnd => frnd.name.toLowerCase().includes(input.toLowerCase()));
                setSearchResults(srcFriends);
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }

    }


    const handleSetOn = () => {
        setOn(!on);
        setSearchResults(null);
    }



    if (isLoading && ldng) return <Skeleton />;
    return (
        <Container>
            <div className="py-6 md:py-0">
                <Helmet>
                    <title>Chattigo | {on ? 'Users' : 'Friends'}</title>
                </Helmet>
                {user && <Tabs on={on}
                    input={input}
                    setInput={setInput}
                    handleSetOn={handleSetOn}
                    handleSearch={handleSearch} />
                }

                {
                    <div className="max-w-5xl mx-auto min-h-screen bg-fixed bg-cover px-8" style={{ backgroundImage: 'url("../../public/CHAT by.png")' }}>
                        {
                            searchResults ? (
                                searchResults.length > 0 ? (
                                    <HoverEffect items={searchResults}></HoverEffect>) : (
                                    <Empty text={on ? 'users' : 'friends'} />)
                            ) : on ? (
                                remaining && <HoverEffect items={remaining} />
                            ) : (
                                friends.length > 0 ? (<HoverEffect items={friends} />) : (
                                    <Empty />)
                            )
                        }
                    </div>

                }
            </div>

        </Container>
    );
};

export default Users;