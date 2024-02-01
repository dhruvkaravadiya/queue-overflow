import React from "react";
import "../globals.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return <main className="flex-center">{children}</main>;
};

export default Layout;
