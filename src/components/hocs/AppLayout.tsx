import { FunctionComponent, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/providers/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import NextThemeProvider from "@/providers/NextThemeProvider";

export interface AppLayoutProps {
    children: ReactNode;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({children}) => {
    return (
        <NextThemeProvider>
            <AuthProvider />
            <ToastContainer />
            {children}
        </NextThemeProvider>
    );
};

export default AppLayout;