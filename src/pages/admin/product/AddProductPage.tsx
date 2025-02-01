import { Input  } from 'antd'
import React, { FunctionComponent, useState } from 'react'
import { postProduct } from '../../../api/Product';
import { HttpStatus } from '../../../constants/Http_status';
import { CreateProductInterface } from '../../../interfaces/Product.interface';

const AddProductPage: FunctionComponent = () => {
  const [productCredentials, setProductCredentials] = useState<CreateProductInterface>({ libelle: "", description: "", pu: 0, stock: 0});
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await postProduct(token, productCredentials);
    if(response?.status === HttpStatus.CREATED) {
      console.log("Success");
    } else {
      console.log("Error")
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProductCredentials((prevFormData) => ({...prevFormData, [name]: value}));
  }

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
        <Input name='libelle' value={productCredentials.libelle} onChange={handleChange}/>
        <label htmlFor='description' >Description : </label> <br />
        <Input name='description' value={productCredentials.description} onChange={handleChange}/>
        <label htmlFor='pu' >Prix unitaire : </label> <br />
        <Input name='pu' onKeyPress={handleKeyPress} value={productCredentials.pu} onChange={handleChange}/>
        <label htmlFor='stock' >Stock : </label> <br />
        <Input name='stock' onKeyPress={handleKeyPress} value={productCredentials.stock} onChange={handleChange}/>
        <div className='flex justify-center my-3'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage