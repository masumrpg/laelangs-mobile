import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { tabBarIcons } from "@/shared/icons";

interface TabBarButtonProps {
    isFocused: boolean;
    label: string | any;
    routeName: string;
    color: string;

    [key: string]: any;
}

const TabBarButton = (props: TabBarButtonProps) => {
    const { isFocused, label, routeName, color } = props;
    const Icon = tabBarIcons[routeName];

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 },
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1.4],
        );
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 8],
        );

        return {
            // styles
            transform: [{ scale: scaleValue }],
            top,
        } as ViewStyle;
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scale.value,
            [0, 1],
            [1, 0],
        );

        return {
            // styles
            opacity,
        } as TextStyle;
    });

    if (!Icon) {
        return null;
    }
    return (
        <Pressable {...props} style={styles.container}>
            <Animated.View style={[animatedIconStyle]}>
                <Icon color={color} />
            </Animated.View>

            <Animated.Text style={[{
                color,
                fontSize: 11,
            }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },
});

export default TabBarButton;
