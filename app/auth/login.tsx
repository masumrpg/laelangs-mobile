import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "~/contex/AuthContex";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { router, useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import { Separator } from "~/components/ui/separator";
import BlobBackground from "~/components/BlobBackground";
import { useZodForm } from "~/shared/hooks/useZodForm";
import { LoginSchema, loginSchema } from "~/feature/login/schema";
import { type AuthSchema } from "~/feature/auth/schema";

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

            alert("Login successful!");
            router.replace("/home");
        } catch (error) {
            alert("Login failed. Please try again.");
        }
    };

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
        <View className="flex-1 items-center justify-center gap-y-10 px-10">
            {/*<BlobBackground />*/}
            <Text className="font-bold text-4xl text-primary">Login</Text>
            <View className="w-11/12 max-w-400 gap-y-8">
                <View className="gap-y-5">
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <>
                                <Input
                                    placeholder="Username"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    aria-labelledby="username"
                                    aria-errormessage="inputError"
                                />
                                {fieldState.error && (
                                    <Text className="text-red-500">{fieldState.error.message}</Text>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <>
                                <Input
                                    placeholder="Password"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    aria-labelledby="password"
                                    aria-errormessage="inputError"
                                    secureTextEntry
                                />
                                {fieldState.error && (
                                    <Text className="text-red-500">{fieldState.error.message}</Text>
                                )}
                            </>
                        )}
                    />
                </View>

                <View className="gap-y-4">
                    <Button onPress={form.handleSubmit(handleLogin)}>
                        <Text className="text-white font-bold text-base text-center">Login</Text>
                    </Button>
                    <Separator />
                    <Button variant="outline">
                        <Text>Google</Text>
                    </Button>
                </View>
                <Text className="text-gray-500 text-base text-center">
                    Belum punya akun?{" "}
                    <TouchableOpacity onPress={() => router.push("/auth/register")}>
                        <Text className="text-primary font-bold">Register</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </View>
    );
}
