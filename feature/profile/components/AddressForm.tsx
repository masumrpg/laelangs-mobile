import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonText } from "@/components/ui/button";
import { KeyboardAvoidingView, Platform, Text, TextInput } from "react-native";
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetScrollView,
    ActionsheetSectionHeaderText,
} from "@/components/ui/select/select-actionsheet";
import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectScrollView,
    SelectSectionHeaderText,
} from "@/components/ui/select";
import React from "react";
import { ChevronDownIcon } from "lucide-react-native";
import { useCities, useProvinces } from "@/feature/config/hooks/useConfig";
import { AddressSchema, addressSchema } from "@/feature/profile/schema";
import { useCreateAddress } from "@/feature/profile/hooks/useProfiles";
import { useToast } from "@/shared/hooks/useToast";

interface AddressFormProps {
    buttonText: string;
}

export default function AddressForm({ buttonText }: AddressFormProps) {
    const [showActionsheet, setShowActionsheet] = useState(false);
    const { data: provinces, isLoading: isProvinceLoading } = useProvinces();
    const { data: cities, isLoading: isCitiesLoading } = useCities();
    const { mutate } = useCreateAddress();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<AddressSchema>({
        resolver: zodResolver(addressSchema),
        mode: "onChange",
    });
    const { showToast } = useToast();

    const handleClose = () => setShowActionsheet(false);

    const onSubmit = (data: AddressSchema) => {
        mutate({
            payload: data,
        }, {
            onSuccess: () => {
                showToast({
                    title: "Success",
                    message: "Berhasil menambahkan alamat baru.",
                    type: "success",
                });
            },
            onError: (error) => {
                console.log(error);
                showToast({
                    title: "Error",
                    message: "Gagal menambahkan alamat baru.",
                    type: "error",
                });
            },
        });
        handleClose();
        reset();
    };

    // if (isProvinceLoading || isCitiesLoading) return <Loader />;

    return (
        <>
            <Button variant={"outline"} size={"xs"} className={"rounded-full"} onPress={() => setShowActionsheet(true)}>
                <ButtonText>{buttonText}</ButtonText>
            </Button>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent>
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <ActionsheetScrollView className="w-full pt-5 px-5">
                            <ActionsheetSectionHeaderText
                                className="text-gray-600 font-bold text-center text-xl"
                            >Tambah Alamat</ActionsheetSectionHeaderText>

                            {/* Address Field */}
                            <Text className="text-gray-600 font-bold mt-4">Alamat</Text>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-md p-3"
                                        placeholder="Masukkan Alamat"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            {errors.address && (
                                <Text className="text-red-500">{errors.address.message}</Text>
                            )}

                            {/* Dropdown Province */}
                            <Text className="text-gray-600 font-bold mt-4">Provinsi</Text>
                            <Controller
                                name="province"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select onValueChange={(value) => onChange(value)}>
                                        <SelectTrigger variant="outline" size="md" className="h-14">
                                            <SelectInput placeholder="Pilih Provinsi"
                                                         value={provinces?.data?.find(province => province.id === value)?.provinceName || ""} />
                                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectBackdrop />
                                            <SelectContent>
                                                <SelectDragIndicatorWrapper>
                                                    <SelectDragIndicator />
                                                </SelectDragIndicatorWrapper>
                                                <SelectScrollView className={"h-96 my-5"}>
                                                    <SelectSectionHeaderText
                                                        className="text-gray-600 font-bold text-center text-xl">Pilih
                                                        Provinsi</SelectSectionHeaderText>
                                                    {provinces?.data?.map((province) => (
                                                        <SelectItem
                                                            key={province.id}
                                                            label={province.provinceName}
                                                            value={province.id}
                                                        />
                                                    ))}
                                                </SelectScrollView>
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                )}
                            />
                            {errors.province && (
                                <Text className="text-red-500">{errors.province.message}</Text>
                            )}

                            {/* Dropdown City */}
                            <Text className="text-gray-600 font-bold mt-4">Kota</Text>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        onValueChange={(value) => onChange(value)}
                                        selectedValue={value}
                                    >
                                        <SelectTrigger variant="outline" size="md" className="h-14">
                                            <SelectInput
                                                placeholder="Pilih Kota"
                                                value={cities?.data?.find(city => city.id === value)?.cityName || ""}
                                            />
                                            <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectBackdrop />
                                            <SelectContent>
                                                <SelectDragIndicatorWrapper>
                                                    <SelectDragIndicator />
                                                </SelectDragIndicatorWrapper>
                                                <SelectScrollView className={"h-96 my-5"}>
                                                    <SelectSectionHeaderText
                                                        className="text-gray-600 font-bold text-center text-xl">Pilih
                                                        Kota</SelectSectionHeaderText>
                                                    {cities?.data?.map((city) => (
                                                        <SelectItem
                                                            key={city.id}
                                                            label={city.cityName}
                                                            value={city.id}
                                                        />
                                                    ))}
                                                </SelectScrollView>
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                )}
                            />
                            {errors.city && (
                                <Text className="text-red-500">{errors.city.message}</Text>
                            )}

                            {/* SubDistrict Field */}
                            <Text className="text-gray-600 font-bold mt-4">Kecamatan</Text>
                            <Controller
                                name="district"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-md p-3"
                                        placeholder="Masukkan Kecamatan"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            {errors.district && (
                                <Text className="text-red-500">{errors.district.message}</Text>
                            )}

                            {/* PostalCode Field */}
                            <Text className="text-gray-600 font-bold mt-4">Kode Pos</Text>
                            <Controller
                                name="zipCode"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-md p-3"
                                        placeholder="Masukkan Kode Pos"
                                        value={value}
                                        onChangeText={onChange}
                                        inputMode={"numeric"}
                                    />
                                )}
                            />
                            {errors.zipCode && (
                                <Text className="text-red-500">{errors.zipCode.message}</Text>
                            )}

                            {/* RecipientName Field */}
                            <Text className="text-gray-600 font-bold mt-4">Nama Penerima</Text>
                            <Controller
                                name="receiverName"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-md p-3"
                                        placeholder="Masukkan Nama penerima"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            {errors.receiverName && (
                                <Text className="text-red-500">{errors.receiverName.message}</Text>
                            )}

                            {/* PhoneNumber Field */}
                            <Text className="text-gray-600 font-bold mt-4">Nomor Ponsel</Text>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="border border-gray-300 rounded-md p-3"
                                        placeholder="Masukkan Nomor Ponsel"
                                        value={value}
                                        onChangeText={onChange}
                                        inputMode={"numeric"}
                                    />
                                )}
                            />
                            {errors.phoneNumber && (
                                <Text className="text-red-500">{errors.phoneNumber.message}</Text>
                            )}

                            {/* Action Button */}
                            <Button onPress={handleSubmit(onSubmit)} className="mt-5">
                                <ButtonText className="flex-1 text-center">Tambah Alamat</ButtonText>
                            </Button>
                        </ActionsheetScrollView>
                    </ActionsheetContent>
                </Actionsheet>
            </KeyboardAvoidingView>
        </>
    );
}