"use client";

import React from "react";
import { useTheme } from "@/app/context/ThemeProvider";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import Sun from "../../../../public/assets/icons/sun.svg";
import Moon from "../../../../public/assets/icons/moon.svg";
import { themes } from "@/constants";
const Theme = () => {
    const { mode, setMode } = useTheme();

    const handleThemeChange = (item: {
        value: any;
        label?: string;
        icon?: string;
    }) => {
        setMode(item.value);
        if (item.value !== "system") {
            localStorage.theme = item.value;
        } else {
            localStorage.removeItem("theme");
        }
    };

    return (
        <Menubar className="relative border-none bg-transparent shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
                    {mode === "light" ? (
                        <Image
                            src={Sun}
                            width={20}
                            height={20}
                            className="active-theme"
                            alt={"sun"}
                        />
                    ) : (
                        <Image
                            src={Moon}
                            width={20}
                            height={20}
                            className="active-theme"
                            alt={"moon"}
                        />
                    )}
                </MenubarTrigger>
                <MenubarContent
                    className="absolute right-[-3rem] mt-2 min-w-[120px]
                 rounded border py-2 dark:border-dark-400 dark:bg-dark-300"
                >
                    {themes.map((item) => (
                        <MenubarItem
                            className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
                            key={item.value}
                            onClick={() => handleThemeChange(item)}
                        >
                            <Image
                                src={item.icon}
                                alt={item.value}
                                width={16}
                                height={16}
                                className={`${mode === item.value && "active-theme"}`}
                            />
                            <p
                                className={`body-semibold text-light-500 
                                ${
                                    mode === item.value
                                        ? "text-primary-500"
                                        : "text-dark100_light900"
                                }
                              `}
                            >
                                {item.label}
                            </p>
                        </MenubarItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default Theme;
