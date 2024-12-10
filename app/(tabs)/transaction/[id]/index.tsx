import React from "react";
import { Image, Text } from "react-native";
import { Box } from "@/components/ui/box";
import { formatRupiah } from "@/lib/utils";
import PullToRefresh from "@/components/PullToRefresh";
import ScreenLayout from "@/components/ScreenLayout";

export default function Index() {
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
                {/* Image Placeholder */}
                <Box className="h-52 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <Image
                        source={{ uri: "https://img.freepik.com/premium-vector/boy-illustration-vector_844724-3009.jpg" }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </Box>

                {/* Price */}
                <Box className="text-2xl font-bold text-primary-500 mb-2">
                    <Text>
                        {formatRupiah(3.500.toString())}
                    </Text>
                </Box>

                {/* Title */}
                <Box className="text-xl font-semibold mb-2">
                    <Text>
                        Bid Barang Kesukaanmu Sekarang!
                    </Text>
                </Box>

                {/* Description */}
                <Box className="text-gray-600 mb-4">
                    <Text>
                        Jika Anda ingin menggunakan Dictionary dengan kunci yang unik, Anda bisa
                        menyimpan ID sebagai kunci utama dan Dictionary properti karyawan
                        sebagai nilainya: csharp
                    </Text>
                </Box>

                {/* Progress Tracker */}
                <Box className="flex-row items-center mb-6">
                    <Box className="flex-1 items-center">
                        <Box className="w-6 h-6 bg-orange-500 rounded-full mb-2" />
                        <Text className="text-center text-gray-600">Penjual Mengirim Barang</Text>
                    </Box>
                    <Box className="flex-1 items-center">
                        <Box className="w-6 h-6 bg-gray-300 rounded-full mb-2" />
                        <Text className="text-center text-gray-600">Barang Dalam perjalanan</Text>
                    </Box>
                    <Box className="flex-1 items-center">
                        <Box className="w-6 h-6 bg-gray-300 rounded-full mb-2" />
                        <Text className="text-center text-gray-600">Barang Telah sampai</Text>
                    </Box>
                </Box>

                {/* Note Section */}
                <Box className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                    <Text className="font-bold text-gray-600 mb-2">Note</Text>
                    <Text className="text-gray-600">
                        Customer wajib membaca deskripsi keadaan barang terlebih dahulu
                    </Text>
                </Box>
            </ScreenLayout>
        </PullToRefresh>
    );
}
