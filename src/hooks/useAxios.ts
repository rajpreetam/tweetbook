import { isTokenExpired } from "@/utils";
import axios from "axios";
import { useSession } from "next-auth/react";

const useAxios = () => {
    const session = useSession();
    const access = session.data?.user.access;
    const refresh = session.data?.user.refresh;

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: {
            Authorization: `Bearer ${access}`
        }
    });

    axiosInstance.interceptors.request.use(
        async req => {
            const isAccessExpired = isTokenExpired(access ?? '');

            if(!isAccessExpired) return req;

            const refreshRes = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {refresh});
            if(session.data) {
                session.data.user.access = refreshRes.data.access;
            }
            req.headers.Authorization = `Bearer ${refreshRes.data.access}`
            return req;
        }
    );

    return axiosInstance;
}

export default useAxios;