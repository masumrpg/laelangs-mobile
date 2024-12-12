import React, { useState } from "react";
import { Dimensions, Image, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Box } from "@/components/ui/box";
import { buildFullURL, cn } from "@/lib/utils";
import { baseURL } from "@/lib/api";

interface CarouselImageProps {
    images?: {
        id: string;
        url: string;
    }[];
    classNames?: string;
}

const { width: screenWidth } = Dimensions.get("window");

export default function CarouselImage({ images, classNames }: CarouselImageProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Placeholder layout for no image
    const renderNoImagePlaceholder = () => (
        <Box
            className={cn(
                classNames,
                "flex-1 mx-5 rounded-lg overflow-hidden bg-gray-200 items-center justify-center",
            )}
        >
            <Text className="text-gray-500">No Image Available</Text>
        </Box>
    );

    // Render images or placeholder
    return (
        <Box className="flex-1 bg-white items-center justify-center mb-4">
            {images && images.length > 0 ? (
                <>
                    {/* Carousel */}
                    <Carousel
                        loop
                        width={screenWidth}
                        height={200}
                        autoPlay={true}
                        autoPlayInterval={3000}
                        data={images}
                        onSnapToItem={(index) => setActiveIndex(index)}
                        renderItem={({ item }) => (
                            <Box
                                className={cn(
                                    classNames,
                                    "flex-1 mx-5 rounded-lg overflow-hidden",
                                )}
                            >
                                <Image
                                    className="w-full h-full"
                                    source={{ uri: buildFullURL(baseURL, item.url) }}
                                    resizeMode="cover"
                                />
                            </Box>
                        )}
                    />
                    {/* Indicator */}
                    <Box className="flex-row justify-center mt-4">
                        {images.map((_, index) => (
                            <Box
                                key={index}
                                className={cn(
                                    "w-2 h-2 rounded-full bg-gray-300 mx-1",
                                    activeIndex === index && "bg-black w-4",
                                )}
                            />
                        ))}
                    </Box>
                </>
            ) : (
                renderNoImagePlaceholder()
            )}
        </Box>
    );
}
