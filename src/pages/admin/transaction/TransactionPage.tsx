import { FunctionComponent, lazy, Suspense, useState } from 'react'
import { Button, DatePicker, Modal , Input } from 'antd'
import { Link } from 'react-router-dom';
import { EditOutlined, WarningOutlined, DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { TransactionForDisplay, TransactionForEdit, TransactionItem } from '../../../interfaces/Transaction.interface';
import { useGetAllTransaction } from '../../../hooks/useGetAllTransaction';
import { useDeleteTransaction } from '../../../hooks/useDeleteTransaction';
import { useGetDetailByTransactionId } from '../../../hooks/useGetDetailByTransactionId';
import { useGetTransactionById } from '../../../hooks/useGetTransactionById';
import { usePatchTransaction } from '../../../hooks/usePatchTransaction';
import { Controller, useForm } from 'react-hook-form';
import { handleNumberKeyPress } from '../../../utils/keypress';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDark } from '../../../context/DarkThemeContext';
import { EditTrnsactionValidation } from '@/validation/edit-transaction.validation';
const TransactionSearch = lazy(() => import('./TransactionSearchPage'));

const TransactionPage: FunctionComponent = () => {
    const { control, handleSubmit: edit, formState, register , watch } = useForm<TransactionForEdit>({
      resolver: yupResolver(EditTrnsactionValidation)
    });
    const { errors } = formState;
    const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<TransactionForDisplay | null>(null);
    const [searchRef, setSearchRef] = useState('');
    const [editTransactionCredentials, setEditTransactionCredentials] = useState<TransactionForEdit>({ _id: '', date_transaction: '' })
    const [selectedItemEdit, setSelectedItemEdit] = useState<TransactionItem | null>(null);
  const { data: transactions, isLoading, refetch } = useGetAllTransaction();
  const { mutateAsync: deleteTransaction } = useDeleteTransaction({
    action: () => {
      refetch()
    }
  });
  const { data: details } = useGetDetailByTransactionId({id : watch('_id') || ''});
  const { mutateAsync: getTransactionById, data: selectTransaction } = useGetTransactionById();
  const { mutateAsync: patchTransaction } = usePatchTransaction({
    action: () => {
      refetch()
    }
  });
  const { isDark } = useDark();

  async function handleDeleteTransaction(itemId: string) {
    deleteTransaction(itemId);
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
    getTransactionById(itemId);
    // getDetailByTransactionById(itemId);
    setIsModalDetailOpen(true);
  }

  function EditTransaction(item: TransactionItem) {
    setSelectedItemEdit(item);
    setEditTransactionCredentials({
      ...editTransactionCredentials,
      _id: item._id,
    });
    setIsEditTransactionModalOpen(true);
  }

  const handleSubmitEdit = async (data: TransactionForEdit) => {
    patchTransaction(data)
    setIsEditTransactionModalOpen(false);
  }

  return (
    <div className={`pb-5 pt-24 lg:px-32 sm:px-10 px-4 ${isDark ? 'dark-container' : ''}`}>
      <div className='transaction-body'>
        <Suspense fallback={<div className='text-center my-10'>
            <LoadingOutlined className='text-5xl' />
          </div>}
        >
          <TransactionSearch />        
        </Suspense>
        <div className='my-4 font-bold text-2xl text-center font-lato'>
          TRANSACTIONS
        </div>
        <div  className='flex justify-between my-4'>
          <Link to='/admin/addforms'>
            <Button className='mt-1'><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden' > AJOUTER</div></Button>
          </Link>
          <Input className='my-1 ml-1 w-52' placeholder='Saisir la ref...' value={searchRef} onChange={(e) => setSearchRef(e.target.value)} onKeyPress={handleNumberKeyPress} />
        </div>
        <div className='bg-transparent'>
          {
            isLoading ? (
              <div className='text-center my-10'>
                  <LoadingOutlined className='text-3xl' />
                  <div>Chargement...</div>
              </div>
             ) : (
            // handling the ref 
            transactions && transactions.map((transaction: any) =>{
              if (searchRef && !transaction.ref.includes(searchRef)) {
                 return null;
              }
              return(
                <div key={transaction._id}>
                  <div className={`w-full relative sm:pr-4 block sm:flex justify-between mt-1 sm:p-3 p-2 cursor-pointer hover:scale-[1.01] transition-all ${isDark ? 'bg-gray-600' : 'bg-six'}`} >
                    <div className='sm:w-11/12 w-full'  onClick={() => getDetail(transaction._id)}>
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
                    <div className='flex sm:flex-col sm:justify-center sm:pr-0 sm:mt-0 mt-2 justify-end'>
                      <button className='sm:my-1 p-1 rounded bg-blue-400 hover:bg-blue-500 flex'   onClick={() => EditTransaction(transaction)} > <EditOutlined/></button>
                      <button className='p-1 sm:mx-0 mx-1 rounded bg-red-700 hover:bg-red-800 flex' onClick={ () => showDeleteConfirmation(transaction)}> <DeleteOutlined/> </button>
                    </div>
                  </div>
                </div>
              )
            })
             )
          }
          <Modal title="MODIFIER TRANSACTION" open={isEditTransactionModalOpen} onCancel={() => setIsEditTransactionModalOpen(false)} footer={null} >
            {selectedItemEdit && <div>
              <form className='w-2/3 my-7 mx-auto' onSubmit={edit(handleSubmitEdit)}>
                <input defaultValue={selectedItemEdit._id} className='hidden' {...register('_id')} />
                <label htmlFor='nom_client' >Nom du client : </label> <br />
                <Input name='nom_client' value={selectedItemEdit.nom_client} readOnly />
                <label htmlFor='ref' >Ref de la transaction : </label> <br />
                <Input name='ref' value={selectedItemEdit.ref} readOnly />
                <label htmlFor='montant_transaction' >Montant de la transaction : </label> <br />
                <Input name='montant_transaction' value={selectedItemEdit.montant_transaction} readOnly />
                <label htmlFor='datetransaction' >Date : </label> <br />
                <Controller 
                  control={control}
                  name='date_transaction'
                  defaultValue={selectedItemEdit.date_transaction.toString()}
                  render={({
                    field: { value, onChange, onBlur }
                  }) => (
                    <DatePicker onChange={(date) => onChange(date ? date.toISOString() : null)} value={value ? dayjs(value) : null} onBlur={onBlur} className={errors.date_transaction ? "w-full border border-red-500 rounded text-red-500" : "w-full"} showTime format="YYYY-MM-DD HH:mm:ss" />
                  )}
                />
                {errors.date_transaction && <div className='text-red-500 text-xs text-left'>{ errors.date_transaction.message }</div>}
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
                  selectTransaction && selectTransaction.map((transaction: any) =>{
                    return(
                      <div key={transaction._id}>
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
                details && details.map((detail: any) => {
                  return(
                    <div key={detail._id}>
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