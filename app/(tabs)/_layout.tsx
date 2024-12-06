import { Tabs, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/contex/AuthContex";
import { House } from "lucide-react-native";

export default function TabsLayout() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (!isAuthenticated) {
        router.replace("/auth/login");
    }

    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false, title: "Login" }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }: { color: string }) => <House size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="transaction"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
        </Tabs>
    );
}