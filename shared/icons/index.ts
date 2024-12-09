import React from "react";
import { House, ReceiptText, ShoppingCart, User } from "lucide-react-native";

type IconComponent = React.ElementType;

export const tabBarIcons: Record<string, IconComponent> = {
    home: House,
    transaction: ReceiptText,
    cart: ShoppingCart,
    profile: User,
};

export const tabBarNameList: string[] = Object.keys(tabBarIcons);