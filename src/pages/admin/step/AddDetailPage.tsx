import { Button, Input, Select } from 'antd'
import React, { FunctionComponent } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import { CreateDetailInterface } from '../../../interfaces/Detail.interface';
import { usePostDetail } from '../../../hooks/usePostDetail';
import { useGetAllProduct } from '../../../hooks/useGetAllProduct';
import { useGetAllTransaction } from '../../../hooks/useGetAllTransaction';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDark } from '../../../context/DarkThemeContext';
import { AddDetailValidation } from '@/validation/create-detail.validation';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const { Option } = Select;

const AddDetailPage: FunctionComponent<StepsPropsType> = ({handlePrev , handleNext}) => {
  const { control, handleSubmit: submit, formState } = useForm<CreateDetailInterface>({
    resolver: yupResolver(AddDetailValidation)
  });
  const { errors } = formState;
  const { mutateAsync } = usePostDetail();
  const { data: products } = useGetAllProduct();
  const { data: transactions } = useGetAllTransaction();
  const { isDark } = useDark();

  const handleSubmit = async (data: CreateDetailInterface) => {
    mutateAsync(data);
  }

  const handleKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which || e.keyCode;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }
    
  return (
    <div className={isDark ? 'dark-container py-16 flex justify-center min-h-screen h-full' : 'py-16 flex justify-center'}>
      <button onClick={handlePrev}
        className='fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <ArrowLeftOutlined /> Retour 
      </button>
      <div className='text-center'>
        <div className='text-2xl font-bold'>DETAIL DU TRANSACTION</div>
          <form className='w-60 mx-auto my-7 text-left' onSubmit={submit(handleSubmit)}>
            <label htmlFor='transaction'>Transaction : </label><br />
            <Controller 
              control={control}
              name='transaction'
              render={({
                field: { value, onBlur, onChange }
              }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  className='w-full my-1'
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="">Sélectionnez une transaction</Option>
                    {
                      transactions && transactions.map((tr: any) => {
                        return(
                          <Option key={tr._id} value={tr._id}>
                            { `${tr.nom_client} ${dayjs(tr.date_transaction).format('DD-MM-YYYY HH:mm').toString()}` }
                          </Option>
                        )
                      })
                    }
                </Select>  
              )}
            />
            <label htmlFor='product'>Produit : </label><br />
            <Controller 
              control={control}
              name='product'
              render={({
                field: { value, onBlur, onChange }
              }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  className='w-full my-1'
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="">Sélectionnez un produit</Option>
                  {
                    products && products.map((pr: any) => {
                      return(
                        <Option key={pr._id} value={pr._id}>
                          {pr.libelle}
                        </Option>
                      )
                    })
                  }
                </Select>  
              )}
            />
            <label htmlFor='quantite'>Quantité : </label><br />
            <Controller 
              control={control}
              name='quantite'
              render={({
                field: { value, onBlur, onChange }
              }) => (
                <Input onKeyPress={handleKeyPress} className={errors?.quantite ? 'border border-red-500 my-1' : 'my-1'} onChange={onChange} onBlur={onBlur} value={value} />
              )}
            />
            {errors?.quantite && <div className="text-red-500 text-xs">{errors.quantite.message}</div>}
            <label htmlFor='remise'>Remise : </label><br />
            <Controller 
              control={control}
              name='remise'
              render={({
                field: { value, onBlur, onChange }
              }) => (
                <Input onKeyPress={handleKeyPress} className='my-1'  onChange={onChange} onBlur={onBlur} value={value} />
              )}
            />
            <div className='flex justify-center my-3'>
              <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
            </div>
          </form>
        <div className=''>
          <Button onClick={handleNext} type='primary' className='bg- bg-green-600' >Valider la transaction</Button>
        </div>
      </div>
    </div>
  )
}

export default AddDetailPage