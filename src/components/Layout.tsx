import DrwaerNavigation from "./DrawerNavigation";
import Header from "./Header";
import { PropsWithChildren, FC } from "react";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <Header />
            <DrwaerNavigation />
            {children}
        </>
    );
};

export default Layout;