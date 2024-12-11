import { Tabs, usePathname, useRouter } from "expo-router";
import { useAuth } from "@/shared/contex/AuthContex";
import TabBar from "@/components/TabBar";
import { tabBarNameList } from "@/shared/icons";
import { formatCamelCaseToTitle } from "@/lib/utils";
import { globalColors } from "@/shared/constant/constants";
import { useEffect } from "react";

export default function TabsLayout() {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const router = useRouter();


    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/auth/login");
        }
    }, [isAuthenticated, pathname, router]);

    return (
        <Tabs
            tabBar={props => <TabBar primaryColor={globalColors.secondaryColor} secondaryColor={"#737373"}
                                     props={props} />}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            {tabBarNameList.map((name) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        title: formatCamelCaseToTitle(name),
                    }}
                />
            ))}
        </Tabs>
    );
}