import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import ErrorPage from "../Components/ErrorPage";
import Main from "../Layout/Main";
import Users from "../Pages/Users";
import ChatInbox from "../Components/chatInbox";
import UserModal from "../Components/Shared/Modal/UserModal";
import PrivateRoute from "./PrivateRoute";
import UserBox from "../Pages/UserBox";
import Profile from "../Pages/Home/Profile";
import ProfileCard from "../Components/Card/ProfileCard";
import Messages from "../Pages/Messages";
import Requests from "../Pages/Requests";
import Friends from "../Pages/Friends";
import { Card } from "../Components/ui/HoverEffect";

export const router = createBrowserRouter([
    {
        path:'/',
        errorElement:<ErrorPage/>,
        element: <Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'users',
                element:<Users></Users>
            },
            {
                path:'user',
                element:<UserBox></UserBox>
            },
            {
                path:'messages',
                element:<Messages></Messages>
            },
            {
                path:'requests',
                element:<Requests></Requests>
            },
            {
                path:'friends',
                element:<Friends></Friends>
            },
            
        ]
    },
    {
        path:'/signup',
        element:<Signup></Signup>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/inbox/:Id',
        element:<PrivateRoute><ChatInbox></ChatInbox></PrivateRoute>,
    },
    {
        path:'/profile/:Id',
        element:<PrivateRoute><Profile/></PrivateRoute>
    },
    {
        path:'/card',
        element:<ProfileCard></ProfileCard>
    },
    {
        path:'hello',
        element:<Card></Card>
    }
])