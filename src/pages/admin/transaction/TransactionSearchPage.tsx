import React, { FunctionComponent, useEffect, useState } from 'react'
import { DatePicker, Modal , message, Input } from 'antd'
import { SearchOutlined, EditOutlined, WarningOutlined, DeleteOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { deleteTransaction, getTransactionById, patchTransaction, searchTransactionBetweenDates } from '../../../api/Transaction';
import { HttpStatus } from '../../../constants/Http_status';
import { getDetailById } from '../../../api/Detail';
import { DetailInTransaction } from '../../../interfaces/Detail.interface';
import { TransactionForDisplay, TransactionForEdit, TransactionItem, TransactionSearch } from '../../../interfaces/Transaction.interface';
import { errorMessage, successMessage } from '../../../utils/AntdMessage';

const TransactionSearchPage: FunctionComponent = () => {
    let [transactions, setTransactions] = useState<TransactionForDisplay[]>([]);
    let [selectTransaction, setSelectTransaction] = useState<TransactionForDisplay[] | null>();
    let [searchTransaction, setSearchTransaction] = useState<TransactionForDisplay[] | null>();
    let [details, setDetails] = useState<DetailInTransaction[]>([]);
    const [selectedDateDebut, setSelectedDateDebut] = useState<dayjs.Dayjs | null>(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState<dayjs.Dayjs | null>(null);
    const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<TransactionForDisplay | null>(null);
    const [editTransactionCredentials, setEditTransactionCredentials] = useState<TransactionForEdit>({ date_transaction: '' })
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);  
    const [selectedItemEdit, setSelectedItemEdit] = useState<TransactionItem | null>(null);
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

  const handleDateDebutChange = (date: any) => {
    setSelectedDateDebut(date);
  };
  //handle date end change
  const handleDateEndChange = (date: any) => {
    setSelectedDateEnd(date);
  };
  //handle delete transaction confirmation
  async function handleDeleteTransaction(itemId: string) {
    const response = await deleteTransaction(token, itemId);
    if(response?.status === HttpStatus.OK) {
      setTransactions(transactions.filter((item: any) => item._id !== itemId));
      successMessage('Suppression de la transaction réussie !')
    } else {
      errorMessage("Erreur sur la suppression de la transaction ! ")
    }
  }
  //show delete transaction
  const showDeleteConfirmation = (item: TransactionForDisplay) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  //show modal of detail
  const showDetail = () => {
    setIsModalDetailOpen(true);
  };

  //handle delete confirm
  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDeleteTransaction(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
  };
  //handle delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  //handling the search
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchTransaction(null);

    if(selectedDateDebut && selectedDateEnd){
      const data : TransactionSearch = { start: selectedDateDebut.toISOString(), end: selectedDateEnd.toISOString() } 
      const response = await searchTransactionBetweenDates(token, data);
      if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
        setSearchTransaction(response.data);
      } else {
        errorMessage("Erreur sur la recherche des transactions ! ")
      }
    }else{
      errorMessage('Veuillez selectionner des dates !');
    }
  }

  const handleCloseModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  //get detail function
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
      showDetail()
    } else {
      errorMessage("Erreur sur la recuperation des details de la transaction ! ")
    }
  }

  //edit trasanction item
  function EditTransaction(item: TransactionItem) {
    setSelectedItemEdit(item);
    setIsEditTransactionModalOpen(true)

    setEditedItem({
      _id: item._id,
      date_transaction: item.date_transaction,
      nom_client: item.nom_client,
      ref: item.ref,
      montant_transaction: item.montant_transaction,
     }); 
  }
  //handling edit submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedItem) {
      if (selectedDate) {
        const response = await patchTransaction(token, editedItem._id, editTransactionCredentials);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
          setEditedItem({ _id: '', date_transaction: '' , nom_client: '', ref: '', montant_transaction: 0,});
        } else {
          errorMessage("Erreur sur la modification de la transaction ! ")
        }
      } else {
        errorMessage('Veuillez selectionner des dates !')
      }
    }
  }
  //handling the edit date change
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    if (date) {
      const isoDate = date.toISOString();
      setEditTransactionCredentials({
        ...editTransactionCredentials,
        date_transaction: isoDate,
      });
    }
  };

  return (
    <div>
      <div className='py-1 text-right'>
        <form onSubmit={handleSearch}>
          <DatePicker onChange={handleDateDebutChange}  showTime format="YYYY-MM-DD HH:mm:ss" name='datedebut'  className='sm:w-max w-1/3' />
          <span className='px-1'>-</span>
          <DatePicker onChange={handleDateEndChange}  showTime format="YYYY-MM-DD HH:mm:ss" name='dateend'  className='sm:w-max w-1/3'  />
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:ml-3 ml-1'><div className='flex'> <SearchOutlined /> <div className='sm:block hidden mx-2'>Rechercher</div> </div></button>
        </form>
      </div>
      {/* if there are a serach transction */}
      {searchTransaction && (
        <div>
          <div className='text-xl font-lato'>RESULTATS RECHERCHE</div>
            {
              searchTransaction.length < 1 ? (
                <div className='text-center my-10'>
                  <CloseOutlined className='text-3xl' />
                  <div>AUCUN RESULAT</div>
                </div>
              )
              : (
              searchTransaction.map((searchtransaction: any, index) =>{
                return(
                  <div key={index}>
                  <div className='w-full relative sm:pr-4 z-10 block sm:flex justify-between bg-six mt-1 sm:p-3 p-2 cursor-pointer hover:scale-[1.01] transition-all' onClick={() => getDetail(searchtransaction._id)}>
                    <div className='sm:w-11/12 w-full'>
                      <div className='sm:flex text-xs'>
                        <div className='flex'>
                          <div className=''> Date :</div>
                          <div className='sm:ml-2'>{ dayjs(searchtransaction.date_transaction).format('DD-MM-YYYY HH:mm') } </div>
                        </div>
                        <div className='mx-1 sm:block hidden'> - </div>
                        <div className=''> Ref : { searchtransaction.ref }</div>
                      </div>
                      <div className='flex'>
                        <div className='text-sm'> Nom du client : </div>
                        <div className='ml-2'> { searchtransaction.nom_client }</div>
                      </div>
                      <div className='flex justify-between'>
                        <div className='text-sm'> Montant : </div>
                        <div className='ml-2'> { searchtransaction.montant_transaction.toLocaleString('fr-FR') } <span className='text-xs'>MGA</span></div>
                      </div>
                    </div>
                    <div className='flex sm:flex-col sm:justify-center sm:pr-0 pr-8 sm:mt-0 mt-2 justify-end z-50'>
                      <button className='sm:my-1 p-1 rounded bg-blue-400 hover:bg-blue-500 flex'   onClick={() => {setIsModalDetailOpen(false); EditTransaction(searchtransaction)}} > <EditOutlined/></button>
                      <button className='p-1 sm:mx-0 mx-1 rounded bg-red-700 hover:bg-red-800 flex' onClick={ () => {setIsModalDetailOpen(false); showDeleteConfirmation(searchtransaction)}}> <DeleteOutlined/> </button>
                    </div>
                  </div>
                </div>
                )
              })
              )
            }
            <div className='text-xs text-center my-2'>-------- Fin du recherche  ---------</div>
          </div>
        )} 
        <Modal title="MODIFIER TRANSACTION" open={isEditTransactionModalOpen} onCancel={() => setIsEditTransactionModalOpen(false)} footer={null} >
          {selectedItemEdit && <div>
            <form className='w-2/3 my-7 mx-auto' onSubmit={handleSubmit}>
              <label htmlFor='nom_client' >Nom du client : </label> <br />
              <Input name='nom_client' value={selectedItemEdit.nom_client} readOnly />
              <label htmlFor='ref' >Ref de la transaction : </label> <br />
              <Input name='ref' value={selectedItemEdit.ref} readOnly />
              <label htmlFor='montant_transaction' >Montant de la transaction : </label> <br />
              <Input name='montant_transaction' value={selectedItemEdit.montant_transaction} readOnly />
              <label htmlFor='date_transaction' >Date : </label> <br />
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
          onCancel={handleDeleteCancel}
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
          open={isModalDetailOpen} onCancel={handleCloseModalDetail} footer={null} 
        >
          {selectTransaction &&
            <div> 
              {
                selectTransaction.map((transaction: any, index) =>{
                  return(
                    <div key={index}>
                      <div className='w-full block sm:flex justify-between bg-six mt-1 sm:p-3 p-2'>
                        <div className='w-full'>
                          <div className='flex text-xs'>
                            <div className=''> Date :</div>
                            <div className='sm:ml-2'>{ dayjs(transaction.date_transaction).format('DD-MM-YYYY HH:mm') } </div>
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
                    <div className='sm:px-5 px-2 py-1 border-b-2 border-gray-200'>
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
  )
}

export default TransactionSearchPage