import { FunctionComponent } from 'react'
import { CreateClientInterface } from '../../../interfaces/Client.interface';
import { usePostClient } from '../../../hooks/usePostClient';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDark } from '../../../context/DarkThemeContext';
import { AddClientValidation } from '@/validation/create-client.validation';
import { handleNumberKeyPress } from '@/utils/keypress';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetAllClient } from '@/hooks/useGetAllClient';
import { LoadingOutlined } from '@ant-design/icons';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const AddClientPage: FunctionComponent<StepsPropsType> = ({handleNext}) => {
  const { refetch } = useGetAllClient();
  const { mutateAsync, isError, isPending } = usePostClient({
    action: () => {
      refetch()
    }
  });
  const { handleSubmit: submit, control, formState } = useForm<CreateClientInterface>({
    resolver: yupResolver(AddClientValidation)
  });
  const { errors } = formState;
  const { isDark } = useDark();

  const handleSubmit = async (data: CreateClientInterface) => {
    mutateAsync(data);
    if(!isError) {
      handleNext();
    }
  }
    
  return (
    <div className={`py-16  flex justify-center ${isDark && 'dark-container min-h-screen h-full'}`}>
      <div className='text-center'>
        <div className='text-2xl font-bold'>CLIENT</div>
        <form className='my-7 w-60 text-left' onSubmit={submit(handleSubmit)}>
          <Label htmlFor='nom_client' className='mb-1'>Nom : </Label>
          <Controller 
            name='nom_client'
            control={control}
            render={({
              field: { onChange, value, onBlur },
            }) => (
              <Input className={`my-1 ${errors.nom_client && 'my-1 border-red-500 text-red-500 rounded'}`} value={value} onChange={onChange} onBlur={onBlur} />
            )}
          />
          { errors?.nom_client && <div className='text-left text-red-500 text-xs'>{ errors.nom_client.message }</div> }
          <Label htmlFor='adresse_client' className='mt-4 mb-1'>Adresse : </Label>
          <Controller
            control={control}
            name='adresse_client'
            render={({
              field: { value, onChange, onBlur }
            }) => (
              <Input className={`my-1 ${errors.adresse_client && 'my-1 border-red-500 text-red-500 rounded'}`} value={value} onChange={onChange} onBlur={onBlur} />
            )}
            />
          { errors?.adresse_client && <div className='text-left text-red-500 text-xs'>{ errors.adresse_client.message }</div> }
          <Label htmlFor='mail_client' className='mt-4 mb-1'>Mail : </Label>
          <Controller 
            control={control}
            name='mail_client'
            render={({
              field: { value, onBlur, onChange }
            }) => (
              <Input className={`my-1 ${errors.mail_client && 'my-1 border-red-500 text-red-500 rounded'}`} value={value} onChange={onChange} onBeforeInput={onBlur} />
            )}
          />
          { errors?.mail_client && <div className='text-left text-red-500 text-xs'>{ errors.mail_client.message }</div> }
          <Label htmlFor='telephone_client' className='mt-4 mb-1'>Numero de telephone : </Label>
          <Controller 
            control={control}
            name='telephone_client'
            render={({
              field: { value, onChange, onBlur }
            }) => (
              <Input className={`my-1 ${errors.telephone_client && 'my-1 border-red-500 text-red-500 rounded'}`} value={value} onChange={onChange} onBlur={onBlur} onKeyPress={handleNumberKeyPress}  />
            )}
          />
          { errors?.telephone_client && <div className='text-left text-red-500 text-xs'>{ errors.telephone_client.message }</div> }
          <div className='flex justify-center my-3'>
            <Button
              variant={'success'}
              type='submit'
            >
              { isPending && <LoadingOutlined />}
              AJOUTER
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddClientPage;