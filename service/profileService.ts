import httpClient from "@/lib/api";
import { CommonResponse, PagingResponse } from "@/shared/schema";
import { ProfileAddressesResponse, UserProfile } from "@/feature/profile/type";

export const profileService = {
    async create(formData: FormData) {
        const { data } = await httpClient.post<CommonResponse<UserProfile>>("/users/me", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(data);
        return data;
    },
    async getMe() {
        const { data } = await httpClient.get<CommonResponse<UserProfile>>("/users/me");
        return data;
    },
    async getAllAddress() {
        const { data } = await httpClient.get<PagingResponse<ProfileAddressesResponse[]>>("/users/me/address");
        return data;
    },
    async getAddress(id: string) {
        const { data } = await httpClient.get<CommonResponse<ProfileAddressesResponse>>(`/users/me/address/${id}`);
        return data;
    },
};