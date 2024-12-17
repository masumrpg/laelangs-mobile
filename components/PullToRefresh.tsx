import React, { useRef, useState } from "react";
import { Animated, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView, Text } from "react-native";

type PullToRefreshProps = {
    children: React.ReactNode;
    onRefresh: () => Promise<unknown>;
    spinnerText?: string;
};

const PullToRefresh: React.FC<PullToRefreshProps> = ({
                                                         children,
                                                         onRefresh,
                                                         spinnerText,
                                                     }) => {
    const [refreshing, setRefreshing] = useState(false);
    const translateY = useRef(new Animated.Value(0)).current;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const pullDistance = event.nativeEvent.contentOffset.y;

        const maxPullDistance = 60;
        const offset = 20;

        if (pullDistance < 0) {
            Animated.timing(translateY, {
                toValue: Math.min(Math.abs(pullDistance) + offset, maxPullDistance),
                duration: 100,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await onRefresh();
        setRefreshing(false);
    };

    return (
        <ScrollView
            className={"bg-white"}
            // className="flex-1"
            // contentContainerStyle={{ flexGrow: 1 }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={["#ff6347"]}
                    tintColor="#ff6347"
                />
            }
        >
            <Animated.View
                style={{
                    transform: [{ translateY }],
                    position: "absolute",
                    top: -40,
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text className="text-2xl text-secondary-500">{spinnerText}</Text>
            </Animated.View>
            {children}
        </ScrollView>
    );
};

export default PullToRefresh;
