import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginInterface } from '../../interfaces/Auth.interface';

const Signup: React.FC = () => {
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

    return(
        <div className='w-max mx-auto'>
            <div className="mb-10 text-center font-latobold text-2xl">Inscription</div>
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
    )
}

export default Signup;