import Toast from "react-native-toast-message";

interface UseToastProps {
    type: "success" | "info" | "error";
    title: string | "Success" | "Info" | "Error";
    message: string;
    duration?: number;
    position?: "top" | "bottom";
    onPress?: () => void;
}

export const useToast = () => {
    const showToast = ({
                           type,
                           title,
                           message,
                           duration = 4000,
                           position = "top",
                           onPress,
                       }: UseToastProps) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
            visibilityTime: duration,
            position,
            onPress,
            text1Style: {
                fontWeight: "bold",
                fontSize: 15,
            },
            text2Style: {
                fontWeight: "normal",
                fontSize: 10,
            },
        });
    };

    return { showToast };
};
