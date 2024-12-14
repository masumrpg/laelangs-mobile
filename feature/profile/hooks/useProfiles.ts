import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from "@tanstack/react-query";
import { CommonResponse } from "@/shared/schema";
import { AxiosError } from "axios";
import { ProfileAddressesResponse, UserProfile } from "@/feature/profile/type";
import { profileService } from "@/service/profileService";
import { UserProfileSchema } from "@/feature/profile/schema";


export const useCreateUserProfile = (
    options?: UseMutationOptions<CommonResponse<UserProfile>, AxiosError, { formData: FormData }>,
): UseMutationResult<CommonResponse<UserProfile>, AxiosError, { formData: FormData }> => {
    return useMutation<CommonResponse<UserProfile>, AxiosError, { formData: FormData }>({
        mutationKey: ["profile", "create"],
        mutationFn: async ({ formData }) => {
            return await profileService.create(formData);
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