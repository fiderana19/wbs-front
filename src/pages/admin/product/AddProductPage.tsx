import { Input  } from 'antd'
import React, { FunctionComponent } from 'react'
import { CreateProductInterface } from '../../../interfaces/Product.interface';
import { usePostProduct } from '../../../hooks/usePostProduct';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const productSchema = yup.object({
  libelle: yup.string().required("Le libelle est requis! "),
  description: yup.string().required("La description du produit est requise !"),
  pu: yup.string().required("Le prix unitaire est requis !"),
  stock: yup.string().required("Le stock du produit est requis !")
})
const AddProductPage: FunctionComponent = () => {
  const { mutateAsync } = usePostProduct();
  const { control, handleSubmit: submit, formState } = useForm<CreateProductInterface>({
    resolver: yupResolver(productSchema)
  });
  const { errors } = formState;

  const handleSubmit = async (data: CreateProductInterface) => {
    mutateAsync(data);
  }

  const handleKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which || e.keyCode;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }
    
  return (
    <div>
      <form className='w-2/3 my-7 mx-auto' onSubmit={submit(handleSubmit)}>
        <label htmlFor='libelle' >Libelle : </label> <br />
        <Controller 
          control={control}
          name='libelle'
          render={({
            field: {value, onBlur, onChange}
          }) => (
            <Input className={errors?.libelle ? 'text-red-500 border-red-500 rounded' : '' } value={value} onChange={onChange} onBlur={onBlur}/>
          )}
        />
        { errors?.libelle && <div className='text-xs text-red-500 text-left'>{ errors.libelle.message }</div> }
        <label htmlFor='description' >Description : </label> <br />
        <Controller 
          control={control}
          name='description'
          render={({
            field: { value, onBlur, onChange }
          }) => (
            <Input className={errors?.description ? 'text-red-500 border-red-500 rounded' : '' } value={value} onBlur={onBlur} onChange={onChange}/>
          )}
        />
        { errors?.description && <div className='text-xs text-red-500 text-left'>{ errors.description.message }</div> }
        <label htmlFor='pu' >Prix unitaire : </label> <br />
        <Controller 
          control={control}
          name='pu'
          render={({
            field: { value, onBlur, onChange }
          }) => (
            <Input className={errors?.pu ? 'text-red-500 border-red-500 rounded' : '' } onKeyPress={handleKeyPress} value={value} onBlur={onBlur} onChange={onChange}/>
          )}
        />
        { errors?.pu && <div className='text-xs text-red-500 text-left'>{ errors.pu.message }</div> }
        <label htmlFor='stock' >Stock : </label> <br />
        <Controller 
          control={control}
          name='stock'
          render={({
            field: { value, onBlur, onChange }
          }) => (
            <Input className={errors?.stock ? 'text-red-500 border-red-500 rounded' : '' } onKeyPress={handleKeyPress} value={value} onChange={onChange} onBlur={onBlur}/>
          )}
        />
        { errors?.stock && <div className='text-xs text-red-500 text-left'>{ errors.stock.message }</div> }
        <div className='flex justify-center my-3'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage