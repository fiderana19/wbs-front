import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginInterface } from '../../interfaces/Auth.interface';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginSchema = yup.object({
    usrid: yup.string().required("L'Identifiant de l'utilisateur est requis !"),
    password: yup.string().required("Password vide !")
})
const Login: React.FC = () => {  
    const { handleSubmit: submit, register, formState } = useForm<LoginInterface>({
        resolver: yupResolver(LoginSchema)
    });
    const { errors } = formState;
    const { login } = useAuth();
      
    const loginSubmit = async (data: LoginInterface) => {
        console.log(data);
        await login(data.usrid, data.password);
    }

    return(
        <div>
            <div className='w-max mx-auto'>
                <div className="mb-10 text-center font-latobold text-2xl">Connexion</div>
                <form onSubmit={submit(loginSubmit)} className="w-full">
                    <div className="mx-auto my-3">
                        <div className="text-xs">Identifiant</div>
                        <input type="text" {...register("usrid")} className={errors.usrid ? "w-64 py-1.5 px-2 rounded bg-transparent border border-red-500" : "w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500"} />
                        {errors.usrid && <div className='text-xs text-red-500 text-left'>{ errors.usrid.message }</div>}
                    </div>
                    <div className="mx-auto my-3">
                        <div className="text-xs">Mot de passe</div>
                        <input type="password" {...register("password")} className={errors.password ? "w-64 py-1.5 px-2 rounded bg-transparent border border-red-500" : "w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500"} />
                        {errors.password && <div className='text-xs text-red-500 text-left'>{ errors.password.message }</div>}
                    </div>
                    <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-latobold py-2 px-4 my-1 rounded w-64">Se connecter</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
