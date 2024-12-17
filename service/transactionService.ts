import httpClient from "@/lib/api";
import { PagingResponse } from "@/shared/schema";
import { Transaction } from "@/feature/transaction/type";

export const transactionService = {
    async getAll() {
        const { data } = await httpClient.get<PagingResponse<Transaction[]>>("/transactions/me");
        return data;
    },
};