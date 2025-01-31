import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../api/Auth";

type AuthContextProps = {
    token?: string | null;
    isAuthenticated?: boolean;
    login: (usrid: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    )
    const navigate = useNavigate();

    const isAuthenticated = !!token;

    const login = async (usrid: string, password: string) => {
        try {
            const response: any = await loginAuth(usrid,password);
            if(response?.status === 200 || response?.status === 201) {
                if(response) {
                    const data = response?.data.token;

                    setToken(data);
                    localStorage.setItem("token", data);
                }
                return { status: 201 }
            }
            if(response?.status === 401 || response?.status === 403) {
                return { status: 401, message: response?.response.data.message }
            }
        } catch (error) {
            throw error;
        }
    }

    async function logout() {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be inside of a AuthProvider ")
    }
    return context;
}