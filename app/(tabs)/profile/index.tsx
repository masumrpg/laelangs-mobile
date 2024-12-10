import React from "react";
import { Image, Text } from "react-native";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import ScreenLayout from "@/components/ScreenLayout";
import PullToRefresh from "@/components/PullToRefresh";

export default function Index() {
    const userData = {
        name: "Ma'sum",
        email: "mclasix@example.com",
        phone: "+62 812-3456-7890",
        address: "Jl. Sudirman No. 25, Jakarta",
        avatarUrl: "https://img.freepik.com/premium-vector/boy-illustration-vector_844724-3009.jpg",
    };

    const onRefresh = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    };

    return (
        <PullToRefresh onRefresh={onRefresh}>
            <ScreenLayout>
                {/* Avatar Section */}
                <Box className="items-center mb-6">
                    <Box className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-4">
                        {userData.avatarUrl ? (
                            <Image
                                source={{ uri: userData.avatarUrl }}
                                className="w-full h-full"
                            />
                        ) : (
                            <Text className="text-center text-gray-500 mt-8">Avatar</Text>
                        )}
                    </Box>
                    <Text className="text-xl font-bold">{userData.name}</Text>
                    <Text className="text-gray-600">{userData.email}</Text>
                </Box>

                {/* Info Section */}
                <Box className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
                    <Text className="text-gray-600 font-bold mb-2">Phone</Text>
                    <Text className="text-gray-600">{userData.phone}</Text>
                </Box>

                <Box className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
                    <Text className="text-gray-600 font-bold mb-2">Address</Text>
                    <Text className="text-gray-600">{userData.address}</Text>
                </Box>

                {/* Edit Profile Button */}
                <Button className="bg-primary-500 rounded-lg py-3">
                    <Text className="text-white text-center font-bold">Edit Profile</Text>
                </Button>
            </ScreenLayout>
        </PullToRefresh>
    );
}
