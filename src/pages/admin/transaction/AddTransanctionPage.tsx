import { Select, DatePicker  } from 'antd'
import { FunctionComponent } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import { CreateTransactionInterface } from '../../../interfaces/Transaction.interface';
import { usePostTransaction } from '../../../hooks/usePostTransaction';
import { useGetAllClient } from '../../../hooks/useGetAllClient';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const transactionSchema = yup.object({
  client: yup.string().required("Veuillez selectionner un client !"),
  date_transaction: yup.date().required("Veuillez entrer la date de la transaction ! ")
})

const { Option } = Select;

const AddTransanctionPage: FunctionComponent<StepsPropsType> = ({handlePrev , handleNext}) => {
  const { control, formState, handleSubmit: submit } = useForm<CreateTransactionInterface>({
    resolver: yupResolver(transactionSchema)
  });
  const { errors } = formState;
  const { mutateAsync, isError } = usePostTransaction();
  const { data: clients } = useGetAllClient();

  const handleSubmit = async (data: CreateTransactionInterface) => {
      mutateAsync(data);
      if(!isError) {
        handleNext();
      }
  }

  return (
        <div className='py-16 flex justify-center'>
          <button onClick={handlePrev}
            className='fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <ArrowLeftOutlined /> Retour 
          </button>
            <div className='text-center'>
                <div className='text-2xl font-bold'>TRANSACTION</div>
                <form className='w-60 mx-auto my-7 text-left' onSubmit={submit(handleSubmit)}> 
                    <label htmlFor='idproduit'>Client : </label><br />
                    <Controller 
                      control={control}
                      name='client'
                      render={({
                        field: { value, onBlur, onChange }
                      }) => (
                        <Select
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        defaultValue={"Sélectionnez un client"}
                        className={errors?.client ? 'w-full my-1 text-red-500 border border-red-500 rounded' : 'w-full my-1'}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input: any, option: any) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                          <Option value="">Sélectionnez un client</Option>
                          {
                            clients && clients.map((cl: any) => {
                              return(
                              <Option key={cl._id} value={cl._id}>
                                { `${cl.nom_client} ${cl.telephone_client}` }
                              </Option>
                              )
                            })
                          }
                      </Select>  
                      )}
                    />
                    {errors.client && <div className='text-xs text-red-500 text-left'>{ errors.client.message }</div>  }  
                    <label htmlFor='date_transaction'>Date du transaction : </label><br />
                    <Controller
                      control={control}
                      name='date_transaction'
                      render={({
                        field: { value, onBlur, onChange }
                      }) => (
                        <DatePicker onChange={(date) => onChange(date ? date.toISOString() : null)} value={value ? dayjs(value) : null} onBlur={onBlur} className={errors?.date_transaction ? 'w-full text-red-500 border border-red-500 rounded' : 'w-full'} showTime format="YYYY-MM-DD HH:mm:ss" />
                      )}
                    />
                    {errors?.date_transaction && <div className='text-xs text-red-500 text-left'>{ errors?.date_transaction.message?.toString() }</div>  }  
                    <div className='flex justify-center my-3'>
                        <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' type='submit'>AJOUTER</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default AddTransanctionPage