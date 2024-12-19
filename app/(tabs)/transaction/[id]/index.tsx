import React from "react";
import { Image, View } from "react-native";
import { Box } from "@/components/ui/box";
import { buildFullURL, formatRupiah } from "@/lib/utils";
import PullToRefresh from "@/components/PullToRefresh";
import ScreenLayout from "@/components/ScreenLayout";
import { useTransaction, useTransactionDone } from "@/feature/transaction/hooks/useTransaction";
import { useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionStatus } from "@/feature/transaction/type";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useCities, useProvinces } from "@/feature/config/hooks/useConfig";
import { useToast } from "@/shared/hooks/useToast";
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";

export default function Index() {
    const [showAlertDialog, setShowAlertDialog] = React.useState(false);
    const { id: transactionId } = useLocalSearchParams();

    const { showToast } = useToast();

    const {
        data: transactionDetails,
        isLoading: transactionDetailsLoading,
        refetch: transactionDetailsRefetch,
    } = useTransaction(transactionId as string);

    const { mutate: updateTransactionComplete, isPending: updateTransactionCompletePending } = useTransactionDone();

    const { data: provinces, isLoading: isLoadingProvince } = useProvinces();
    const { data: cities, isLoading: isLoadingCities } = useCities();

    if (isLoadingCities || isLoadingProvince || !provinces?.data || !cities?.data) {
        return <Loader />;
    }

    if (transactionDetailsLoading || !transactionDetails?.data) return <Loader />;

    const province = provinces.data.find(
        (prov) => prov.id === transactionDetails.data?.userAddress?.province,
    );

    const city = cities.data.find(
        (city) => city.id === transactionDetails.data?.userAddress?.city,
    );

    const onRefresh = async () => {
        await transactionDetailsRefetch();
    };

    const handleClose = () => setShowAlertDialog(false);

    const handleConfirmReceived = async () => {
        updateTransactionComplete({
            transactionId: transactionId as string,
        }, {
            onSuccess: async () => {
                showToast({
                    title: "Success",
                    type: "success",
                    message: "Berhasil konfirmasi paket",
                });
            },
            onError: async (error) => {
                console.log(error);
                showToast({
                    title: "Gagal",
                    type: "error",
                    message: "Gagal mengnonfirmasi, coba lagi!",
                });
            },
        });
        handleClose();
    };

    return (
        <ScreenLayout>
            <PullToRefresh onRefresh={onRefresh}>
                {/* Product Image */}
                <Box className="h-52 bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-md">
                    <Image
                        source={{ uri: buildFullURL(transactionDetails.data.images[0].url) }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </Box>

                {/* Product Name */}
                <Box className="mb-4">
                    <Text className="text-2xl font-bold text-gray-800">
                        {transactionDetails.data.productName}
                    </Text>
                </Box>

                {/* Total Price */}
                <Box className="mb-4">
                    <Text className="text-xl font-semibold text-primary-500">
                        {formatRupiah(transactionDetails.data.totalPrice.toString())}
                    </Text>
                </Box>

                {/* Status Pengiriman */}
                <Box className="mb-6">
                    <Text className="text-lg font-semibold text-gray-800 mb-2">Status Pengiriman:</Text>
                    <Box className="flex-row items-center mb-4">
                        <MaterialIcons
                            name="local-shipping"
                            size={24}
                            color="orange"
                            style={{ marginRight: 8 }}
                        />
                        <Text className="text-gray-700 text-base">
                            {TransactionStatus.toLabel(transactionDetails.data.transactionStatus)}
                        </Text>
                    </Box>
                    {transactionDetails.data.transactionStatus === TransactionStatus.ARRIVED && (
                        <Box className="mt-4">
                            <Button className={"rounded-full h-12"} onPress={() => setShowAlertDialog(true)}>
                                <ButtonText className={"text-2xl"}>Konfirmasi</ButtonText>
                            </Button>
                            <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
                                <AlertDialogBackdrop />
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <Heading className="text-typography-950 font-semibold" size="md">
                                            Apakah kamu yakin telah menerina paket?
                                        </Heading>
                                    </AlertDialogHeader>
                                    <AlertDialogBody className="mt-3 mb-4">
                                        <Text size="sm">
                                            Jika kamu telah menerima paket di tanganmu maka kamu bisa melanjutkan dengan
                                            klik konfirmasi.
                                        </Text>
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                        <Button
                                            className={"rounded-full"}
                                            variant={"outline"}
                                            onPress={handleClose}
                                            size="sm"
                                        >
                                            <ButtonText>Cancel</ButtonText>
                                        </Button>
                                        <Button
                                            isDisabled={updateTransactionCompletePending}
                                            className={"rounded-full"}
                                            size="sm" onPress={handleConfirmReceived}>
                                            <ButtonText>Konfirmasi</ButtonText>
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </Box>
                    )}
                </Box>

                {/* Address Section */}
                <Box className="mb-6">
                    <Text className="text-xl font-semibold text-gray-800 mb-2">
                        Alamat Pengiriman:
                    </Text>
                    <View className="bg-gray-100 rounded-lg p-4 border border-gray-300 shadow-sm">
                        {[
                            ["Alamat", transactionDetails.data.userAddress.address],
                            ["Provinsi", province ? province.provinceName : "Provinsi tidak diketahui"],
                            ["Kota", city ? city.cityName : "Kota tidak diketahui"],
                            ["Kecamatan", transactionDetails.data.userAddress.district],
                            ["Kode Pos", transactionDetails.data.userAddress.zipCode],
                            ["Nomor HP", transactionDetails.data.userAddress.phoneNumber],
                        ].map(([label, value], index) => (
                            <View
                                key={index}
                                className="flex-row justify-between mb-2"
                                style={{
                                    borderBottomWidth: index !== 5 ? 1 : 0,
                                    borderBottomColor: "#E5E7EB",
                                }}
                            >
                                <Text className="text-gray-600 font-medium">{label}</Text>
                                <Text className="text-gray-800 font-semibold">{value}</Text>
                            </View>
                        ))}
                    </View>
                </Box>

                {/* Note Section */}
                <Box className="p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-sm">
                    <Text className="font-bold text-gray-600 mb-2">Note</Text>
                    <Text className="text-gray-600">
                        Customer wajib membaca deskripsi keadaan barang terlebih dahulu.
                    </Text>
                </Box>
            </PullToRefresh>
        </ScreenLayout>
    );
}
