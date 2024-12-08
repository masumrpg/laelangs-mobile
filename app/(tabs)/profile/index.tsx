import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

export default function Index() {
    const userData = {
        name: "Abdul Rahman",
        email: "abdulrahman@example.com",
        phone: "+62 812-3456-7890",
        address: "Jl. Sudirman No. 25, Jakarta",
        avatarUrl: "",
    };

    return (
        <Box className="flex-1 bg-white p-5">
            {/* Header */}
            <Pressable className="mb-6">
                <Text className="text-gray-600">← Back</Text>
            </Pressable>

            {/* Avatar Section */}
            <View className="items-center mb-6">
                <View className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-4">
                    {userData.avatarUrl ? (
                        <Image
                            source={{ uri: userData.avatarUrl }}
                            className="w-full h-full"
                        />
                    ) : (
                        <Text className="text-center text-gray-500 mt-8">Avatar</Text>
                    )}
                </View>
                <Text className="text-xl font-bold">{userData.name}</Text>
                <Text className="text-gray-600">{userData.email}</Text>
            </View>

            {/* Info Section */}
            <View className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
                <Text className="text-gray-600 font-bold mb-2">Phone</Text>
                <Text className="text-gray-600">{userData.phone}</Text>
            </View>

            <View className="bg-gray-100 rounded-lg p-4 border border-gray-300 mb-4">
                <Text className="text-gray-600 font-bold mb-2">Address</Text>
                <Text className="text-gray-600">{userData.address}</Text>
            </View>

            {/* Edit Profile Button */}
            <Button className="bg-primary-500 rounded-lg py-3">
                <Text className="text-white text-center font-bold">Edit Profile</Text>
            </Button>
        </Box>
    );
}
