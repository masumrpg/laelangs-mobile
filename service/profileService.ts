import httpClient from "@/lib/api";
import { CommonResponse, PagingResponse } from "@/shared/schema";
import { ProfileAddressesResponse, UserProfile } from "@/feature/profile/type";
import { AddressSchema } from "@/feature/profile/schema";

export const profileService = {
    async createProfile(formData: FormData) {
        const { data } = await httpClient.post<CommonResponse<UserProfile>>("/users/me", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
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
    async createAddress(payload: AddressSchema) {
        const { data } = await httpClient.post<CommonResponse<ProfileAddressesResponse>>("/users/me/address", payload);
        return data;
    },
};