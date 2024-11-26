/* eslint-disable react/prop-types */
import useAuth from "../Hooks/useAuth"
import Skeleton from "../Components/Loader/Skeleton"
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Skeleton />;
    }
    if (user) {
        return children;
    };
    return <Navigate to='/login' state={{ from: location }} replace={true}></Navigate>
};

export default PrivateRoute;