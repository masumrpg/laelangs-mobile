import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ProductDetail: React.FC = () => {
    return (
        <View className="flex-1 bg-white p-4">
            {/* Image Section */}
            <View className="items-center mb-4">
                <View className="w-64 h-32 bg-gray-300 rounded-md" />
                <Text className="text-orange-500 text-2xl font-bold mt-2">3.000</Text>
            </View>

            {/* Title Section */}
            <View className="mb-4">
                <Text className="text-black text-lg font-bold mb-1">
                    Bid Barang Kesukaanmu Sekarang!
                </Text>
                <Text className="text-gray-600 text-sm">
                    Jika Anda ingin menggunakan Dictionary dengan kunci yang unik, Anda
                    bisa menyimpan ID sebagai kunci utama dan Dictionary properti karyawan
                    sebagai nilainya:
                </Text>
            </View>

            {/* Bidding Status Section */}
            <View className="border border-red-500 rounded-md p-2 mb-4">
                <Text className="text-red-500 text-center font-bold">Bidding Lose</Text>
                <Text className="text-red-500 text-center font-bold text-2xl">2.500</Text>
                <View className="flex-row justify-around mt-2">
                    <TouchableOpacity className="bg-green-500 rounded-md px-4 py-2">
                        <Text className="text-white font-bold">Add Bidding</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-500 rounded-md px-4 py-2">
                        <Text className="text-white font-bold">Refund</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Table Section */}
            <View className="border border-gray-300 rounded-md mb-4">
                {[
                    ["Kondisi", "Bekas"],
                    ["Bidding Start", "4 Desember 2024"],
                    ["Bidding End", "14 Desember 2024"],
                    ["Bidding Price Start", "2.000"],
                    ["Bidding Price Higher", "2.500"],
                    ["Kelipatan Bid", "500"],
                    ["Size", "Small"],
                    ["Kategori", "Pakaian"],
                ].map(([key, value], index) => (
                    <View
                        key={index}
                        className={`flex-row justify-between p-2 ${
                            index % 2 === 0 ? "bg-gray-100" : ""
                        }`}
                    >
                        <Text className="text-gray-600">{key}</Text>
                        <Text className="text-black font-medium">{value}</Text>
                    </View>
                ))}
            </View>

            {/* Note Section */}
            <View className="bg-gray-100 p-3 rounded-md">
                <Text className="text-gray-600 text-sm">
                    <Text className="font-bold">Note:</Text> Customer wajib membaca
                    deskripsi keadaan barang terlebih dahulu.
                </Text>
            </View>
        </View>
    );
};

export default ProductDetail;