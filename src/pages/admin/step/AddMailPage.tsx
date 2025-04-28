import { message, Select  } from 'antd'
import React, { FunctionComponent, useState } from 'react'
import dayjs from 'dayjs';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { HttpStatus } from '../../../constants/Http_status';
import { getMailer } from '../../../api/Mailer';
import { useGetAllTransaction } from '../../../hooks/useGetAllTransaction';
import { useDark } from '../../../context/DarkThemeContext';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const { Option } = Select;

const AddMailPage: FunctionComponent<StepsPropsType> = ({handlePrev}) => {
  const [selectedTransactionId, setSelectedTransactionId] = useState('');
  const { isDark } = useDark();
  const { data: transactions } = useGetAllTransaction();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTransactionId) { 
      const response = await getMailer(selectedTransactionId);
      if(response?.status === HttpStatus.OK) {
        successMessage(response.data.message);
      }
      else if(response?.status === HttpStatus.BAD_REQUEST) {
        errorMail("Erreur sur l'envoie du mail");
      } else {
        console.log("Error")
      }
    } else {
      errorMessage()
    }
  }
  
  const errorMessage = () => {
    message.error('Veuillez remplir les champs !');
  };

  const errorMail = (mess: string) => {
    message.error(mess);
  };
  
  const successMessage = (mess: string) => {
    message.success(mess);
  };

  const handleSelectTransChange = (value: any) => {
    setSelectedTransactionId(value);
  };

  return (
    <div className={isDark ? 'dark-container py-16 min-h-screen h-full' : 'py-16 '}>
      <button onClick={handlePrev}
        className='fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <ArrowLeftOutlined /> Retour 
      </button>
      <div className='text-center flex justify-center'>
        <div>
          <div className='text-2xl font-bold'>ENVOYER FACTURE PAR MAIL</div>
          <form onSubmit={handleSubmit} className='my-7 w-60 text-left mx-auto'>
            <label htmlFor='idproduit'>Transaction : </label><br />
            <Select
              value={selectedTransactionId}
              onChange={handleSelectTransChange}
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
                      { `${tr.nom_client} ${dayjs(tr.date_transaction).format('DD-MM-YYYY HH:mm')}` }
                    </Option>
                  )
                })
              }
            </Select>
            {selectedTransactionId && <p>Transaction sélectionné : {selectedTransactionId}</p>}  

            <div className='flex justify-center my-3'>
              <button type='submit'  className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-green-500'><MailOutlined /> Envoyer mail</button>
            </div>
          </form>
        </div>
      </div>
      <div className='my-10 mx-4 md:mx-auto md:w-1/2'></div>
    </div>
  )
}

export default AddMailPage