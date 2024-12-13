import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import httpClient from "@/lib/api";
import { getAuthData, setAuthData } from "@/lib/secureStoreUtils";
import { authService } from "@/service/authService";
import { Router } from "expo-router";

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (token) {
            promise.resolve(token);
        } else {
            promise.reject(error);
        }
    });
    failedQueue = [];
};

const addAuthInterceptor = (router: Router) => {
    httpClient.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            const authData = await getAuthData();
            if (authData && config.headers) {
                config.headers.Authorization = `Bearer ${authData.accessToken}`;
            }
            return config;
        },
        (error: AxiosError) => Promise.reject(error),
    );

    httpClient.interceptors.response.use(
        (response: AxiosResponse) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };


            if (
                error.response?.status === 401 &&
                originalRequest &&
                !originalRequest._retry
            ) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
                            return httpClient(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const storedData = await getAuthData();
                    if (!storedData) throw new Error("No refresh token available");

                    try {
                        const response = await authService.refreshToken(storedData.refreshToken);
                        if (response.data) {
                            const { accessToken, refreshToken } = response.data;
                            const updatedAuthData = { ...storedData, accessToken, refreshToken };

                            await setAuthData(updatedAuthData);
                            processQueue(null, accessToken);

                            if (originalRequest.headers) {
                                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                            }
                            return httpClient(originalRequest);
                        }
                    } catch (error) {
                        console.log("Refresh token error: ", error);
                        router.replace("/auth/login");
                        return null;
                    }
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        },
    );
};

export default addAuthInterceptor;