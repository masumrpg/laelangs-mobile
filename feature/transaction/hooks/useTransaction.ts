import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { PagingResponse } from "@/shared/schema";
import { AxiosError } from "axios";
import { transactionService } from "@/service/transactionService";
import { Transaction } from "@/feature/transaction/type";

export const useAllTransactions = (
    options?: UseQueryOptions<PagingResponse<Transaction[]>, AxiosError>,
): UseQueryResult<PagingResponse<Transaction[]>, AxiosError> => {
    return useQuery<PagingResponse<Transaction[]>, AxiosError>({
        queryKey: ["transactions", "list"],
        queryFn: async () => {
            return await transactionService.getAll();
        },
        ...options,
    });
};