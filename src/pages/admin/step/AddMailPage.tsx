import { message, Select  } from 'antd'
import React, { FunctionComponent, useEffect, useState } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons'

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
  const [mailResponse , setMailResponse] = useState('');

  //fetching all transaction item
  useEffect(() => {
    async function fetchTrans() {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://localhost:3001/transaction/',
        }); 
        setTrans(response.data);
      } catch (error) {
        console.error('AddMail : Erreur lors de la récupération des transactions :', error);
      }
    }
    fetchTrans();

    return () => {

    };
  })

  //form submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    async function sendMail() {
      try {
        await axios({
          method: 'get',
          url: `http://localhost:3001/mailer/${selectedTransId}`,
        })
        .then((rep) => {
          successMessage(rep.data.message);
          console.log(rep.data.message)
        }
        );
      } catch (error: any) {
        if (error.response?.status === 400 ) {
          errorMail("Erreur sur l'envoie du mail")
        } else  {
          console.error("AddMail : Erreur lors de l'envoie du mail :", error);
        } 
      }
    } 

    if (selectedTransId) { 
      sendMail()
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