import React from "react";
import { Box } from "@/components/ui/box";
import { cn } from "@/lib/utils";

interface ScreenLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function ScreenLayout({ children, className }: ScreenLayoutProps) {
    return (
        <Box className={cn(
            className,
            "flex-1 p-5 pt-32 pb-16 bg-white",
        )}>
            {children}
        </Box>
    );
}