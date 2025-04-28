import React, { FunctionComponent } from 'react'
import { CreateProductInterface } from '../../../interfaces/Product.interface';
import { usePostProduct } from '../../../hooks/usePostProduct';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AddProductValidation } from '../../../validation/create-product.validation';
import { useGetAllProduct } from '@/hooks/useGetAllProduct';

const AddProductPage: FunctionComponent = () => {
  const { refetch } = useGetAllProduct();
  const { mutateAsync } = usePostProduct({
    action : ()=>{
      refetch()
    }
  });
  const { control, handleSubmit: submit, formState } = useForm<CreateProductInterface>({
    resolver: yupResolver(AddProductValidation)
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
        <Label htmlFor='libelle' className='mt-2 mb-1'>Libelle</Label>
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
        <Label htmlFor='description' className='mt-2 mb-1' >Description</Label>
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
        <Label htmlFor='pu' className='mt-2 mb-1' >Prix unitaire</Label>
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
        <Label htmlFor='stock' className='mt-2 mb-1' >Stock</Label>
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
          <Button variant={'success'} type='submit' >AJOUTER</Button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage