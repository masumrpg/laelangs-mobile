import React from "react";
import { Image, Text } from "react-native";
import { Box } from "@/components/ui/box";
import ScreenLayout from "@/components/ScreenLayout";
import PullToRefresh from "@/components/PullToRefresh";
import { authService } from "@/service/authService";
import { useAuth } from "@/shared/contex/AuthContex";
import { useToast } from "@/shared/hooks/useToast";
import { useAddresses, useUserProfile } from "@/feature/profile/hooks/useProfiles";
import Loader from "@/components/Loader";
import { buildFullURL, formatDateToIndonesian } from "@/lib/utils";
import LogoutDialog from "@/feature/profile/components/LogoutDialog";
import { Divider } from "@/components/ui/divider";
import AddressForm from "@/feature/profile/components/AddressForm";
import ProfileForm from "@/feature/profile/components/ProfileForm";

export default function Index() {
    const { showToast } = useToast();
    const { logout } = useAuth();

    const { data: userProfile, isLoading: isProfileLoading, refetch: userProfileRefetch } = useUserProfile();
    const { data: userAddresses, isLoading: isAddressesLoading, refetch: userAddressRefetch } = useAddresses();

    if (isAddressesLoading || isProfileLoading) return <Loader />;

    const onRefresh = async () => {
        await userProfileRefetch();
        await userAddressRefetch();
    };

    const logoutHandle = async () => {
        const response = await authService.logout();
        if (response.status === 200) {
            showToast({
                type: "success",
                title: "Success",
                message: "Suksess logout.",
            });
            await logout();
        }
    };


    return (
        <ScreenLayout className={"mb-10"}>
            {userProfile?.data ? (
                <PullToRefresh onRefresh={onRefresh}>
                    {/* Avatar Section */}
                    <Box className="items-center mb-6">
                        <Box className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-4">
                            {userProfile.data.image?.url ? (
                                <Image
                                    source={{ uri: buildFullURL(userProfile.data.image.url) }}
                                    className="w-full h-full"
                                />
                            ) : (
                                <Text className="text-center text-gray-500 mt-8">Avatar</Text>
                            )}
                        </Box>
                        <Text className="text-xl font-bold">{userProfile.data.firstName}</Text>
                        <Text className="text-gray-600">{userProfile.data.email}</Text>
                    </Box>

                    {/* Info Section */}
                    <Box className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
                        <Text className="text-gray-600 font-bold mb-2">Username</Text>
                        <Text className="text-gray-600">{userProfile.data.username}</Text>
                    </Box>

                    <Box className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
                        <Text className="text-gray-600 font-bold mb-2">Jenis Kelamin</Text>
                        <Text className="text-gray-600">{userProfile.data.gender === 1 ? "Male" : "Female"}</Text>
                    </Box>

                    <Box className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
                        <Text className="text-gray-600 font-bold mb-2">Tanggal Lahir</Text>
                        <Text className="text-gray-600">{formatDateToIndonesian(userProfile.data.birthDate)}</Text>
                    </Box>

                    <Box className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
                        <Box className="flex flex-row justify-between items-center">
                            <Box className="flex-1">
                                <Text className="text-gray-600 font-bold mb-1">Address</Text>
                                <Text
                                    className="text-gray-600">
                                    {userAddresses?.data?.[0]?.address ?? "Belum ada alamat"}
                                </Text>
                            </Box>
                            <AddressForm buttonText={userAddresses?.data ? "Tambah" : "Lihat"} />
                        </Box>
                    </Box>


                    <Divider className={"my-5"} />

                    <Box className={"gap-y-4"}>
                        {/* Edit Profile Button */}
                        {/*<Button className={"rounded-full"}>*/}
                        {/*    <ButtonText>Edit Profile</ButtonText>*/}
                        {/*</Button>*/}

                        {/* Log Out */}
                        <LogoutDialog logoutHandle={logoutHandle} />
                    </Box>
                </PullToRefresh>
            ) : (
                // Create User Profile
                <PullToRefresh onRefresh={onRefresh}>
                    <ProfileForm logoutHandle={logoutHandle} />
                </PullToRefresh>
            )}
        </ScreenLayout>
    );
}
