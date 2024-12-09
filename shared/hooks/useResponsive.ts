import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const useResponsive = () => {
    return {
        width: wp,
        height: hp,
    };
};