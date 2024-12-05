import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false, title: "Login" }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
        </Tabs>
    );
}