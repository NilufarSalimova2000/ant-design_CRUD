import axios from "axios";
import { loadState } from "./storage";

function getAccessToken() {
    const userData = loadState("userData");
    return userData ? userData.accessToken : null;
}


export const request = axios.create({
    baseURL: "http://localhost:3000"
})

request.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
