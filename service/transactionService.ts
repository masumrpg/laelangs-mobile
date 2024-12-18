import httpClient from "@/lib/api";
import { CommonResponse, PagingResponse } from "@/shared/schema";
import { Transaction } from "@/feature/transaction/type";

export const transactionService = {
    async getAll() {
        const { data } = await httpClient.get<PagingResponse<Transaction[]>>("/transactions/me");
        return data;
    },
    async getOneById(id: string) {
        const { data } = await httpClient.get<CommonResponse<Transaction>>(`/transactions/${id}`);
        return data;
    },
    async updateTransactionComplete(id: string) {
        const { data } = await httpClient.put<CommonResponse<string>>(`/transactions/${id}/complete`);
        return data;
    },
};