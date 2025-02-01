import { Button } from 'antd';
import dayjs from 'dayjs';
import { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from '../../components/Typewritter';
import { LoadingOutlined } from '@ant-design/icons';
import { getLatestTransaction } from '../../api/Transaction';
import { HttpStatus } from '../../constants/Http_status';

interface Trans {
    date_transaction: string;
    nom_client: string;
    montant_transaction: string;
}

const HomePage: FunctionComponent= () => {
    let [transaction, setTransaction] = useState<Trans[]>([]);
    const [loading , setLoading] = useState(true);
    const [token, setToken] = useState<string |null>(
        localStorage.getItem("token")
    )
   
    useEffect(() => {
        fetchLatestTransaction();
    }, [])

     async function fetchLatestTransaction() {
        const response = await getLatestTransaction(token);
        if(response?.status === HttpStatus.OK) {
          setTransaction(response.data);
          setLoading(false);
        } else {
          console.log("Error")
        }
    }
    
    const text = 'BIENVENUE SUR NOTRE PLATEFORME DE GESTION DE CAISSE';

  return (
    <div className='lg:px-32 sm:px-10 px-4 pb-5 pt-24 sm:h-screen h-full'>
        <div className='block sm:justify-between sm:flex h-full'>
            <div className='flex flex-col sm:py-0 py-32 justify-center w-full sm:w-1/2'>
                <div className='sm:text-3xl text-2xl  font-bold font-lato'>
                    <Typewriter text={text} />
                </div>
                <div className='my-4 flex justify-center'>
                    <Link to='/addforms'>
                        <Button>AJOUTER TRANSACTION</Button>
                    </Link>
                </div>
            </div>
            <div className='bg-gray-300 h-max'>
                <div className='px-4 py-4 bg-gray-900 text-white font-bold font-lato'>
                    DERNIERS TRANSACTIONS
                </div>
                <div className='px-2 py-2'>
                    {
                        loading ? (
                            <div className='text-center my-10'>
                                <LoadingOutlined className='text-3xl' />
                                <div>Chargement...</div>
                            </div>
                        ) : (
                        transaction.map((transaction: any, index) => {
                            return(
                                <div key={index} className='bg-gray-100 my-1 px-2 py-1'>
                                    <div className='text-black text-xs'>{ dayjs(transaction.date_transaction).format('DD-MM-YYYY HH:mm') }</div>
                                    <div className='text-xs'> Ref : { transaction.ref }</div>
                                    <div className='font-bold font-sans'>{ transaction.nom_client }</div>
                                    <div className='text-right'>{ transaction.montant_transaction.toLocaleString('fr-FR') }<span className='text-xs ml-1'>MGA</span></div>
                                </div>
                            )
                        })
                        )
                    }                       
                </div>
                <div className='px-2 py-2 bg-gray-600 text-right'>
                    <Link to='/transaction'>
                        <Button type='primary' className='text-xs bg-blue-400'>Voir tout les transactions</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage