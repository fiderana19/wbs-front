import { Select, DatePicker, message  } from 'antd'
import React, { FunctionComponent, useState, useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import axios from 'axios';
import dayjs from 'dayjs';
import { getAllClient } from '../../../api/Client';
import { HttpStatus } from '../../../constants/Http_status';
import { postTransaction } from '../../../api/Transaction';

interface FormData {
  client: string;
  date_transaction: string;
}

interface Client {
  _id: string;
  mail_client: string;
}

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const { Option } = Select;

const AddTransanctionPage: FunctionComponent<StepsPropsType> = ({handlePrev , handleNext}) => {
  let [client, setClient] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [formData, setFormData] = useState<FormData>({ client: '', date_transaction: '' })
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  //fethcing all client item
  useEffect(() => {
    fetchAllClient();
  }, []);

  async function fetchAllClient() {
    const response = await getAllClient(token);
    if(response?.status === HttpStatus.OK) {
      setClient(response.data);
    } else {
      console.log("Error")
    }
  }
  //handling the date change
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    if (date) {
      const isoDate = date.toISOString();
      setFormData({
        ...formData,
        date_transaction: isoDate,
      });
    }
  };
  //handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedClientId && selectedDate) {
      const response = await postTransaction(token, formData);
      if(response?.status === HttpStatus.CREATED) {
        successMessage()
        handleNext()
      } else {
        console.log("Error")
      }
    } else {
      errorMessage()
    }
  }
  //message
  const errorMessage = () => {
    message.error('Veuillez remplir les champs !');
  };
  
  const successMessage = () => {
    message.success('Transaction ajoutée avec succés !');
  };
  //handle select change
  const handleSelectChange = (value: any) => {
    setSelectedClientId(value);
    setFormData({
      ...formData,
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
                          client.map((cl: any, index) => {
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