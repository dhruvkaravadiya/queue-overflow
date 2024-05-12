"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
    mode: string;
    setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Lazy Initialization :
    // Get the theme from local storage or the user's system preferences
    // by passing a function to useState instead of a value to be set initially
    const [mode, setMode] = useState<string>(() => {
        const storedMode = localStorage.theme?.toString() ?? "";
        if (
            storedMode === "dark" ||
            (!storedMode.length &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            return "dark";
        } else {
            return "light";
        }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleThemeChange = () => {
        if (mode === "dark") {
            setMode("dark");
            document.documentElement.classList.add("dark");
        } else {
            setMode("light");
            document.documentElement.classList.remove("dark");
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(handleThemeChange, 300);
        return () => clearTimeout(timeoutId);
    }, [handleThemeChange]);

    return (
        <ThemeContext.Provider value={{ mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to consume the theme context
// in all functional components throughout the app
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
