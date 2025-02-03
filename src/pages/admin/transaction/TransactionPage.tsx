import React, { FunctionComponent, useEffect, useState } from 'react'
import { Button, DatePicker, Modal , message, Input } from 'antd'
import { Link } from 'react-router-dom';
import { EditOutlined, WarningOutlined, DeleteOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import TransactionSearch from './TransactionSearchPage';
import { deleteTransaction, getAllTransaction, getTransactionById, patchTransaction } from '../../../api/Transaction';
import { HttpStatus } from '../../../constants/Http_status';
import { getDetailById } from '../../../api/Detail';
import { DetailInTransaction } from '../../../interfaces/Detail.interface';
import { TransactionForDisplay, TransactionForEdit, TransactionItem } from '../../../interfaces/Transaction.interface';
import { errorMessage, successMessage } from '../../../utils/AntdMessage';

const TransactionPage: FunctionComponent = () => {
    let [transactions, setTransactions] = useState<TransactionForDisplay[]>([]);
    let [selectTransaction, setSelectTransaction] = useState<TransactionForDisplay[]>();
    let [details, setDetails] = useState<DetailInTransaction[]>([]);
    const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<TransactionForDisplay | null>(null);
    const [searchRef, setSearchRef] = useState('');
    const [editTransactionCredentials, SetEditTransactionCredentials] = useState<TransactionForEdit>({ date_transaction: '' })
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);  
    const [selectedItemEdit, setSelectedItemEdit] = useState<TransactionItem | null>(null);
    const [loading , setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(
      localStorage.getItem("token")
    )
    const [editedItem, setEditedItem] = useState<TransactionItem>({
      _id: '',
      date_transaction: '',
      nom_client: '',
      ref: '',
      montant_transaction: 0,
    });

    useEffect( () => {         
      fetchAllTransaction();
    } ,[])

    async function fetchAllTransaction() {
      const response = await getAllTransaction(token);
      if(response?.status === HttpStatus.OK) {
        setTransactions(response.data);
        setLoading(false);
      } else {
      errorMessage("Erreur sur la recuperation des transactions ! ")
      }
    }

  async function handleDeleteTransaction(itemId: string) {
    const response = await deleteTransaction(token, itemId);
    if(response?.status === HttpStatus.OK) {
      setTransactions(transactions.filter((item: any) => item._id !== itemId));
      successMessage('Suppression de la transaction réussie !')
    } else {
      errorMessage("Erreur sur la suppression de la transaction ! ")
    }
  }

  const showDeleteConfirmation = (item: TransactionForDisplay) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDeleteTransaction(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
  };

  const getDetail = async (itemId: string) => {
    const response  = await getTransactionById(token, itemId);
    if(response?.status === HttpStatus.OK) {
      setSelectTransaction(response.data);
    } else {
      errorMessage("Erreur sur la recuperation de la transaction ! ")
    }
    const res = await getDetailById(token, itemId);
    if(res?.status === HttpStatus.OK) {
      setDetails(res.data)
      setIsModalDetailOpen(true)
    } else {
      errorMessage("Erreur sur la recuperation des details de la transaction ! ")
    }
  }

  function EditTransaction(item: TransactionItem) {
    setSelectedItemEdit(item);
    setIsEditTransactionModalOpen(true);

    setEditedItem({
      _id: item._id,
      date_transaction: item.date_transaction,
      nom_client: item.nom_client,
      ref: item.ref,
      montant_transaction: item.montant_transaction,
     }); 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    if (editedItem) {
      if (selectedDate) {
        const response = await patchTransaction(token, editedItem._id, editTransactionCredentials);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
          setEditedItem({ _id: '', date_transaction: '' , nom_client: '', ref: '', montant_transaction: 0,});
          fetchAllTransaction();
        } else {
          errorMessage("Erreur sur la modification de la transaction ! ")
        }
      } else {
        errorMessage('Veuillez selectionner des dates !')
      }
    }
  }

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    if (date) {
      const isoDate = date.toISOString();
      SetEditTransactionCredentials({
        ...editTransactionCredentials,
        date_transaction: isoDate,
      });
    }
  };

  const handleKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which || e.keyCode;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }

  return (
    <div className='pb-5 pt-24 lg:px-32 sm:px-10 px-4'>
      <div className='transaction-body'>
        <TransactionSearch />
        <div className='my-4 font-bold text-2xl text-center font-lato'>
          TRANSACTIONS
        </div>
        <div  className='flex justify-between my-4'>
          <Link to='/admin/addforms'>
            <Button className='mt-1'><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden' > AJOUTER</div></Button>
          </Link>
          <Input className='my-1 ml-1 w-52' placeholder='Saisir la ref...' value={searchRef} onChange={(e) => setSearchRef(e.target.value)} onKeyPress={handleKeyPress} />
        </div>
        <div className='bg-transparent'>
          {
            loading ? (
              <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
              </div>
             ) : (
            // handling the ref 
            transactions.map((transaction: any, index) =>{
              if (searchRef && !transaction.ref.includes(searchRef)) {
                 return null;
              }
              return(
                <div key={index}>
                  <div className='w-full relative sm:pr-20 block sm:flex justify-between bg-six mt-1 sm:p-3 p-2'>
                    <div className='sm:w-11/12 w-full'>
                      <div className='sm:flex text-xs'>
                        <div className='flex'>
                          <div className=''> Date :</div>
                          <div className='sm:ml-2'>{ dayjs(transaction.date_transaction).format('DD-MM-YYYY HH:mm') } </div>
                        </div>
                        <div className='mx-1 sm:block hidden'> - </div>
                        <div className=''> Ref : { transaction.ref }</div>
                      </div>
                      <div className='flex'>
                        <div className='text-sm'> Nom du client : </div>
                        <div className='ml-2'> { transaction.nom_client }</div>
                      </div>
                      <div className='flex justify-between'>
                        <div className='text-sm'> Montant : </div>
                        <div className='ml-2'> { transaction.montant_transaction.toLocaleString('fr-FR') } <span className='text-xs'>MGA</span></div>
                      </div>
                    </div>
                    <div className='flex sm:flex-col sm:justify-center sm:pr-0 pr-8 sm:mt-0 mt-2 justify-end'>
                      <button className='sm:my-1 p-1 rounded bg-blue-400 hover:bg-blue-500 flex'   onClick={() => EditTransaction(transaction)} > <EditOutlined/></button>
                      <button className='p-1 sm:mx-0 mx-1 rounded bg-red-700 hover:bg-red-800 flex' onClick={ () => showDeleteConfirmation(transaction)}> <DeleteOutlined/> </button>
                    </div>
                    <div className='absolute sm:top-6 bottom-2 right-4'>
                      <button className='sm:my-3 p-1 sm:text-xs sm:rounded-none rounded bg-gray-200 hover:bg-gray-300 flex' onClick={() => getDetail(transaction._id)}><EyeOutlined/><div className='sm:block hidden ml-1'> Detail</div></button>
                    </div>
                  </div>
                </div>
              )
            })
             )
          }
          <Modal title="MODIFIER TRANSACTION" open={isEditTransactionModalOpen} onCancel={() => setIsEditTransactionModalOpen(false)} footer={null} >
            {selectedItemEdit && <div>
              <form className='w-2/3 my-7 mx-auto' onSubmit={handleSubmit}>
                <label htmlFor='nom_client' >Nom du client : </label> <br />
                <Input name='nom_client' value={selectedItemEdit.nom_client} readOnly />
                <label htmlFor='ref' >Ref de la transaction : </label> <br />
              <Input name='ref' value={selectedItemEdit.ref} readOnly />
                <label htmlFor='montant_transaction' >Montant de la transaction : </label> <br />
                <Input name='montant_transaction' value={selectedItemEdit.montant_transaction} readOnly />
                <label htmlFor='datetransaction' >Date : </label> <br />
                <DatePicker onChange={handleDateChange}  className="w-full" showTime format="YYYY-MM-DD HH:mm:ss" />
                <div className='flex justify-center my-3'>
                  <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>MODIFIER</button>
                </div>
              </form>
            </div>}
          </Modal>
          <Modal
            title="Confirmation de suppression"
            open={isDeleteModalVisible}
            onOk={handleDeleteConfirm}
            onCancel={() => setIsDeleteModalVisible(false)}
            okText="Confirmer"
            cancelText="Annuler"
            okButtonProps={{style: { background: 'red' }}}
          >
            <div className='text-red-900'>
              <WarningOutlined className='mr-2' />  
              Êtes-vous sûr de vouloir supprimer cette transaction ?
            </div>
          </Modal>
          {/* //Modal du detail transaction */}
          <Modal
            title="Detail de la transaction"
            open={isModalDetailOpen} onCancel={() => setIsModalDetailOpen(false)} footer={null} 
          >
            {selectTransaction &&
              <div> 
                {
                  selectTransaction.map((transaction: any, index) =>{
                    return(
                      <div key={index}>
                        <div className='w-full block sm:flex justify-between bg-six mt-1 p-3'>
                          <div className='w-full'>
                            <div className='flex text-xs'>
                              <div className=''> Date :</div>
                              <div className='ml-2'>{ dayjs(transaction.date_transaction).format('DD-MM-YYYY HH:mm') } </div>
                              <div className='mx-1'> - </div>
                              <div className=''> Ref : { transaction.ref }</div>
                            </div>
                            <div className='flex'>
                              <div className='text-sm'> Nom du client : </div>
                              <div className='ml-2'> { transaction.nom_client }</div>
                            </div>
                            <div className='flex justify-between'>
                              <div className='text-sm'> Montant : </div>
                              <div className='ml-2'> { transaction.montant_transaction.toLocaleString('fr-FR') } <span className='text-xs'>MGA</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }
            <div className='w-full bg-seven mb-1'>
              {
                details.map((detail: any , index) => {
                  return(
                    <div key={index}>
                      <div className='px-5 py-1 border-b-2 border-gray-200'>
                        <div className='flex text-xs'>
                          <div className=''> Produit :</div>
                          <div className='ml-2'> { detail.product }</div>
                        </div>
                        <div className='flex'>
                          <div className='text-sm'> Quantite: </div>
                          <div className='ml-2'> { detail.quantite }</div>
                        </div>
                        <div className='flex justify-between'>
                          <div className='text-sm'> Montant brut : </div>
                          <div className='ml-2'> { detail.montant_brut.toLocaleString('fr-FR') } <span className='text-xs'>MGA</span></div>
                        </div>
                        <div className='flex justify-between'>
                          <div className='text-sm'> Remise </div>
                          <div className='ml-2'> { detail.remise } % </div>
                        </div>
                        <div className='flex justify-between'>
                          <div className='text-sm'> Montant total : </div>
                          <div className='ml-2'> { detail.montant_total.toLocaleString('fr-FR') } <span className='text-xs'>MGA</span></div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Modal>     
        </div>
      </div>
    </div>
  )
}

export default TransactionPage