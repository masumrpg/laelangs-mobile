import LottieView from "lottie-react-native";
import auction from "@/assets/lottie/auction.json";
import secure from "@/assets/lottie/secure.json";
import fast from "@/assets/lottie/fast-delivery.json";

const onboardingData = () => {
    return [
        {
            backgroundColor: "#88C273",
            image: (
                <LottieView style={{ width: 300, height: 300 }} source={auction} autoPlay loop />
            ),
            title: "Welcome to Laelangs",
            subtitle: "Discover, bid, and win your dream items at the best prices.",
        },
        {
            backgroundColor: "#d1a9ff",
            image: (
                <LottieView style={{ width: 450, height: 450 }} source={secure} autoPlay loop />
            ),
            title: "Secure Payments",
            subtitle: "Seamlessly bid with confidence using our secure payment system.",
        },
        {
            backgroundColor: "#bffffd",
            image: (
                <LottieView style={{ width: 370, height: 370 }} source={fast} autoPlay loop />
            ),
            title: "Fast Delivery",
            subtitle: "Win auctions and get your items delivered to your doorstep quickly.",
        },
    ];
};

export default onboardingData;