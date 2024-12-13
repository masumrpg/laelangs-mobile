import React from "react";
import { Image, Text } from "react-native";
import { Link, useRouter } from "expo-router";
import { Path } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { LoginSchema, loginSchema } from "@/feature/login/schema";
import FormInput from "@/components/FormInput";
import { Heading } from "@/components/ui/heading";
import { useAuth } from "@/shared/contex/AuthContex";
import { Box } from "@/components/ui/box";
import { authService } from "@/service/authService";
import LocalAuthBiometric from "@/components/LocalAuthBiometric";
import { useToast } from "@/shared/hooks/useToast";
import Animated, { FadeInUp } from "react-native-reanimated";


export default function Login() {
    const { showToast } = useToast();
    const router = useRouter();
    const { login } = useAuth();

    const form = useZodForm<LoginSchema>({
        schema: loginSchema,
        defaultValues: { username: "", password: "" },
    });

    const handleLogin = async (data: LoginSchema) => {
        try {
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
        <Box className="h-full w-full">
            {/*background*/}
            <Image className={"w-full h-full absolute"} source={require("@/assets/images/background.png")} />
            {/*light*/}
            <Box className={"flex-row justify-around w-full absolute"}>
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className={"h-[225] w-[90]"}
                                source={require("@/assets/images/light.png")} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className={"h-[160] w-[65]"}
                                source={require("@/assets/images/light.png")} />
            </Box>

            {/*content*/}
            <Box className={"h-full w-full px-5 justify-center items-center pt-32 gap-y-48"}>
                <Box className={"flex items-center"}>
                    <Heading className="text-white text-6xl font-bold text-center">Login</Heading>
                </Box>
                <Box>
                    <FormInput
                        className={"w-11/12 max-w-400 gap-y-5"} fields={fields}
                        form={form}
                        isTitleNameActive={true}
                        onSubmit={handleLogin}
                        buttonName="Login"
                        inputClassName={"h-16 data-[focus=true]:border-[#ffaa5b]"}
                        buttonClassName={"h-16 rounded-xl"}
                        buttonTextClassName={"text-xl font-bold text-center text-white"}
                        titleNameClassName={"text-[#ffaa5b] text-xl ml-2"}
                    />
                    <Text className="text-gray-500 text-xl text-center mt-8">
                        Belum punya akun?{" "}
                        <Link href={"/auth/register"}>
                            <Text className="text-[#ffaa5b] font-bold">Register</Text>
                        </Link>
                    </Text>
                </Box>
            </Box>
            <Box className={"absolute bottom-10 left-1/2 transform -translate-x-1/2"}>
                <LocalAuthBiometric />
            </Box>
        </Box>
    );
}
