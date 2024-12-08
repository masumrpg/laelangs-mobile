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

export const parseRupiah = (value: string) => {
    if (!value) return 0;
    const rawValue = value.startsWith("Rp. ") ? value.slice(4) : value;
    const numericValue = rawValue.replace(/\./g, "").replace(",", ".");
    return parseFloat(numericValue) || 0;
};

export const formatRupiah = (value: string, prefix = "Rp. ") => {
    value = `${value}`;
    if (!value) return "";
    const rawValue = value.startsWith(prefix) ? value.slice(prefix.length) : value;
    const numberString = rawValue.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const restNumber = split[0].length % 3;
    let rupiah = split[0].substring(0, restNumber);
    const thousand = split[0].substring(restNumber).match(/\d{3}/gi);

    if (thousand) {
        const separator = restNumber ? "." : "";
        rupiah += separator + thousand.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix + rupiah;
};
