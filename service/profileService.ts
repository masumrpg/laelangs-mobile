import httpClient from "@/lib/api";
import { CommonResponse } from "@/shared/schema";
import { ProfileAddressesResponse } from "@/feature/profile/type";

export const profileService = {
    async create(payload: any) {
        const { data } = await httpClient.post("/users/me", payload);
        return data;
    },
    async update() {
    },
    async getAllAddress() {
        const { data } = await httpClient.get<CommonResponse<ProfileAddressesResponse[]>>("/users/me/address");
        return data;
    },
    async getAddress(id: string) {
        const { data } = await httpClient.get<CommonResponse<ProfileAddressesResponse>>(`/users/me/address/${id}`);
        return data;
    },
};