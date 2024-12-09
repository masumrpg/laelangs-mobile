import React, { useState } from "react";
import { Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Box } from "@/components/ui/box";
import { cn } from "@/lib/utils";

interface CarouselImageProps {
    imagesUrl: string[];
    classNames?: string;
}

const { width: screenWidth } = Dimensions.get("window");

export default function CarouselImage({ imagesUrl, classNames }: CarouselImageProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Box className="flex-1 bg-white items-center justify-center mb-4">
            {/*Carosel Image*/}
            <Carousel
                loop
                width={screenWidth}
                height={200}
                autoPlay={true}
                autoPlayInterval={3000}
                data={imagesUrl}
                onSnapToItem={(index) => setActiveIndex(index)}
                renderItem={({ item }) => (
                    <Box className={cn(
                        classNames,
                        "flex-1 mx-5 rounded-lg overflow-hidden",
                    )}>
                        <Image
                            className={"w-full h-full"}
                            source={{ uri: item }}
                            resizeMode="cover"
                        />
                    </Box>
                )}
            />
            {/* Indikator */}
            <Box className="flex-row justify-center mt-4">
                {imagesUrl.map((_, index) => (
                    <Box
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full bg-gray-300 mx-1",
                            activeIndex === index && "bg-black",
                        )}
                    />
                ))}
            </Box>
        </Box>
    );
}
