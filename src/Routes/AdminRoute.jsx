/* eslint-disable react/prop-types */
import useAuth from "../Hooks/useAuth"
import Skeleton from "../Components/Loader/Skeleton"
import { Navigate} from "react-router-dom";
import useUsers from "../Hooks/useUsers";
import { useMemo } from "react";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [users, isLoading] = useUsers();

    const me = useMemo(() => {
        return users.find(usr => usr.name == user?.displayName);
    }, [users, user?.displayName]);

    if (loading || isLoading) {
        return <Skeleton />;
    }
    if (me?.role === 'Admin') {
        return children;
    };
    return <Navigate to='/'></Navigate>
};

export default AdminRoute;