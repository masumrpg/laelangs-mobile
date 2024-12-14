import React from "react";
import { Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

interface ImagePickerComponentProps {
    imageUri: string | null;
    setImageUri: (uri: string | null) => void;
    setImageFile: (file: File | null) => void;
    form: any;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
                                                                       imageUri,
                                                                       setImageUri,
                                                                       setImageFile,
                                                                       form,
                                                                   }) => {
    const handleImagePick = async () => {
        // Request permission for image picker (needed for iOS)
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            base64: false,
        });

        if (!result.canceled && result.assets?.[0]) {
            const image = result.assets[0];

            if (image.uri) {
                setImageUri(image.uri);

                const fileName = image.fileName || "default_image.jpg";

                // Convert the image to a File
                const uri = image.uri;
                fetch(uri)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], fileName, { type: image.type });
                        setImageFile(file);
                        form.setValue("image", file);
                    })
                    .catch((err) => console.error("Error converting image to File:", err));
            } else {
                console.error("Image URI is undefined or null.");
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
