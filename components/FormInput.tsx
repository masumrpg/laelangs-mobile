import React, { ElementType } from "react";
import { View } from "react-native";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "react-native";
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
    inputClassName?: string;
    inputFieldClassName?: string;
    buttonClassName?: string;
    buttonTextClassName?: string;
    isTitleNameActive?: boolean;
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
                                                             inputClassName,
                                                             inputFieldClassName,
                                                             buttonClassName,
                                                             buttonTextClassName,
                                                             isTitleNameActive = false,
                                                         }: FormInputProps<T>) {
    // Determining whether the form is valid and ready for submission
    const isFormInvalid = !form.formState.isValid || form.formState.isSubmitting;

    return (
        <Box className={cn(className)}>
            {fields.map((field) => (
                <Controller
                    key={field as string}
                    control={form.control}
                    name={field}
                    render={({ field: { onChange, value }, fieldState }) => (
                        <Box className="gap-y-2 w-full">
                            {buttonName && isTitleNameActive && (
                                <Text className="font-semibold text-primary-500">
                                    {formatCamelCaseToTitle(field)}
                                </Text>
                            )}
                            <Input className={cn(
                                inputClassName,
                                "w-full rounded-xl bg-black/5 border-transparent",
                            )}
                                   size="xl"
                                   isInvalid={!!fieldState.error}>

                                {iconBefore && (
                                    <InputSlot className="pl-3">
                                        <InputIcon as={iconBefore} />
                                    </InputSlot>
                                )}

                                <InputField
                                    className={cn(
                                        inputFieldClassName,
                                    )}
                                    onChangeText={(text) => {
                                        onChange(text);
                                        if (onChangeValue) {
                                            onChangeValue(text);
                                        }
                                    }}
                                    value={value as string}
                                    placeholder={formatCamelCaseToTitle(field)}
                                    secureTextEntry={field === "password" || field === "confirmPassword"}
                                    autoCapitalize={field === "name" ? "words" : "none"}
                                />
                                {iconAfter && (
                                    <InputSlot className="pr-3">
                                        <InputIcon as={iconAfter} />
                                    </InputSlot>
                                )}
                            </Input>
                            {fieldState?.error && buttonName && (
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
                    disabled={isFormInvalid}
                    className={cn(
                        isFormInvalid ? "bg-gray-300 text-gray-500" : "bg-[#ffaa5b] text-white",
                        "mt-3 data-[active=true]:bg-[#e08d40]", buttonClassName,
                    )}
                    onPress={form.handleSubmit(onSubmit)}
                >
                    <Text className={cn(
                        isFormInvalid ? "text-gray-500" : "text-white",
                        "font-bold text-center text-lg", buttonTextClassName,
                    )}>
                        {buttonName}
                    </Text>
                </Button>
            )}
        </Box>
    );
}
