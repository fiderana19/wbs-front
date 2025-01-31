import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginInterface } from "../../types/Auth.interface";
import { useAuth } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
    const [loginCredentials, setLoginCredentials] = useState<LoginInterface>({ usrid: "", password: "" });
    const { login } = useAuth();

    const loginSubmit = async () => {
        console.log(loginCredentials)
        await login(loginCredentials.usrid,loginCredentials.password);
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setLoginCredentials((prev) => ({...prev, [name]: value}));
    }

    return <div className="h-screen">
        <div className="flex h-full">
            <div className="w-2/3 bg-red-400">
                niujnv
            </div>
            <div className="w-1/3 bg-primary flex flex-col justify-center">
                <div className="max-w-max mx-auto">
                    <div className="my-4 text-center">CONNEXION</div>
                    <div className="w-full">
                        <div className="mx-auto my-1">
                            <div className="text-xs">Identifiant</div>
                            <input onChange={handleInputChange} type="text" name="usrid" className="w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500" />
                        </div>
                        <div className="mx-auto my-1">
                            <div className="text-xs">Mot de passe</div>
                            <input onChange={handleInputChange} type="password" name="password" className="w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500" />
                        </div>
                        <button onClick={loginSubmit} className="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-latobold py-2 px-4 my-1 rounded w-64">Se connecter</button>
                    </div>
                    <div className="flex mt-10">
                        Pas encore de compte? <Link to="/login"><div className="text-blue-600 underline mx-1">S'incrire</div></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;