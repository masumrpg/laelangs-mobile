import { Image, Text } from "react-native";
import { Path } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { registerSchema, RegisterFormSchema } from "@/feature/register/schema";
import React from "react";
import { Link, useRouter } from "expo-router";
import FormInput from "@/components/FormInput";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { authService } from "@/service/authService";
import { useToast } from "@/shared/hooks/useToast";
import Animated, { FadeInUp } from "react-native-reanimated";
import LocalAuthBiometric from "@/components/LocalAuthBiometric";

export default function Register() {
    const router = useRouter();
    const { showToast } = useToast();

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
        <Box className="h-full w-full">
            {/*background*/}
            <Image className={"w-full h-full absolute -mt-28"} source={require("@/assets/images/background.png")} />
            {/*light*/}
            <Box className={"flex-row justify-around w-full absolute"}>
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()}
                                className={"h-[225] w-[90] -mt-20"}
                                source={require("@/assets/images/light.png")} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()}
                                className={"h-[160] w-[65] -mt-20"}
                                source={require("@/assets/images/light.png")} />
            </Box>

            {/*content*/}
            <Box className={"h-full w-full px-5 justify-center items-center pt-48 gap-y-32"}>
                <Box className={"flex items-center"}>
                    <Heading className="text-white text-6xl font-bold text-center">Register</Heading>
                </Box>
                <Box>
                    <FormInput
                        className={"w-11/12 max-w-400 gap-y-5"} fields={fields}
                        form={form}
                        onSubmit={handleRegister}
                        buttonName="Register"
                        inputClassName={"h-16 data-[focus=true]:border-[#ffaa5b]"}
                        buttonClassName={"h-16 rounded-xl"}
                        buttonTextClassName={"text-xl font-bold text-center text-white"}
                        isTitleNameActive={true}
                        titleNameClassName={"text-[#ffaa5b] text-xl ml-2"}
                    />
                    <Text className="text-gray-500 text-xl text-center mt-8">
                        Sudah punya akun?{" "}
                        <Link href={"/auth/login"}>
                            <Text className="text-[#ffaa5b] font-bold">Login</Text>
                        </Link>
                    </Text>
                </Box>
            </Box>
            <Box className={"absolute bottom-14 left-1/2 transform -translate-x-1/2"}>
                <LocalAuthBiometric />
            </Box>
        </Box>
    );
}
