import FormInput from "@/components/FormInput";
import { Path } from "react-hook-form";
import { HomeSearchSchema, homeSearchSchema } from "@/feature/home/schema";
import { useZodForm } from "@/shared/hooks/useZodForm";
import { Search } from "lucide-react-native";

export default function HomeSearch() {
    const form = useZodForm<HomeSearchSchema>({
        schema: homeSearchSchema,
        defaultValues: {},
    });

    const onChange = (data: string) => {
        console.log(data);
    };

    const fields = Object.keys(homeSearchSchema._def.shape()) as Path<HomeSearchSchema>[];

    return (
        <FormInput
            className="w-full"
            fields={fields}
            form={form}
            onChangeValue={onChange}
            iconBefore={Search}
        />
    );
}