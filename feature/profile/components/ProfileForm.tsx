import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { UserProfileSchema, userProfileSchema } from "@/feature/profile/schema";
import { Platform, Text } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Heading } from "@/components/ui/heading";
import ImagePickerComponent from "@/feature/profile/components/ImagePickerComponent";
import { useCreateUserProfile } from "@/feature/profile/hooks/useProfiles";
import { ImagePickerAsset } from "expo-image-picker";
import { useToast } from "@/shared/hooks/useToast";
import { useRouter } from "expo-router";
import LogoutDialog from "@/feature/profile/components/LogoutDialog";

export default function ProfileForm({ logoutHandle }: { logoutHandle: () => void }) {
    const router = useRouter();
    const { showToast } = useToast();
    const form = useZodForm<UserProfileSchema>({
        schema: userProfileSchema,
        defaultValues: {},
    });

    const { mutate } = useCreateUserProfile();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [tempDate, setTempDate] = useState<Date | null>(null);

    const [imageFile, setImageFile] = useState<ImagePickerAsset | null>(null);

    const onSubmit = async (data: UserProfileSchema) => {
        setIsSubmitting(true);

        const userProfile = {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            birthDate: data.birthDate,
        };

        try {
            const formData = new FormData();

            formData.append("userProfile", JSON.stringify(userProfile));

            if (imageFile?.uri && imageFile.mimeType && imageFile.fileName) {
                const file = {
                    uri: Platform.OS === "android" ? imageFile.uri : imageFile.uri.replace("file://", ""),
                    type: imageFile.mimeType,
                    name: imageFile.fileName,
                };

                formData.append("image", {
                    uri: file.uri,
                    name: file.name,
                    type: file.type,
                } as any);
            }

            mutate({ formData }, {
                onSuccess: () => {
                    showToast({
                        type: "success",
                        title: "Success",
                        message: "Sukses update profile.",
                    });
                    router.replace("/profile");
                },
                onError: (error) => {
                    console.log("error", error);
                },
            });
        } catch (error) {
            console.log("Failed to submit data:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Box className={"gap-y-6 p-4"}>
            <Box className={"mb-6"}>
                <Heading className={"text-center text-2xl font-bold"}>Buat Detail Akun Anda</Heading>
            </Box>

            {/* Image Input */}
            <ImagePickerComponent
                imageUri={imageFile?.uri ? imageFile.uri : null}
                setImageFile={setImageFile}
            />

            {/* Other form fields */}
            <Box className={"gap-y-4"}>
                {/* First Name */}
                <Box className={"gap-y-2"}>
                    <Text className={"text-lg font-medium"}>Nama Depan</Text>
                    <Controller
                        control={form.control}
                        name="firstName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Box>
                                <Input variant={"rounded"} size={"lg"} className="rounded-full">
                                    <InputField
                                        placeholder="Nama Depan"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                </Input>
                                {form.formState.errors.firstName && (
                                    <Text className={"color-red-500 text-xs mt-1"}>
                                        {form.formState.errors.firstName.message}
                                    </Text>
                                )}
                            </Box>
                        )}
                    />
                </Box>

                {/* Last Name */}
                <Box className={"gap-y-2"}>
                    <Text className={"text-lg font-medium"}>Nama Belakang</Text>
                    <Controller
                        control={form.control}
                        name="lastName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Box>
                                <Input variant={"rounded"} size={"lg"} className="rounded-full">
                                    <InputField
                                        placeholder="Nama Belakang"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                    />
                                </Input>
                                {form.formState.errors.lastName && (
                                    <Text className={"color-red-500 text-xs mt-1"}>
                                        {form.formState.errors.lastName.message}
                                    </Text>
                                )}
                            </Box>
                        )}
                    />
                </Box>

                {/* Gender */}
                <Box className={"gap-y-2"}>
                    <Text className={"text-lg font-medium"}>Jenis Kelamin</Text>
                    <Controller
                        control={form.control}
                        name="gender"
                        render={({ field: { onChange, value } }) => (
                            <Box>
                                <Select
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    placeholder="Select Gender"
                                    isInvalid={!!form.formState.errors.gender}
                                >
                                    <SelectTrigger
                                        variant="outline"
                                        size="md"
                                        className="rounded-full"
                                    >
                                        <SelectInput placeholder="Pilih Jenis Kelamin" />
                                        <SelectIcon className="mr-3" as={ChevronDownIcon} />
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectBackdrop />
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            <SelectItem label="Pria" value="Male" />
                                            <SelectItem label="Wanita" value="Female" />
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
                                {form.formState.errors.gender && (
                                    <Text className={"color-red-500 text-xs mt-1"}>
                                        {form.formState.errors.gender.message}
                                    </Text>
                                )}
                            </Box>
                        )}
                    />
                </Box>

                {/* Birth Date */}
                <Box className={"gap-y-2"}>
                    <Text className={"text-lg font-medium"}>Tanggal Lahir</Text>
                    <Controller
                        control={form.control}
                        name="birthDate"
                        render={({ field: { onChange, value } }) => (
                            <Box>
                                <Button
                                    variant="outline"
                                    onPress={() => setShowPicker(true)}
                                    className="rounded-full"
                                >
                                    <Text className="text-primary-500 text-center font-bold">
                                        {value ? `Tanggal Terpilih: ${value}` : "Pilih Tanggal"}
                                    </Text>
                                </Button>

                                {showPicker && (
                                    <DateTimePicker
                                        value={tempDate || new Date()}
                                        mode="date"
                                        display={Platform.OS === "ios" ? "inline" : "default"}
                                        onChange={(event, selectedDate) => {
                                            if (Platform.OS !== "ios") setShowPicker(false);
                                            if (selectedDate) {
                                                setTempDate(selectedDate);
                                                const formattedDate = selectedDate.toISOString().split("T")[0];
                                                onChange(formattedDate);
                                            }
                                        }}
                                    />
                                )}

                                {form.formState.errors.birthDate && (
                                    <Text className={"color-red-500 text-xs mt-1"}>
                                        {form.formState.errors.birthDate.message}
                                    </Text>
                                )}
                            </Box>
                        )}
                    />
                </Box>
            </Box>

            <Box>
                <Button
                    disabled={isSubmitting}
                    onPress={form.handleSubmit(onSubmit)}
                    className={"rounded-full w-full"}
                >
                    <Text className="text-white">Simpan</Text>
                </Button>
            </Box>
            <Box>
                <LogoutDialog logoutHandle={logoutHandle} />
            </Box>
        </Box>
    );
}
