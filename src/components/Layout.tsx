import Header from "./Header";
import { PropsWithChildren, FC } from "react";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <Header />
            <Layout />
            {children}
        </>
    );
};

export default Layout;