import { Input  } from 'antd'
import React, { FunctionComponent, useState } from 'react'
import axios from 'axios';

interface FormData {
  libelle: string;
  description: string;
  pu: number;
  stock: number;
}

const AddProduct: FunctionComponent = () => {
  const [formData, setFormData] = useState<FormData>({ libelle: "", description: "", pu: 0, stock: 0});
  //handling the form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response  = await  axios({
        method: 'post',
        url: 'http://localhost:3001/product/',
        data: formData,
      });
    } catch (error) {
      console.error("AddProduct : Erreur d'ajout de produit : " + error);
    }
  }
  //handling the input change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  }
  //handling the key press
  const handleKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which || e.keyCode;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }
    
  return (
    <div>
      <form className='w-2/3 my-7 mx-auto' onSubmit={handleSubmit}>
        <label htmlFor='libelle' >Libelle : </label> <br />
        <Input name='libelle' value={formData.libelle} onChange={handleChange}/>
        <label htmlFor='description' >Description : </label> <br />
        <Input name='description' value={formData.description} onChange={handleChange}/>
        <label htmlFor='pu' >Prix unitaire : </label> <br />
        <Input name='pu' onKeyPress={handleKeyPress} value={formData.pu} onChange={handleChange}/>
        <label htmlFor='stock' >Stock : </label> <br />
        <Input name='stock' onKeyPress={handleKeyPress} value={formData.stock} onChange={handleChange}/>
        <div className='flex justify-center my-3'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct