import { Select, DatePicker  } from 'antd'
import { FunctionComponent } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import { CreateTransactionInterface } from '../../../interfaces/Transaction.interface';
import { usePostTransaction } from '../../../hooks/usePostTransaction';
import { useGetAllClient } from '../../../hooks/useGetAllClient';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDark } from '../../../context/DarkThemeContext';
import { AddTransactionValidation } from '@/validation/create-transaction.validation';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useGetAllTransaction } from '@/hooks/useGetAllTransaction';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const { Option } = Select;

const AddTransanctionPage: FunctionComponent<StepsPropsType> = ({handlePrev , handleNext}) => {
  const { control, formState, handleSubmit: submit } = useForm<CreateTransactionInterface>({
    resolver: yupResolver(AddTransactionValidation)
  });
  const { errors } = formState;
  const { refetch } = useGetAllTransaction();
  const { mutateAsync, isError } = usePostTransaction({
    action: () => {
      refetch();
    }
  });
  const { data: clients } = useGetAllClient();
  const { isDark } = useDark();

  const handleSubmit = async (data: CreateTransactionInterface) => {
      mutateAsync(data);
      if(!isError) {
        handleNext();
      }
  }

  return (
        <div className={`py-16 flex justify-center ${isDark ? 'dark-container min-h-screen h-full' : ''}`}>
          <button onClick={handlePrev}
            className='fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <ArrowLeftOutlined /> Retour 
          </button>
            <div className='text-center'>
                <div className='text-2xl font-bold'>TRANSACTION</div>
                <form className='w-60 mx-auto my-7 text-left' onSubmit={submit(handleSubmit)}> 
                    <Label htmlFor='idproduit' className='mt-2 mb-1'>Client : </Label>
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
                        className={`w-full ${errors?.client && ' text-red-500 border border-red-500 rounded'}`}
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
                    <Label htmlFor='date_transaction' className='mt-2 mb-1'>Date du transaction : </Label>
                    <Controller
                      control={control}
                      name='date_transaction'
                      render={({
                        field: { value, onBlur, onChange }
                      }) => (
                        <DatePicker onChange={(date) => onChange(date ? date.toISOString() : null)} value={value ? dayjs(value) : null} onBlur={onBlur} className={`w-full ${errors?.date_transaction && ' text-red-500 border border-red-500 rounded'}`} showTime format="YYYY-MM-DD HH:mm:ss" />
                      )}
                    />
                    {errors?.date_transaction && <div className='text-xs text-red-500 text-left'>{ errors?.date_transaction.message?.toString() }</div>  }  
                    <div className='flex justify-center my-3'>
                        <Button 
                          variant={'success'}
                          type='submit'
                        >AJOUTER</Button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default AddTransanctionPage