import { Input ,message  } from 'antd'
import React, { FunctionComponent, useState } from 'react'
import { postClient } from '../../../api/Client';
import { HttpStatus } from '../../../constants/Http_status';
import { CreateClientInterface } from '../../../interfaces/Client.interface';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const AddClientPage: FunctionComponent<StepsPropsType> = ({handlePrev , handleNext}) => {
  const [formData, setFormData] = useState<CreateClientInterface>({ nom_client: "", adresse_client: "", mail_client: "" , telephone_client: "",});
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  //handling the form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await postClient(token, formData);
    if(response?.status === HttpStatus.CREATED) {
      successMessage();
      handleNext()
    } else {
      console.log("Error");
    }
  }
  //success message 
  const successMessage = () => {
    message.success('Client ajouté avec succés !');
  };
  //handling the input change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  }
  //handling the keypress
  const handleKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which || e.keyCode;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }
    
  return (
    <div className='py-16  flex justify-center'>
      <div className='text-center'>
        <div className='text-2xl font-bold'>CLIENT</div>
        <form className='my-7 w-60 text-left' onSubmit={handleSubmit}>
          <label htmlFor='nom_client'>Nom : </label><br />
          <Input name='nom_client' className='my-1' value={formData.nom_client} onChange={handleChange} required /><br />
          <label htmlFor='adresse_client'>Adresse : </label><br />
          <Input name='adresse_client' className='my-1' value={formData.adresse_client} onChange={handleChange} required/><br />
          <label htmlFor='mail_client'>Mail : </label><br />
          <Input name='mail_client' className='my-1' value={formData.mail_client} onChange={handleChange} /><br />
          <label htmlFor='telephone_client'>Numero de telephone : </label><br />
          <Input name='telephone_client' className='my-1' value={formData.telephone_client} onChange={handleChange} onKeyPress={handleKeyPress} required /><br />
          <div className='flex justify-center my-3'>
            <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' type='submit'>AJOUTER</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddClientPage;