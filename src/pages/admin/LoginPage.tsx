import React, { useState } from "react";
import { LoginInterface } from "../../interfaces/Auth.interface";
import { useAuth } from "../../context/AuthContext";
import WbsLogo from '../../assets/image/wbs-logo.png'
import { Link } from "react-router-dom";

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
            <div className="w-1/3 bg-primary flex flex-col justify-center relative">
                <img src={WbsLogo} alt="Logo" className="absolute h-12 object-cover top-5 left-5" />
                <div className="max-w-max mx-auto">
                    <div className="mb-10 text-center font-latobold text-2xl">Connexion</div>
                    <div className="w-full">
                        <div className="mx-auto my-3">
                            <div className="text-xs">Identifiant</div>
                            <input onChange={handleInputChange} type="text" name="usrid" className="w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500" />
                        </div>
                        <div className="mx-auto my-3">
                            <div className="text-xs">Mot de passe</div>
                            <input onChange={handleInputChange} type="password" name="password" className="w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500" />
                        </div>
                        <button onClick={loginSubmit} className="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-latobold py-2 px-4 my-1 rounded w-64">Se connecter</button>
                    </div>
                </div>
            </div>
            <div className="w-2/3 flex flex-col justify-center relative p-5">
                <div className="absolute h-12 object-cover top-5 right-5 flex gap-4 items-center">
                    <div>Pas encore de compte ?</div>
                    <Link to="/" className="border hover:shadow-lg transition-all font-latobold py-1.5 px-2.5 my-1 rounded-full">S'inscrire</Link>
                </div>
                <div className="text-5xl">
                    Bienvenue sur <span className="font-latobold">WBS-Caisse</span>
                </div>
                <div className="mt-4 text-xl">
                    Application pour la gestion de caisse
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;