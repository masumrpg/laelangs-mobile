import { Text } from "react-native";
import { Path } from "react-hook-form";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { registerSchema, RegisterSchema } from "@/feature/register/schema";
import React from "react";
import { Link, useRouter } from "expo-router";
import FormInput from "@/components/FormInput";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

export default function Register() {
    const router = useRouter();

    const form = useZodForm<RegisterSchema>({
        schema: registerSchema,
        defaultValues: {},
    });

    const handleRegister = async (data: RegisterSchema) => {
        try {
            console.log(data);
            alert("Register successful!");
            router.replace("/auth/login");
        } catch (error) {
            console.log("Register failed. Please try again.", error);
        }
    };
    const fields = Object.keys(registerSchema._def.schema._def.shape()) as Path<RegisterSchema>[];

    return (
        <Box className="flex-1 items-center justify-center gap-y-10 px-10">
            <Heading className="text-primary-500 text-3xl font-bold">Register</Heading>
            <FormInput className={"w-11/12 max-w-400 gap-y-5"} fields={fields} form={form} onSubmit={handleRegister}
                       buttonName="Register" />

            <Text className="text-gray-500 text-base text-center">
                Belum punya akun?{" "}
                <Link href={"/auth/login"}>
                    <Text className="text-primary-500 font-bold">Login</Text>
                </Link>
            </Text>
        </Box>
    );
}
