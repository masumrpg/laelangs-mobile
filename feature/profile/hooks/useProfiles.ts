import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQuery, useQueryClient,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";
import { CommonResponse } from "@/shared/schema";
import { AxiosError } from "axios";
import { ProfileAddressesResponse, UserProfile } from "@/feature/profile/type";
import { profileService } from "@/service/profileService";


export const useCreateUserProfile = (
    options?: UseMutationOptions<CommonResponse<UserProfile>, AxiosError, { formData: FormData }>,
): UseMutationResult<CommonResponse<UserProfile>, AxiosError, { formData: FormData }> => {
    const queryClient = useQueryClient();

    return useMutation<CommonResponse<UserProfile>, AxiosError, { formData: FormData }>({
        mutationKey: ["profile", "create"],
        mutationFn: async ({ formData }) => {
            return await profileService.create(formData);
        },
        onSuccess: async (data, variables, context) => {
            queryClient.setQueryData<CommonResponse<ProfileAddressesResponse[]>>(
                ["addresses"],
                (oldData) => {
                    return oldData;
                },
            );

            options?.onSuccess?.(data, variables, context);
        },
        ...options,
    });
};

export const useUserProfile = (
    options?: UseQueryOptions<CommonResponse<UserProfile>, AxiosError>,
): UseQueryResult<CommonResponse<UserProfile>, AxiosError> => {
    return useQuery<CommonResponse<UserProfile>, AxiosError>({
        queryKey: ["profile", "me"],
        queryFn: async () => await profileService.getMe(),
        ...options,
    });
};

export const useAddresses = (
    options?: UseQueryOptions<CommonResponse<ProfileAddressesResponse[]>, AxiosError>,
): UseQueryResult<CommonResponse<ProfileAddressesResponse[]>, AxiosError> => {
    return useQuery<CommonResponse<ProfileAddressesResponse[]>, AxiosError>({
        queryKey: ["addresses"],
        queryFn: async () => await profileService.getAllAddress(),
        ...options,
    });
};

export const useAddress = (
    id: string,
    options?: UseQueryOptions<CommonResponse<ProfileAddressesResponse>, AxiosError>,
): UseQueryResult<CommonResponse<ProfileAddressesResponse>, AxiosError> => {
    return useQuery<CommonResponse<ProfileAddressesResponse>, AxiosError>({
        queryKey: ["addresses", id],
        queryFn: async () => await profileService.getAddress(id),
        ...options,
    });
};