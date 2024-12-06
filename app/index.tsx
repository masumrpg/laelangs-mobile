import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/contex/AuthContex";

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
                {/*Loader*/}
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // FIXME please delete this
    let accessToken = authData?.accessToken;

    return isOnboardingComplete ? (
        // authData?.access_token
        accessToken
            ? <Redirect href="/(tabs)/home" /> :
            <Redirect href="/auth/login" />) : <Redirect href="/onboarding" />;
}
