import { message, Select  } from 'antd'
import React, { FunctionComponent, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { getAllTransaction } from '../../../api/Transaction';
import { HttpStatus } from '../../../constants/Http_status';
import { getMailer } from '../../../api/Mailer';

interface Trans {
  _id: string;
  date_transaction: string;
  nom_client: string;
}

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const { Option } = Select;

const AddMailPage: FunctionComponent<StepsPropsType> = ({handlePrev}) => {
  let [trans, setTrans] = useState<Trans[]>([]);
  const [selectedTransId, setSelectedTransId] = useState('');
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  //fetching all transaction item
  useEffect(() => {

    fetchAllTransaction();
  })

  async function fetchAllTransaction() {
    const response = await getAllTransaction(token);
    if(response?.status === HttpStatus.OK) {
      setTrans(response.data);
    } else {
      console.log("Error")
    }
  }

  //form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedTransId) { 
      const response = await getMailer(token, selectedTransId);
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
  
  //message 
  const errorMessage = () => {
    message.error('Veuillez remplir les champs !');
  };

  const errorMail = (mess: string) => {
    message.error(mess);
  };
  
  const successMessage = (mess: string) => {
    message.success(mess);
  };
  //handling the select transaction change
  const handleSelectTransChange = (value: any) => {
    setSelectedTransId(value);
  };

  return (
    <div className='py-16 '>
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
              value={selectedTransId}
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
                trans.map((tr: any, index) => {
                  return(
                    <Option key={index} value={tr._id}>
                      { `${tr.nom_client} ${dayjs(tr.date_transaction).format('DD-MM-YYYY HH:mm')}` }
                    </Option>
                  )
                })
              }
            </Select>
            {selectedTransId && <p>Transaction sélectionné : {selectedTransId}</p>}  

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