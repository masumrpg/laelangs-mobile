import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "react-native-onboarding-swiper";
import onboardingData from "~/shared/constant/onboardingData";
import { Button } from "~/components/ui/button";


export default function Index() {
    const router = useRouter();

    const finishOnboarding = async () => {
        // FIXME aktifkan ini jangan lupa
        await AsyncStorage.setItem("onboardingComplete", "true");
        router.replace("/auth/login");
    };

    return (
        <View className="flex-1">
            <Onboarding
                onSkip={finishOnboarding}
                bottomBarHighlight={false}
                DoneButtonComponent={() => <TouchableOpacity
                    onPress={finishOnboarding}
                >
                    <Text
                        className="text-lg mr-5">Done
                    </Text>
                </TouchableOpacity>
                }
                containerStyles={{ flex: 1, paddingHorizontal: 15 }}
                bottomBarHeight={100}
                pages={onboardingData()}
            />
        </View>
    );
}