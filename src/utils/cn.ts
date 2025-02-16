import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null)[]) {
    // Merge class names safely
    return twMerge(clsx(...inputs));
}
