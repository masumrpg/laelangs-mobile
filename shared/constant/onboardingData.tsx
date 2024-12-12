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
            title: "Selamat datang di Laelangs",
            subtitle: "Temukan, tawar, dan menangkan barang impian Anda dengan harga terbaik.",
        },
        {
            backgroundColor: "#d1a9ff",
            image: (
                <LottieView style={{ width: 450, height: 450 }} source={secure} autoPlay loop />
            ),
            title: "Pembayaran Aman",
            subtitle: "Menawar tanpa hambatan dengan percaya diri menggunakan sistem pembayaran kami yang aman.",
        },
        {
            backgroundColor: "#bffffd",
            image: (
                <LottieView style={{ width: 370, height: 370 }} source={fast} autoPlay loop />
            ),
            title: "Pengiriman Cepat",
            subtitle: "Menangkan lelang dan kirim barang Anda ke depan pintu Anda dengan cepat.",
        },
    ];
};

export default onboardingData;