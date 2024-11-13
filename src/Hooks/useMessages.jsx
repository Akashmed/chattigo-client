import { useQuery } from "@tanstack/react-query";
import { receivedMsgs } from "../Api/route";
import useAuth from "./useAuth";
import useUsers from "./useUsers";

const useMessages = () => {
    const { user, loading } = useAuth();
    const [users, isLoading] = useUsers();
    const isLoadingAll = isLoading || loading;

    let me = null;
    if (!isLoadingAll) {
        me = users.find(usr => usr.name === user?.displayName)
    }


    const { data, isLoading: ldng, refetch } = useQuery({
        enabled: !isLoading && !!user && !!me,
        queryKey: ['receivedMsgsCout & senderInfo', me?._id],
        queryFn: () => receivedMsgs(me?._id)
    })

    return [data, ldng, refetch];
};

export default useMessages;