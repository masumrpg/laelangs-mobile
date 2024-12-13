import React, { useEffect, useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Fingerprint } from "lucide-react-native";
import { useAuth } from "@/shared/contex/AuthContex";
import { useToast } from "@/shared/hooks/useToast";
import { Box } from "@/components/ui/box";
import { useRouter } from "expo-router";
import { useRefreshToken } from "@/feature/auth/hooks/useRefreshToken";

const LocalAuthBiometric: React.FC<{
    autoTrigger?: boolean
}> = ({ autoTrigger = false }) => {
    const router = useRouter();
    const { authData } = useAuth();
    const { showToast } = useToast();
    const { refreshingToken } = useRefreshToken();

    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const checkBiometricSupport = async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const biometricAvailable = await LocalAuthentication.isEnrolledAsync();
            setIsBiometricSupported(compatible && biometricAvailable);
        };
        checkBiometricSupport();
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (autoTrigger && isBiometricSupported && authData?.refreshToken) {
            handleBiometricAuth();
        }
    }, [autoTrigger, isBiometricSupported, authData]);

    if (!authData?.refreshToken) return null;

    const handleBiometricAuth = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Login dengan Biometric",
                fallbackLabel: "Gunakan Pin",
            });

            if (result.success) {
                await refreshingToken(authData?.refreshToken);
                showToast({
                    type: "success",
                    title: "Success",
                    message: "Login Berhasil.",
                });
            } else {
                router.replace("/auth/login");
                showToast({
                    type: "error",
                    title: "Error",
                    message: "Login Gagal!",
                });
            }
        } catch (error) {
            router.replace("/auth/login");
            showToast({
                type: "error",
                title: "Error",
                message: "Internal Server Error!",
            });
            console.error(error);
        }
    };

    return (
        <Box>
            {isBiometricSupported
            && authData?.refreshToken
            && !isKeyboardVisible
            && !autoTrigger ? (
                <TouchableOpacity
                    onPress={handleBiometricAuth}
                    className="bg-[#ffaa5b] p-4 rounded-full"
                >
                    <Fingerprint size={50} color="#000" />
                </TouchableOpacity>
            ) : null}
        </Box>
    );
};

export default LocalAuthBiometric;
