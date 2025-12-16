"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GoldenCTAProps {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "outline";
    size?: "sm" | "default" | "lg";
    className?: string;
    showArrow?: boolean;
}

const GoldenCTA = ({
    href,
    children,
    variant = "primary",
    size = "default",
    className,
    showArrow = true,
}: GoldenCTAProps) => {
    return (
        <Button
            asChild
            size={size}
            className={cn(
                variant === "primary"
                    ? "bg-[#FEBD18] hover:bg-[#E5A916] text-gray-900"
                    : "border border-[#71B344] bg-transparent text-[#71B344] hover:bg-[#71B344] hover:text-white",
                "gap-2",
                className
            )}
        >
            <Link href={href}>
                {children}
                {showArrow && <ArrowRight className="w-4 h-4" />}
            </Link>
        </Button>
    );
};

export default GoldenCTA;
