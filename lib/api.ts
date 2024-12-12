import axios from "axios";

export const baseURL = process.env.EXPO_PUBLIC_API_URL ? process.env.EXPO_PUBLIC_API_URL : "http://54.151.158.131:8443/api";

const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "Client-Type": "ANDROID",

    },
});

const httpClientPublic = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "Client-Type": "ANDROID",
    },
});

export default httpClient;
export {
    httpClientPublic,
};