import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { UserProfileSchema, userProfileSchema } from "@/feature/profile/schema";
import { Platform, Text, Image } from "react-native";
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
import { profileService } from "@/service/profileService"; // import expo-image-picker

export default function ProfileForm() {
    const form = useZodForm<UserProfileSchema>({
        schema: userProfileSchema,
        defaultValues: {},
    });

    const { mutate, data: response } = useCreateUserProfile();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [tempDate, setTempDate] = useState<Date | null>(null);

    const [imageUri, setImageUri] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const onSubmit = async (data: UserProfileSchema) => {
        setIsSubmitting(true);

        const formData = new FormData();

        const userProfile = {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            birthDate: data.birthDate,
        };

        formData.append("userProfile", JSON.stringify(userProfile));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        console.log("From profile", formData);

        try {
            await profileService.create(formData);
        } catch (error) {
            console.error("Failed to submit data:", error);
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
                imageUri={imageUri}
                setImageUri={setImageUri}
                setImageFile={setImageFile}
                form={form}
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
        </Box>
    );
}
