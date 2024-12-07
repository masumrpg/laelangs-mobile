import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import TabBarButton from "@/components/TabBarButton";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import useHideTabBar from "@/shared/hooks/useHideTabBar";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";

interface TabBarProps {
    primaryColor: string;
    secondaryColor: string;
    props: BottomTabBarProps;
}

const TabBar: React.FC<TabBarProps> = ({ primaryColor, secondaryColor, props }) => {
    const { state, descriptors, navigation } = props;
    const shouldHideTabBar = useHideTabBar();

    const tabBarAnimation = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withTiming(shouldHideTabBar ? 100 : 0, {
                        duration: 300,
                        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    }),
                },
            ],
        };
    }, [shouldHideTabBar]);

    useEffect(() => {
        tabBarAnimation.value = shouldHideTabBar ? 100 : 0;
    }, [tabBarAnimation, shouldHideTabBar]);

    return (
        // <View
        //     className="absolute bottom-5 flex-row justify-between items-center bg-white mx-5 py-4 rounded-full shadow-2xl"
        //     style={[shouldHideTabBar && { display: "none" }]}
        // >
        <Animated.View style={[styles.tabBar, animatedStyles]}>
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
                        color={isFocused ? primaryColor : secondaryColor}
                        label={label}
                    />
                );
            })}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default TabBar;
