import React from "react";
import { Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

interface ImagePickerComponentProps {
    imageUri: string | null;
    setImageFile: (file: ImagePicker.ImagePickerAsset | null) => void;
}

const ALLOWED_MIME_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
                                                                       imageUri,
                                                                       setImageFile,
                                                                   }) => {
    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        // TODO validasi ukuran gambar
        if (!result.canceled && result.assets?.[0]) {
            const image = result.assets[0];

            if (image.uri && image.mimeType && image.fileSize) {
                if (!ALLOWED_MIME_TYPES.includes(image.mimeType)) {
                    alert("File type not supported. Please select a PNG, JPG, JPEG, or WEBP image.");
                    return;
                }

                if (image.fileSize > MAX_FILE_SIZE) {
                    alert("File size is too large. Please select a file less than 2MB.");
                    return;
                }

                setImageFile(image);
            } else {
                console.error("Image URI or MIME type is undefined or null.");
            }
        }
    };

    return (
        <Box className={"gap-y-2"}>
            <Text className={"text-lg font-medium"}>Upload Foto</Text>
            <Button onPress={handleImagePick} variant="outline" className="rounded-full">
                <Text className="text-primary-500">Pilih Gambar</Text>
            </Button>

            {imageUri && (
                <Box className="mt-3">
                    <Image source={{ uri: imageUri }} style={{ width: 150, height: 150, borderRadius: 12 }} />
                </Box>
            )}
        </Box>
    );
};

export default ImagePickerComponent;