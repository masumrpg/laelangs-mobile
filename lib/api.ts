import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Client-Type": "ANDROID",

    },
});

const httpClientPublic = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Client-Type": "ANDROID",
    },
});

export default httpClient;
export {
    httpClientPublic,
};