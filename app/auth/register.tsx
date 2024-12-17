import React, { useState, useEffect } from "react";
import {
    Image,
    Text,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Path } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { registerSchema, RegisterFormSchema } from "@/feature/register/schema";
import { Link, useRouter } from "expo-router";
import FormInput from "@/components/FormInput";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { authService } from "@/service/authService";
import { useToast } from "@/shared/hooks/useToast";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

export default function Register() {
    const router = useRouter();
    const { showToast } = useToast();
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

    const form = useZodForm<RegisterFormSchema>({
        schema: registerSchema,
        defaultValues: {},
    });

    const handleRegister = async (data: RegisterFormSchema) => {
        const { confirmPassword, ...registerPayload } = data;

        try {
            const res = await authService.register(registerPayload);

            if (res?.status === 201) {
                showToast({
                    type: "success",
                    title: "Success",
                    message: res.message,
                });
                router.replace("/auth/login");
            }
        } catch (error) {
            console.log("Register failed. Please try again.", error);
            showToast({
                type: "error",
                title: "Error",
                message: "Register failed. Please try again!",
            });
        }
    };

    const fields = Object.keys(registerSchema._def.schema._def.shape()) as Path<RegisterFormSchema>[];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow: 1,
                    minHeight: "100%",
                    paddingBottom: 20,
                }}
            >
                <Box className="flex-1 w-full">
                    {/*background*/}
                    <Image
                        className="w-full h-full absolute -mt-28"
                        source={require("@/assets/images/background.png")}
                    />

                    {/* Animated Light Effect */}
                    {!isKeyboardVisible && (
                        <Box className="flex-row justify-around w-full absolute">
                            <Animated.Image
                                entering={FadeInUp.delay(200).duration(1000).springify()}
                                exiting={FadeOutUp.delay(10).duration(500).springify()}
                                className="h-[225] w-[90] -mt-20"
                                source={require("@/assets/images/light.png")}
                            />
                            <Animated.Image
                                entering={FadeInUp.delay(400).duration(1000).springify()}
                                exiting={FadeOutUp.delay(10).duration(500).springify()}
                                className="h-[160] w-[65] -mt-20"
                                source={require("@/assets/images/light.png")}
                            />
                        </Box>
                    )}

                    {/*content*/}
                    <Box className="h-full w-full px-5 justify-center items-center pt-48 gap-y-32">
                        <Box className="flex items-center">
                            <Heading className="text-white text-6xl font-bold text-center">
                                Register
                            </Heading>
                        </Box>
                        <Box>
                            <FormInput
                                className="w-11/12 max-w-400 gap-y-5"
                                fields={fields}
                                form={form}
                                onSubmit={handleRegister}
                                buttonName="Register"
                                inputClassName="h-16 data-[focus=true]:border-[#ffaa5b]"
                                buttonClassName="h-16 rounded-xl"
                                buttonTextClassName="text-xl font-bold text-center text-white"
                                isTitleNameActive={true}
                                titleNameClassName="text-[#ffaa5b] text-xl ml-2"
                            />
                            <Text className="text-gray-500 text-xl text-center mt-8">
                                Sudah punya akun?{" "}
                                <Link href="/auth/login">
                                    <Text className="text-[#ffaa5b] font-bold">Login</Text>
                                </Link>
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}