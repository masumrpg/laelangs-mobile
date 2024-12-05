import { View, Text } from "react-native";
import { Controller } from "react-hook-form";
import { useZodForm } from "~/shared/hooks/useZodForm";
import { registerSchema, RegisterSchema } from "~/feature/register/schema";
import { Button } from "~/components/ui/button";
import { H1 } from "~/components/ui/typography";
import { Input } from "~/components/ui/input";
import React from "react";
import { Link, useRouter } from "expo-router";

export default function Register() {
    const router = useRouter();
    const form = useZodForm<RegisterSchema>({
        schema: registerSchema,
        defaultValues: { username: "", password: "" },
    });

    const handleRegister = async (data: RegisterSchema) => {
        try {
            console.log(data);
            alert("Register successful!");
        } catch (error) {
            console.log("Register failed. Please try again.", error);
        }
    };
    const fields = Object.keys(registerSchema._def.schema._def.shape()) as (keyof RegisterSchema)[];

    return (
        <View className="flex-1 items-center justify-center gap-y-10 px-10">
            <Text>
                <H1 className="text-primary">Register</H1>
            </Text>
            <View className="w-11/12 max-w-400 gap-y-8">
                <View className="gap-y-5">
                    {fields.map((field) => (
                        <Controller
                            key={field}
                            control={form.control}
                            name={field}
                            render={({ field: { onChange, value }, fieldState }) => (
                                <>
                                    <Input
                                        className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={
                                            field
                                                .replace(/([a-z])([A-Z])/g, "$1 $2")
                                                .charAt(0)
                                                .toUpperCase() +
                                            field
                                                .replace(/([a-z])([A-Z])/g, "$1 $2")
                                                .slice(1)
                                        }
                                        secureTextEntry={field === "password" || field === "confirmPassword"}
                                        autoCapitalize={field === "name" ? "words" : "none"}
                                    />
                                    {fieldState?.error && (
                                        <Text className="text-red-500 text-sm mt-1">{fieldState.error.message}</Text>
                                    )}
                                </>
                            )}
                        />
                    ))}
                    <Button
                        className="mt-3"
                        onPress={form.handleSubmit(handleRegister)}
                    >
                        <Text className="text-white font-bold text-center text-lg">Register</Text>
                    </Button>
                </View>


                <Text className="text-gray-500 text-base text-center">
                    Belum punya akun?{" "}
                    <Link href={"/auth/login"}>
                        <Text className="text-primary font-bold">Login</Text>
                    </Link>
                </Text>
            </View>
        </View>
    );
}
