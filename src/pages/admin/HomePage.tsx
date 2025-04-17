import { Button } from 'antd';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from '../../components/Typewritter';
import { LoadingOutlined } from '@ant-design/icons';
import { useGetLastTransation } from '../../hooks/useGetLastTransaction';
import { useDark } from '../../context/DarkThemeContext';

const HomePage: FunctionComponent= () => {
    const { data: transactions, isError, isLoading } = useGetLastTransation();
    const { isDark } = useDark();
    
    const text = 'BIENVENUE SUR NOTRE PLATEFORME DE GESTION DE CAISSE';

  return (
    <div className={isDark ? 'dark-container lg:px-32 sm:px-10 px-4 pb-5 pt-24 sm:h-screen h-full' : 'lg:px-32 sm:px-10 px-4 pb-5 pt-24 sm:h-screen h-full'}>
        <div className='block sm:justify-between sm:flex h-full'>
            <div className='flex flex-col sm:py-0 py-32 justify-center w-full sm:w-1/2'>
                <div className='sm:text-3xl text-2xl  font-bold font-lato'>
                    <Typewriter text={text} />
                </div>
                <div className='my-4 flex justify-center'>
                    <Link to='/admin/addforms'>
                        <Button>AJOUTER TRANSACTION</Button>
                    </Link>
                </div>
            </div>
            <div className={isDark ? 'bg-gray-600 h-max' : 'bg-gray-300 h-max'}>
                <div className='px-4 py-4 bg-gray-900 text-white font-bold font-lato'>
                    DERNIERES TRANSACTIONS
                </div>
                <div className='px-2 py-2'>
                    <div>
                        {isLoading && (
                            <div className='text-center my-10'>
                                <LoadingOutlined className='text-3xl' />
                                <div>Chargement...</div>
                            </div>
                        )}
                    </div>
                    <div>
                        {isError && (
                            <div className='text-center my-10 w-full'>
                                <div>Un erreur est survenu lors de la récuperation des transactions</div>
                            </div>
                        )}
                    </div>
                    {
                        transactions?.map((transaction: any) => {
                            return(
                                <div className={isDark ? 'my-1 px-2 py-1 dark-container' : 'bg-gray-100 my-1 px-2 py-1 text-black'}>
                                    <div className=' text-xs'>{ dayjs(transaction.date_transaction).format('DD-MM-YYYY HH:mm') }</div>
                                    <div className='text-xs'> Ref : { transaction.ref }</div>
                                    <div className='font-bold font-sans'>{ transaction.nom_client }</div>
                                    <div className='text-right'>{ transaction.montant_transaction.toLocaleString('fr-FR') }<span className='text-xs ml-1'>MGA</span></div>
                                </div>
                            )
                        })
                    }                       
                </div>
                <div className='px-2 py-2 bg-gray-600 text-right'>
                    <Link to='/admin/page/transaction'>
                        <Button type='primary' className='text-xs bg-blue-400'>Voir tout les transactions</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage