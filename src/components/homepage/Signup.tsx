import React, { useState } from 'react';
import { SingupInterface } from '../../interfaces/Auth.interface';
import { signupUser } from '../../api/Auth';
import { HttpStatus } from '../../constants/Http_status';
import { errorMessage } from '../../utils/AntdMessage';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/button';

const SignupSchema = yup.object({
    username: yup.string().required("Username requis !"),
    password: yup.string().min(6, "Le mot de passe doit comprendre au moins 6 caracteres !").required("Mot de passe requis !")
})
const Signup: React.FC = () => {
    const { handleSubmit: submit, register, formState } = useForm<SingupInterface>({
        resolver: yupResolver(SignupSchema)
    });
    const { errors } = formState;
    const [usrId, setUsrId] = useState<string>("");
    const [isSignupSuccessModalOpen, setIsSignupSuccessModalOpen] = useState<boolean>(false);  

    const signupSubmit = async (data: SingupInterface) => {
        const response = await signupUser(data);
        if(response?.status === HttpStatus.CREATED) {
            console.log(response);
            setUsrId(response.data)
            setIsSignupSuccessModalOpen(true);
        } else {
            errorMessage("Erreur lors de l'inscription !");
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
                    <div className="text-xs">Nom d'utilisateur</div>
                    <input {...register("username")} type="text" className={errors.username ? "w-64 py-1.5 px-2 rounded bg-transparent border border-red-500" : "w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500"} />
                    {errors.username && <div className='text-xs text-red-500 text-left w-64'>{ errors.username.message }</div>}
                </div>
                <div className="mx-auto my-3">
                    <div className="text-xs">Mot de passe</div>
                    <input {...register("password")} type="password" className={errors.password ? "w-64 py-1.5 px-2 rounded bg-transparent border border-red-500 text-red-500" : "w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500"} />
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