import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import TabBarButton from "@/components/TabBarButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useHideTabBar from "@/shared/hooks/useHideTabBar";
import { Box } from "@/components/ui/box";
import { globalColors } from "@/shared/constant/constants";

interface TabBarProps {
    primaryColor: string;
    secondaryColor: string;
    props: BottomTabBarProps;
}

const TabBar: React.FC<TabBarProps> = ({ primaryColor, secondaryColor, props }) => {
    const { state, descriptors, navigation } = props;
    const shouldHideTabBar = useHideTabBar();
    const [isTabBarVisible, setIsTabBarVisible] = useState<boolean>(true);

    useEffect(() => {
        setIsTabBarVisible(!shouldHideTabBar);
    }, [shouldHideTabBar]);

    return (
        <Box
            style={[
                styles.tabBar,
                { display: isTabBarVisible ? "flex" : "none" },
            ]}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                if (["_sitemap", "+not-found"].includes(route.name)) return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? primaryColor : "white"}
                        label={label}
                    />
                );
            })}
        </Box>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: globalColors.secondaryColor,
        paddingVertical: 10,
    },
});

export default TabBar;