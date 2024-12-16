import httpClient from "@/lib/api";
import { PagingResponse } from "@/shared/schema";
import { Bank, Category, City, Province } from "@/feature/config/type";

export const configService = {
    async getAllBanks() {
        const { data } = await httpClient.get<PagingResponse<Bank[]>>("/config/banks");
        return data;
    },
    async getAllCategories() {
        const { data } = await httpClient.get<PagingResponse<Category[]>>("/config/categories");
        return data;
    },
    async getAllCity() {
        const { data } = await httpClient.get<PagingResponse<City[]>>("/config/cities");
        return data;
    },
    async getAllProvince() {
        const { data } = await httpClient.get<PagingResponse<Province[]>>("/config/provinces");
        return data;
    },
};