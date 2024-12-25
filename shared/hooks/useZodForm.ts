import { useForm, FieldValues, UseFormReturn, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";

type UseZodFormProps<T extends FieldValues> = {
    schema: ZodSchema<T>;
    defaultValues?: DefaultValues<T>;
};

export const useZodForm = <T extends FieldValues>({
                                                      schema,
                                                      defaultValues,
                                                  }: UseZodFormProps<T>): UseFormReturn<T> => {
    return useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: "onChange",
    });
};
