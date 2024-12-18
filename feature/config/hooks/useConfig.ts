import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { PagingResponse } from "@/shared/schema";
import { AxiosError } from "axios";
import { Bank, Category, City, Province } from "@/feature/config/type";
import { configService } from "@/service/configService";

export const useBanks = (
    options?: UseQueryOptions<PagingResponse<Bank[]>, AxiosError>,
): UseQueryResult<PagingResponse<Bank[]>, AxiosError> => {
    return useQuery<PagingResponse<Bank[]>, AxiosError>({
        queryKey: ["config", "banks"],
        queryFn: async () => await configService.getAllBanks(),
        ...options,
    });
};

export const useCategories = (
    options?: UseQueryOptions<PagingResponse<Category[]>, AxiosError>,
): UseQueryResult<PagingResponse<Category[]>, AxiosError> => {
    return useQuery<PagingResponse<Category[]>, AxiosError>({
        queryKey: ["config", "categories"],
        queryFn: async () => await configService.getAllCategories(),
        ...options,
    });
};

export const useCities = (
    options?: UseQueryOptions<PagingResponse<City[]>, AxiosError>,
): UseQueryResult<PagingResponse<City[]>, AxiosError> => {
    return useQuery<PagingResponse<City[]>, AxiosError>({
        queryKey: ["config", "cities"],
        queryFn: async () => await configService.getAllCity(),
        staleTime: Infinity,
        ...options,
    });
};

export const useProvinces = (
    options?: UseQueryOptions<PagingResponse<Province[]>, AxiosError>,
): UseQueryResult<PagingResponse<Province[]>, AxiosError> => {
    return useQuery<PagingResponse<Province[]>, AxiosError>({
        queryKey: ["config", "provinces"],
        queryFn: async () => await configService.getAllProvince(),
        staleTime: Infinity,
        ...options,
    });
};