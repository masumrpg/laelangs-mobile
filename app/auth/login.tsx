import React from "react";
import { Text } from "react-native";
import { Link, useRouter } from "expo-router";
import { Path } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { LoginSchema, loginSchema } from "@/feature/login/schema";
import FormInput from "@/components/FormInput";
import { Heading } from "@/components/ui/heading";
import { useAuth } from "@/shared/contex/AuthContex";
import { Box } from "@/components/ui/box";
import { authService } from "@/service/authService";

export default function Login() {
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
                alert("Successfully logged in!");
                router.replace("/home");
            }
        } catch (error) {
            alert("Login failed. Please try again.");
            console.log(error);
        }
    };

    const fields = Object.keys(loginSchema._def.shape()) as Path<LoginSchema>[];

    return (
        <Box className="flex-1 items-center justify-center gap-y-10 px-10">
            {/*<BlobBackground />*/}
            <Heading className="text-primary-500 text-3xl font-bold">Login</Heading>
            <FormInput className={"w-11/12 max-w-400 gap-y-5"} fields={fields} form={form} onSubmit={handleLogin}
                       buttonName="Login" />
            <Text className="text-gray-500 text-base text-center">
                Belum punya akun?{" "}
                <Link href={"/auth/register"}>
                    <Text className="text-primary-500 font-bold">Register</Text>
                </Link>
            </Text>
        </Box>
    );
}
