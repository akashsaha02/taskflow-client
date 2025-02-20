import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

const useAxiosSecure = () => {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();
    // request interceptor to add autorization token to secure requests
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Intercept response and check for token expiration
    axiosSecure.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const status = error.response.status;

            if (status === 401 || status === 403) {
                await logoutUser();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
}

export default useAxiosSecure
