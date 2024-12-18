import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse, PagingResponse } from "@/shared/schema";
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

export const useTransaction = (
    transactionId: string,
    options?: UseQueryOptions<CommonResponse<Transaction>, AxiosError>,
): UseQueryResult<CommonResponse<Transaction>, AxiosError> => {
    return useQuery<CommonResponse<Transaction>, AxiosError>({
        queryKey: ["transactions", "details", transactionId],
        queryFn: async () => {
            return await transactionService.getOneById(transactionId);
        },
        ...options,
    });
};

export const useTransactionDone = (
    options?: UseMutationOptions<CommonResponse<string>, AxiosError<CommonResponse<string>>, {
        transactionId: string;
    }>,
) => {
    return useMutation({
            mutationKey: ["transactions", "details"],
            mutationFn: async ({ transactionId }) => await transactionService.updateTransactionComplete(transactionId),
            ...options,
        },
    );
};