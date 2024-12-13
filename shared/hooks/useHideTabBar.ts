import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { usePathname } from "expo-router";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { globalColors } from "@/shared/constant/constants";

const useHideTabBar = () => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const pathname = usePathname();

    const hiddenPaths = ["/home/", "/cart/", "/profile/", "/transaction/"];

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // android bar color
    useEffect(() => {
        async function setAsyncBar() {
            const isPathHidden = hiddenPaths.some((path) => pathname.startsWith(path));
            const backgroundColor = isPathHidden
                ? globalColors.whiteColor
                : globalColors.secondaryColor;
            await setBackgroundColorAsync(backgroundColor);
        }

        setAsyncBar();
    }, [pathname]);

    const shouldHideTabBar = () => {
        const isPathHidden = hiddenPaths.some((path) => pathname.startsWith(path));
        return isKeyboardVisible || isPathHidden;
    };

    return shouldHideTabBar();
};

export default useHideTabBar;
