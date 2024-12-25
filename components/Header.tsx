import { globalColors } from "@/shared/constant/constants";
import { Box } from "@/components/ui/box";
import { useResponsive } from "@/shared/hooks/useResponsive";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, MoreHorizontal } from "lucide-react-native";

type HeaderProps = {
    text: string;
    leftButtonVisible?: boolean;
    rightButtonVisible?: boolean;
};

export default function Header({ text, leftButtonVisible = true, rightButtonVisible = false }: HeaderProps) {
    const { height } = useResponsive();
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    const handleRightButtonPress = () => {
        console.log("Right button pressed");
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: globalColors.secondaryColor,
            }}
        >
            <Box
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: height("11%"),
                    backgroundColor: globalColors.secondaryColor,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    overflow: "hidden",
                    paddingTop: 20,
                    paddingHorizontal: 15,
                }}
            >
                {leftButtonVisible && (
                    <TouchableOpacity
                        onPress={handleBackPress}
                        style={{
                            left: 0,
                            position: "absolute",
                            padding: 10,
                            paddingHorizontal: 20,
                            top: 40,
                        }}
                    >
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                )}

                <Text
                    className={"text-2xl font-bold text-white static text-center mt-2"}
                >
                    {text}
                </Text>

                {rightButtonVisible && (
                    <TouchableOpacity
                        onPress={handleRightButtonPress}
                        style={{
                            right: 0,
                            position: "absolute",
                            padding: 10,
                            paddingHorizontal: 20,
                            top: 40,
                        }}
                    >
                        <MoreHorizontal size={24} color="white" />
                    </TouchableOpacity>
                )}
            </Box>
        </View>
    );
}
