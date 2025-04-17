import { createContext, ReactNode, useContext, useState } from "react";

type DarkThemeContextProps = {
    isDark?: boolean;
    toggleTheme: () => void;
}

const DarkThemeContext = createContext<DarkThemeContextProps | undefined>(undefined);

export const DarkThemeProvider = ({children} : {children: ReactNode}) => {
    const [isDark, setIsDark] = useState<boolean>(false);

    function toggleTheme () {
        setIsDark(!isDark);
    }

    return(
        <DarkThemeContext.Provider 
            value={{
                isDark,
                toggleTheme
            }}
        >
            {children}
        </DarkThemeContext.Provider>
    )
}

export function useDark () {
    const context = useContext(DarkThemeContext);
    if(context === undefined) {
        throw Error('useDark must be inside of DarkThemeProvider');
    }
    return context;
}