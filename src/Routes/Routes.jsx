import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import ErrorPage from "../Components/ErrorPage";
import Main from "../Layout/Main";
import Users from "../Pages/Users";
import ChatInbox from "../Components/chatInbox";
import { allUsers } from "../Api/route";

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
        element:<ChatInbox></ChatInbox>,
    }
])