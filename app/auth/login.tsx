import React, { useState, useEffect } from "react";
import {
    Image,
    Text,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Path } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { LoginSchema, loginSchema } from "@/feature/login/schema";
import FormInput from "@/components/FormInput";
import { Heading } from "@/components/ui/heading";
import { useAuth } from "@/shared/contex/AuthContex";
import { Box } from "@/components/ui/box";
import { authService } from "@/service/authService";
import { useToast } from "@/shared/hooks/useToast";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

export default function Login() {
    const { showToast } = useToast();
    const router = useRouter();
    const { login } = useAuth();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const form = useZodForm<LoginSchema>({
        schema: loginSchema,
        defaultValues: { username: "", password: "" },
    });

    const handleLogin = async (data: LoginSchema) => {
        try {
            Keyboard.dismiss();

            const res = await authService.login(data);
            if (res?.data) {
                await login(res.data);
                showToast({
                    type: "success",
                    title: "Success",
                    message: "Login Berhasil.",
                });
                router.replace("/home");
            }
        } catch (error) {
            showToast({
                type: "error",
                title: "Error",
                message: "Login Gagal.",
            });
            console.error("Error from login: ", error);
        }
    };

    const fields = Object.keys(loginSchema._def.shape()) as Path<LoginSchema>[];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box className="h-full w-full">
                    {/* Background */}
                    <Image
                        className="w-full h-full absolute"
                        source={require("@/assets/images/background.png")}
                    />

                    {/* Light Effects & Welcome Heading - Conditionally Rendered */}
                    {!isKeyboardVisible && (
                        <>
                            <Box className="flex-row justify-around w-full absolute">
                                <Animated.Text
                                    entering={FadeInUp.delay(200).duration(1000).springify()}
                                    exiting={FadeOutUp.delay(10).duration(500).springify()}
                                    className="text-white text-3xl font-bold text-center pt-44 absolute">
                                    Welcome to Laelangs
                                </Animated.Text>
                                <Animated.Image
                                    entering={FadeInUp.delay(200).duration(1000).springify()}
                                    exiting={FadeOutUp.delay(10).duration(500).springify()}
                                    className="h-[225] w-[90]"
                                    source={require("@/assets/images/light.png")}
                                />
                                <Animated.Image
                                    entering={FadeInUp.delay(400).duration(1000).springify()}
                                    exiting={FadeOutUp.delay(10).duration(500).springify()}
                                    className="h-[160] w-[65]"
                                    source={require("@/assets/images/light.png")}
                                />
                            </Box>
                        </>
                    )}

                    {/* Content */}
                    <Box className="h-full w-full px-5 justify-center items-center pt-48 gap-y-32">
                        <Box className="flex items-center">
                            <Heading className="text-white text-6xl font-bold text-center">
                                Login
                            </Heading>
                        </Box>
                        <Box>
                            <FormInput
                                className="w-11/12 max-w-400 gap-y-5"
                                fields={fields}
                                form={form}
                                isTitleNameActive={true}
                                onSubmit={handleLogin}
                                buttonName="Login"
                                inputClassName="h-16 data-[focus=true]:border-[#ffaa5b]"
                                buttonClassName="h-16 rounded-xl"
                                buttonTextClassName="text-xl font-bold text-center text-white"
                                titleNameClassName="text-[#ffaa5b] text-xl ml-2"
                                additionalUsernameLabel="Email"
                            />
                            <Text className="text-gray-500 text-xl text-center mt-8">
                                Belum punya akun?{" "}
                                <Link href="/auth/register">
                                    <Text className="text-[#ffaa5b] font-bold">Register</Text>
                                </Link>
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}