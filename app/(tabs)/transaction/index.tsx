import * as React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";


export default function Index() {
    const router = useRouter();
    const id = 5;
    return (
        <Box className="flex-1 items-center gap-5 p-6 bg-secondary/30">
            <Text>Hello Home</Text>
            <Button onPress={() => router.push(`/transaction/${id}`)}></Button>
        </Box>
    );
}
