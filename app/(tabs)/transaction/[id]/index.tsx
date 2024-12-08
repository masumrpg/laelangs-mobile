import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Box } from "@/components/ui/box";

export default function Index() {
    return (
        <Box className="flex-1 bg-white p-5">

            {/* Image Placeholder */}
            <View className="h-40 bg-gray-200 rounded-lg mb-4" />

            {/* Price */}
            <Text className="text-2xl font-bold text-primary-500 mb-2">3.500</Text>

            {/* Title */}
            <Text className="text-xl font-semibold mb-2">
                Bid Barang Kesukaanmu Sekarang!
            </Text>

            {/* Description */}
            <Text className="text-gray-600 mb-4">
                Jika Anda ingin menggunakan Dictionary dengan kunci yang unik, Anda bisa
                menyimpan ID sebagai kunci utama dan Dictionary properti karyawan
                sebagai nilainya: csharp
            </Text>

            {/* Progress Tracker */}
            <View className="flex-row items-center mb-6">
                <View className="flex-1 items-center">
                    <View className="w-6 h-6 bg-orange-500 rounded-full mb-2" />
                    <Text className="text-center text-gray-600">Penjual Mengirim Barang</Text>
                </View>
                <View className="flex-1 items-center">
                    <View className="w-6 h-6 bg-gray-300 rounded-full mb-2" />
                    <Text className="text-center text-gray-600">Barang Dalam perjalanan</Text>
                </View>
                <View className="flex-1 items-center">
                    <View className="w-6 h-6 bg-gray-300 rounded-full mb-2" />
                    <Text className="text-center text-gray-600">Barang Telah sampai</Text>
                </View>
            </View>

            {/* Note Section */}
            <View className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                <Text className="font-bold text-gray-600 mb-2">Note</Text>
                <Text className="text-gray-600">
                    Customer wajib membaca deskripsi keadaan barang terlebih dahulu
                </Text>
            </View>
        </Box>
    );
}
