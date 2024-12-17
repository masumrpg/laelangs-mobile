import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { PagingResponse } from "@/shared/schema";
import { AxiosError } from "axios";
import { transactionService } from "@/service/transactionService";

export const useAllTransactions = (
    options?: UseQueryOptions<PagingResponse<any[]>, AxiosError>,
): UseQueryResult<PagingResponse<any[]>, AxiosError> => {
    return useQuery<PagingResponse<any[]>, AxiosError>({
        queryKey: ["transactions", "list"],
        queryFn: async () => {
            return await transactionService.getAll();
        },
        ...options,
    });
};