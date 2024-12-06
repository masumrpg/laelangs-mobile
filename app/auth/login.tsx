import React from "react";
import { Text } from "react-native";
import { Link, useRouter } from "expo-router";
import { Path } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { LoginSchema, loginSchema } from "@/feature/login/schema";
import FormInput from "@/components/FormInput";
import { Heading } from "@/components/ui/heading";
import { useAuth } from "@/contex/AuthContex";
import { AuthSchema } from "@/feature/auth/schema";
import { Box } from "@/components/ui/box";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

    const form = useZodForm<LoginSchema>({
        schema: loginSchema,
        defaultValues: { username: "", password: "" },
    });

    const handleLogin = async (data: LoginSchema) => {
        try {
            const response = await fakeLoginRequest(data);
            const { accessToken, refreshToken, userId, merchantId } = response;

            await login({ accessToken, refreshToken, userId, merchantId });

            console.log(data);
            router.replace("/home");
        } catch (error) {
            alert("Login failed. Please try again.");
            console.log(error);
        }
    };

    const fields = Object.keys(loginSchema._def.shape()) as Path<LoginSchema>[];

    const fakeLoginRequest = async (credentials: LoginSchema): Promise<AuthSchema> => {
        return new Promise((resolve) =>
            setTimeout(
                () =>
                    resolve({
                        accessToken: "fake_access_token",
                        refreshToken: "fake_refresh_token",
                        userId: "12345",
                        merchantId: "67890",
                    }),
                1000,
            ),
        );
    };


    return (
        <Box className="flex-1 items-center justify-center gap-y-10 px-10">
            {/*<BlobBackground />*/}
            <Heading className="text-primary-0 text-3xl font-bold">Login</Heading>
            <FormInput className={"w-11/12 max-w-400 gap-y-5"} fields={fields} form={form} onSubmit={handleLogin}
                       buttonName="Login" />
            <Text className="text-gray-500 text-base text-center">
                Belum punya akun?{" "}
                <Link href={"/auth/register"}>
                    <Text className="text-primary-0 font-bold">Register</Text>
                </Link>
            </Text>
        </Box>
    );
}
