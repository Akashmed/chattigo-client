import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../Api/route";

const useUsers = () => {

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: allUsers,
    });

    return [users,isLoading,refetch] ;
};

export default useUsers;