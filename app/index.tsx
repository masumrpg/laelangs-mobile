import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { useAuth } from "@/shared/contex/AuthContex";
import Loader from "@/components/Loader";
import LocalAuthBiometric from "@/components/LocalAuthBiometric";


export default function Index() {
    const { authData } = useAuth();
    const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const status = await AsyncStorage.getItem("onboardingComplete");
            setIsOnboardingComplete(status === "true");
        };
        checkOnboardingStatus();
    }, []);

    if (isOnboardingComplete === null) {
        return (
            <View className="flex-1 justify-center items-center">
                <Loader />
            </View>
        );
    }

    return isOnboardingComplete ? (
        authData?.accessToken !== "" || null || undefined
            ?
            // <Redirect href="/(tabs)/home" />
            <LocalAuthBiometric autoTrigger={true} />
            :
            <Redirect href="/auth/login" />) : <Redirect href="/onboarding" />;
}
