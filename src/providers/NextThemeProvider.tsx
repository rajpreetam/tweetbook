import { ThemeProvider } from "next-themes";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";

export interface NextThemeProviderProps {
    children: ReactNode;
};

const NextThemeProvider: FunctionComponent<NextThemeProviderProps> = ({children}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {setMounted(true)}, []);
    if(!mounted) return null;
    
    return (
        <ThemeProvider attribute='class'>
            {children}
        </ThemeProvider>
    );
};

export default NextThemeProvider;