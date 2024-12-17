import httpClient from "@/lib/api";
import { PagingResponse } from "@/shared/schema";

export const transactionService = {
    async getAll() {
        const { data } = await httpClient.get<PagingResponse<any[]>>("/transactions/me");
        console.log(data);
        return data;
    },
};