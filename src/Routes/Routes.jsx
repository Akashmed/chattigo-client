import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import ErrorPage from "../Components/ErrorPage";
import Main from "../Layout/Main";
import Users from "../Pages/Users";
import ChatInbox from "../Components/chatInbox";
import PrivateRoute from "./PrivateRoute";
import UserBox from "../Pages/UserBox";
import Profile from "../Pages/Home/Profile";
import ProfileCard from "../Components/Card/ProfileCard";
import Messages from "../Pages/Messages";
import Requests from "../Pages/Requests";
import Friends from "../Pages/Friends";
import EditBio from "../Pages/EditBio";
import ManageUsers from "../Pages/ManageUsers";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage />,
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'users',
                element: <Users></Users>
            },
            {
                path: 'user',
                element: <UserBox></UserBox>
            },
            {
                path: 'messages',
                element: <PrivateRoute><Messages></Messages></PrivateRoute>,
                children: [
                    {
                        path: '/messages/inbox/:Id',
                        element: <PrivateRoute><ChatInbox></ChatInbox></PrivateRoute>,
                    }
                ]
            },
            {
                path: 'requests',
                element: <PrivateRoute><Requests></Requests></PrivateRoute>
            },
            {
                path: 'friends/:Id',
                element: <PrivateRoute><Friends></Friends></PrivateRoute>
            },
            {
                path: 'edit/:Id',
                element: <PrivateRoute><EditBio></EditBio></PrivateRoute>
            }

        ]
    },
    {
        path: '/signup',
        element: <Signup></Signup>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/inbox/:Id',
        element: <PrivateRoute><ChatInbox></ChatInbox></PrivateRoute>,
    },
    {
        path: '/profile/:Id',
        element: <PrivateRoute><Profile /></PrivateRoute>
    },
    {
        path: '/admin',
        element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
    }
])