import axios from "axios";
import { removeCookie } from "./route";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true
})

// axios interceptor (intercept response and check unauthorized access)
axiosSecure.interceptors.response.use(response => response,
    async error => {
        console.log('error tracked in interceptor', error.response);
        if (error.response &&
            (error.response.status === 401) || (error.response.status === 403)) {
            await removeCookie();
            window.location.replace('/login');
        }

        return Promise.reject(error);
    }
)

export default axiosSecure;