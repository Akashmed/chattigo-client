import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useUsers from "./useUsers";
import { getFriends } from "../Api/route";

const useFriends = () => {
    const { user, loading } = useAuth();
    const [users, isLoading] = useUsers();
    const isLoadingAll = isLoading || loading;

    let me = null;
    if (!isLoadingAll) {
        me = users.find(usr => usr.name === user?.displayName)
    }

    const { data: friends = [], isLoading: ldng } = useQuery({
        enabled: !!user && !isLoadingAll && !!me,
        queryKey: ['relation', me?._id],
        queryFn: () => {
            if (me?._id) {
                return getFriends(me._id);
            }
            return null;
        },
    });

    return [friends, ldng];
};

export default useFriends;