import React from 'react';
import { SingupInterface } from '../../interfaces/Auth.interface';
import { HttpStatus } from '../../constants/Http_status';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SignupValidation } from '@/validation/signup.validation';
import { useAuth } from '@/context/AuthContext';
import { useSignup } from '@/hooks/useSignup';
import { LoadingOutlined } from '@ant-design/icons';

const Signup: React.FC = () => {
    const { login } = useAuth();
    const { mutateAsync: signup, isPending: signupLoading } = useSignup();
    const { handleSubmit: submit, formState: { errors }, control } = useForm<SingupInterface>({
        resolver: yupResolver(SignupValidation)
    });

    const signupSubmit = async (data: SingupInterface) => {
        const response = await signup(data);
        if(response?.status === HttpStatus.CREATED) {
            const usrid = response?.data;
            await login(usrid, data?.password);
        } 
    }

    return(
        <div className='w-max mx-auto'>
            <div className="mb-10 text-center font-latobold text-2xl">Inscription</div>
            <form onSubmit={submit(signupSubmit)} className="w-full">
                <div className="mx-auto my-3">
                    <Label htmlFor='username' className='mb-1'>Nom d'utilisateur</Label>
                    <Controller
                        control={control}
                        name='username'
                        render={({
                            field: { value, onChange, onBlur }
                        }) => (
                            <Input type='text' value={value} onChange={onChange} onBlur={onBlur} className={`w-64 rounded bg-transparent border ${errors.username ? "border-red-500" : ""}`} />
                        )}
                    />
                    {errors.username && <div className='text-xs text-red-500 text-left w-64'>{ errors.username.message }</div>}
                </div>
                <div className="mx-auto my-3">
                    <Label htmlFor='password' className='mb-1'>Mot de passe</Label>
                    <Controller
                        control={control}
                        name='password'
                        render={({
                            field: { value, onChange, onBlur }
                        }) => (
                            <Input type='password' value={value} onChange={onChange} onBlur={onBlur} className={`w-64 rounded bg-transparent border ${errors.password ? "border-red-500 text-red-500" : ""}`} />
                        )}
                    />
                    {errors.password && <div className='text-xs text-red-500 text-left w-64'>{ errors.password.message }</div>}
                </div>
                <Button variant={'success'} size={'lg'} className='w-64' type='submit'>
                    { signupLoading && <LoadingOutlined /> }
                    S'INSCRIRE
                </Button>
            </form>
        </div>
    )
}

export default Signup;