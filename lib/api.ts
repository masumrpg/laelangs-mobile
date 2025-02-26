import axios from "axios";

export const baseURL =
    process.env.EXPO_PUBLIC_API_URL
        ? process.env.EXPO_PUBLIC_API_URL :
        "http://laelangs.site/api";
// "http://10.10.103.30:8081/api";

const httpClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Client-Type": "MOBILE",
    },
});

const httpClientPublic = axios.create({
    baseURL: baseURL,
    headers: {
        "Client-Type": "MOBILE",
    },
});

export default httpClient;
export {
    httpClientPublic,
};