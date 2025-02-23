import { Select, DatePicker  } from 'antd'
import React, { FunctionComponent, useState, useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import { getAllClient } from '../../../api/Client';
import { HttpStatus } from '../../../constants/Http_status';
import { CreateTransactionInterface } from '../../../interfaces/Transaction.interface';
import { ClientForTransaction } from '../../../interfaces/Client.interface';
import { errorMessage } from '../../../utils/AntdMessage';
import { usePostTransaction } from '../../../hooks/usePostTransaction';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const { Option } = Select;

const AddTransanctionPage: FunctionComponent<StepsPropsType> = ({handlePrev , handleNext}) => {
  let [clients, setClients] = useState<ClientForTransaction[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [transactionCredentials, setTransactionCredentials] = useState<CreateTransactionInterface>({ client: '', date_transaction: '' })
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const { mutateAsync, isError } = usePostTransaction();

  useEffect(() => {
    fetchAllClient();
  }, []);

  async function fetchAllClient() {
    const response = await getAllClient(token);
    if(response?.status === HttpStatus.OK) {
      setClients(response.data);
    } else {
      errorMessage("Erreur sur la recuperation des clients ! ")
    }
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    if (date) {
      const isoDate = date.toISOString();
      setTransactionCredentials({
        ...transactionCredentials,
        date_transaction: isoDate,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedClientId && selectedDate) {
      mutateAsync(transactionCredentials);
      if(!isError) {
        handleNext();
      }
    } else {
      errorMessage('Veuillez remplir les champs !')
    }
  }
  
  const handleSelectChange = (value: any) => {
    setSelectedClientId(value);
    setTransactionCredentials({
      ...transactionCredentials,
      client: value,
    });
  };

  return (
        <div className='py-16 flex justify-center'>
          <button onClick={handlePrev}
            className='fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <ArrowLeftOutlined /> Retour 
          </button>
            <div className='text-center'>
                <div className='text-2xl font-bold'>TRANSACTION</div>
                <form className='w-60 mx-auto my-7 text-left' onSubmit={handleSubmit}> 
                    <label htmlFor='idproduit'>Client : </label><br />
                    <Select
                      value={selectedClientId}
                      onChange={handleSelectChange}
                      className='w-full my-1'
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input: any, option: any) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                        <Option value="">Sélectionnez un client</Option>
                        {
                          clients.map((cl: any, index) => {
                            return(
                            <Option key={index} value={cl._id}>
                              { `${cl.nom_client} ${cl.telephone_client}` }
                            </Option>
                            )
                          })
                        }
                    </Select>
                    {selectedClientId && <p>Client sélectionné : {selectedClientId}</p>}
                    <br />     
                    <label htmlFor='date_transaction'>Date du transaction : </label><br />
                    <DatePicker onChange={handleDateChange} className="w-full" showTime format="YYYY-MM-DD HH:mm:ss" />
                    <div className='flex justify-center my-3'>
                        <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500' type='submit'>AJOUTER</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default AddTransanctionPage