import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { usePathname } from "expo-router";

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

    const shouldHideTabBar = () => {
        const isPathHidden = hiddenPaths.some((path) => pathname.startsWith(path));
        return isKeyboardVisible || isPathHidden;
    };

    return shouldHideTabBar();
};

export default useHideTabBar;