import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdAt.getTime();

    const minuteInMs = 60 * 1000;
    const hourInMs = 60 * minuteInMs;
    const dayInMs = 24 * hourInMs;
    const weekInMs = 7 * dayInMs;
    const monthInMs = 30 * dayInMs;
    const yearInMs = 365 * dayInMs;

    if (timeDifference < minuteInMs) {
        const seconds = Math.floor(timeDifference / 1000);
        return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < hourInMs) {
        const minutes = Math.floor(timeDifference / minuteInMs);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < dayInMs) {
        const hours = Math.floor(timeDifference / hourInMs);
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < weekInMs) {
        const days = Math.floor(timeDifference / dayInMs);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < monthInMs) {
        const weeks = Math.floor(timeDifference / weekInMs);
        return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < yearInMs) {
        const months = Math.floor(timeDifference / monthInMs);
        return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
        const years = Math.floor(timeDifference / yearInMs);
        return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
};

export const getFormattedNumber = (number: number): string => {
    if (number < 1000) return number.toString(); // Return the same number
    if (number < 1000000) return `${(number / 1000).toFixed(1)}K`; // Convert to K for number from 1000 < n < 1 million
    if (number < 1000000000) return `${(number / 1000000).toFixed(1)}M`; // Convert to M for number from 1 million < n < 1 billion
    return `${(number / 1000000000).toFixed(1)}B`; // Convert to B for number n > 1 billion
};
