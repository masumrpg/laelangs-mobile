import React, { ElementType } from "react";
import { View } from "react-native";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { cn, formatCamelCaseToTitle } from "@/lib/utils";
import { Box } from "@/components/ui/box";


interface FormInputProps<T extends FieldValues> {
    fields: Path<T>[];
    form: UseFormReturn<T>;
    onSubmit?: (data: T) => void;
    buttonName?: string;
    iconBefore?: ElementType;
    iconAfter?: ElementType;
    onChangeValue?: (value: string) => void;
    className?: string;
}

export default function FormInput<T extends FieldValues>({
                                                             fields,
                                                             form,
                                                             onSubmit,
                                                             buttonName,
                                                             iconBefore,
                                                             iconAfter,
                                                             onChangeValue,
                                                             className,
                                                         }: FormInputProps<T>) {
    return (
        <View className={cn(
            className,
        )}>
            {fields.map((field) => (
                <Controller
                    key={field as string}
                    control={form.control}
                    name={field}
                    render={({ field: { onChange, value }, fieldState }) => (
                        <Box className={"gap-y-2"}>
                            {buttonName && (
                                <Text size={"lg"} className="font-semibold text-primary-0">
                                    {formatCamelCaseToTitle(field)}
                                </Text>
                            )}
                            <Input
                                className={"h-15"}
                                variant="outline"
                                size="sm"
                                isInvalid={!!fieldState.error}
                            >
                                {
                                    iconBefore && (
                                        <InputSlot className="pl-3">
                                            <InputIcon as={iconBefore} />
                                        </InputSlot>
                                    )
                                }
                                <InputField
                                    onChangeText={(text) => {
                                        onChange(text);
                                        if (onChangeValue) {
                                            onChangeValue(text);
                                        }
                                    }}
                                    value={value as string}
                                    placeholder={
                                        formatCamelCaseToTitle(field)
                                    }
                                    secureTextEntry={field === "password" || field === "confirmPassword"}
                                    autoCapitalize={field === "name" ? "words" : "none"}
                                />
                                {
                                    iconAfter && (
                                        <InputSlot className="pr-3">
                                            <InputIcon as={iconAfter} />
                                        </InputSlot>
                                    )
                                }
                            </Input>
                            {fieldState?.error && (buttonName === "" || null || undefined) && (
                                <Text className="text-red-500 text-sm mt-1">
                                    {fieldState.error.message}
                                </Text>
                            )}
                        </Box>
                    )}
                />
            ))}
            {buttonName && onSubmit && (
                <Button
                    className="mt-3"
                    onPress={form.handleSubmit(onSubmit)}
                >
                    <Text className="text-white font-bold text-center text-lg">{buttonName}</Text>
                </Button>
            )}
        </View>
    );
}
