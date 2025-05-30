import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginInterface } from '../../interfaces/Auth.interface';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { LoginValidation } from '@/validation/login.validation';

const Login: React.FC = () => {  
    const { handleSubmit: submit, formState, control } = useForm<LoginInterface>({
        resolver: yupResolver(LoginValidation)
    });
    const { errors } = formState;
    const { login } = useAuth();
      
    const loginSubmit = async (data: LoginInterface) => {
        await login(data.usrid, data.password);
    }

    return(
        <div>
            <div className='w-max mx-auto'>
                <div className="mb-10 text-center font-latobold text-2xl">Connexion</div>
                <form onSubmit={submit(loginSubmit)} className="w-full">
                    <div className="mx-auto my-3">
                        <Label htmlFor='usrid' className='mb-1'>Identifiant</Label>
                        <Controller
                            name='usrid'
                            control={control}
                            render={({
                                field: { value, onChange, onBlur }
                            }) => (
                                <Input type='text' value={value} onChange={onChange} onBlur={onBlur} className={`w-64 rounded bg-transparent border ${errors.usrid ? "border-red-500" : ""}`} />
                            )}
                        />
                        {errors.usrid && <div className='text-xs text-red-500 text-left w-64'>{ errors.usrid.message }</div>}
                    </div>
                    <div className="mx-auto my-3">
                        <Label htmlFor='password' className='mb-1'>Mot de passe</Label>
                        <Controller 
                            control={control}
                            name='password'
                            render={({
                                field: { value, onChange, onBlur }
                            }) => (
                                <Input type='text' value={value} onChange={onChange} onBlur={onBlur} className={`w-64 rounded bg-transparent border ${errors.password ? "border-red-500" : ""}`} />
                            )}
                        />
                        {errors.password && <div className='text-xs text-red-500 text-left'>{ errors.password.message }</div>}
                    </div>
                    <Button variant={'secondary'} size={'lg'} className='w-64' type='submit'>SE CONNECTER</Button>
                </form>
            </div>
        </div>
    )
}

export default Login;
