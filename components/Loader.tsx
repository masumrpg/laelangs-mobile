import LottieView from "lottie-react-native";
import loadingAnimaton from "@/assets/lottie/fast-delivery.json";
import { Box } from "@/components/ui/box";

export default function Loader() {
    return (
        <Box className="flex-1 justify-center items-center bg-white">
            <LottieView
                style={{
                    backgroundColor: "transparent",
                    width: 400,
                    height: 400,
                }}
                source={loadingAnimaton}
                autoPlay
                loop
            />
        </Box>
    );
}