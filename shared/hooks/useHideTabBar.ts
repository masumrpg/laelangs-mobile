import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { usePathname } from "expo-router";

const useHideTabBar = () => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const pathname = usePathname();

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
        return isKeyboardVisible || pathname.startsWith("/home/");
    };

    return shouldHideTabBar();
};

export default useHideTabBar;