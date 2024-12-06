import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCamelCaseToTitle(field: string) {
    const formattedString = field
        .toString()
        .replace(/([a-z])([A-Z])/g, "$1 $2");
    return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
}
