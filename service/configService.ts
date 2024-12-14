import httpClient from "@/lib/api";
import { PagingResponse } from "@/shared/schema";
import { Bank, Category } from "@/feature/config/type";

export const configService = {
    async getAllBanks() {
        const { data } = await httpClient.get<PagingResponse<Bank[]>>("/config/banks");
        return data;
    },
    async getAllCategories() {
        const { data } = await httpClient.get<PagingResponse<Category[]>>("/config/categories");
        return data;
    },
};