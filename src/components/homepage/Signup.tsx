import React, { useState } from 'react';
import { SingupInterface } from '../../interfaces/Auth.interface';
import { signupUser } from '../../api/Auth';
import { HttpStatus } from '../../constants/Http_status';
import { errorMessage } from '../../utils/AntdMessage';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [signupCredentials, setSignupCredentials] = useState<SingupInterface>({ username: "", password: "" });
    const [usrId, setUsrId] = useState<string>("");
    const [isSignupSuccessModalOpen, setIsSignupSuccessModalOpen] = useState<boolean>(false);  
    const navigate = useNavigate();

    const signupSubmit = async () => {
        console.log(signupCredentials);

        const response = await signupUser(signupCredentials);
        if(response?.status === HttpStatus.CREATED) {
            console.log(response);
            setUsrId(response.data)
            setSignupCredentials({username: "", password: ""});
            setIsSignupSuccessModalOpen(true);
        } else {
            errorMessage("Erreur lors de l'inscription !");
        }
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setSignupCredentials((prev) => ({...prev, [name]: value}));
    }

    const handleModalOk = async () => {
        setIsSignupSuccessModalOpen(false);
    }

    return(
        <div className='w-max mx-auto'>
            <div className="mb-10 text-center font-latobold text-2xl">Inscription</div>
            <div className="w-full">
                <div className="mx-auto my-3">
                    <div className="text-xs">Nom d'utilisateur</div>
                    <input value={signupCredentials.username} onChange={handleInputChange} type="text" name="username" className="w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500" />
                </div>
                <div className="mx-auto my-3">
                    <div className="text-xs">Mot de passe</div>
                    <input value={signupCredentials.password} onChange={handleInputChange} type="password" name="password" className="w-64 py-1.5 px-2 rounded bg-transparent border border-gray-500" />
                </div>
                <button onClick={signupSubmit} className="bg-blue-500 hover:bg-blue-700 text-white mx-auto font-latobold py-2 px-4 my-1 rounded w-64">S'inscrire</button>
            </div>
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