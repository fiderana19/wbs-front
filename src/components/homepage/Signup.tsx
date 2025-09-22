import React, { useState } from 'react';
import { SingupInterface } from '../../interfaces/Auth.interface';
import { signupUser } from '../../api/Auth';
import { HttpStatus } from '../../constants/Http_status';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SignupValidation } from '@/validation/signup.validation';
import { showToast } from '@/utils/Toast';
import { TOAST_TYPE } from '@/constants/ToastType';

const Signup: React.FC = () => {
    const { handleSubmit: submit, formState, control } = useForm<SingupInterface>({
        resolver: yupResolver(SignupValidation)
    });
    const { errors } = formState;
    const [usrId, setUsrId] = useState<string>("");
    const [isSignupSuccessModalOpen, setIsSignupSuccessModalOpen] = useState<boolean>(false);  

    const signupSubmit = async (data: SingupInterface) => {
        const response = await signupUser(data);
        if(response?.status === HttpStatus.CREATED) {
            setUsrId(response.data)
            setIsSignupSuccessModalOpen(true);
        } else {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de l'inscription !"
            })
        }
    }

    const handleModalOk = async () => {
        setIsSignupSuccessModalOpen(false);
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
                <Button variant={'success'} size={'lg'} className='w-64' type='submit'>S'INSCRIRE</Button>
            </form>
            <Modal title="Inscription réussie !" 
                open={isSignupSuccessModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalOk}
                onClose={handleModalOk}
            >
                <div>
                    <CheckCircleOutlined className='mr-2 text-green-500 text-lg' /> 
                    Votre identifiant pour se connecter est : 
                    {
                        usrId &&
                        <span> {usrId} </span>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default Signup;