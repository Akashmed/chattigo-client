import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useUsers from "./useUsers";
import { receivedRqsts } from "../Api/route";

const useRequests = () => {
    const { user, loading } = useAuth();
    const [users, isLoading] = useUsers();
    const isLoadingAll = isLoading || loading;

    let me = null;
    if (!isLoadingAll) {
        me = users.find(usr => usr.name === user?.displayName)
    }


    const { data: requests, isLoading: ldng, refetch } = useQuery({
        enabled: !isLoading && !!user && !!me,
        queryKey: ['requestsCount & senderInfo', me?._id],
        queryFn: () => receivedRqsts(me?._id)
    })

    return [requests, ldng, refetch];
};

export default useRequests;