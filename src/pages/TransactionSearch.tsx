import React, { FunctionComponent, useEffect, useState } from 'react'
import { DatePicker, Modal , message, Input } from 'antd'
import { SearchOutlined, EditOutlined, WarningOutlined, DeleteOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

interface Detail {
    _id: string;
    product: string;
    quantite: number;
    montant_brut: number;
    remise: number;
    montant_total: number;
}
interface Trans {
    _id: string;
    ref: string;
    date_transaction: string;
    nom_client: string;
    montant_transaction: string;
}

interface Search {
  start: string;
  end: string;
}
interface Item {
  _id: string;
  date_transaction: string;
  nom_client: string;
  ref: string;
  montant_transaction: number;
}
interface FormData {
  date_transaction: string;
}


const TransactionSearch: FunctionComponent = () => {
    let [transaction, setTransaction] = useState<Trans[]>([]);
    let [selectTransaction, setSelectTransaction] = useState<Trans[] | null>();
    let [searchTransaction, setSearchTransaction] = useState<Trans[] | null>();
    let [detail, setDetail] = useState<Detail[]>([]);
    const [selectedDateDebut, setSelectedDateDebut] = useState<dayjs.Dayjs | null>(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState<dayjs.Dayjs | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Trans | null>(null);
    const [formData, setFormData] = useState<FormData>({ date_transaction: '' })
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);  
    const [selectedItemEdit, setSelectedItemEdit] = useState<Item | null>(null);
    const [editedItem, setEditedItem] = useState<Item>({
      _id: '',
      date_transaction: '',
      nom_client: '',
      ref: '',
      montant_transaction: 0,
    });

    useEffect( () => {         
            
    } ,[])
  //handle date debut change
  const handleDateDebutChange = (date: dayjs.Dayjs | null, dateString: string) => {
    setSelectedDateDebut(date);
  };
  //handle date end change
  const handleDateEndChange = (date: dayjs.Dayjs | null, dateString: string) => {
    setSelectedDateEnd(date);
  };
  //handle delete transaction confirmation
  function handleDeleteTransaction(itemId: string) {
    axios({
      method: 'delete',
      url: `http://localhost:3001/transaction/${itemId}`,
    })
    .then(() => {
      setTransaction(transaction.filter((item: any) => item._id !== itemId));
      deleteMessage()
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'élément :', error);
    });
  }
  //show delete transaction
  const showDeleteConfirmation = (item: Trans) => {
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
      const data : Search = { start: selectedDateDebut.toISOString(), end: selectedDateEnd.toISOString() } 
      try {
        const response  = await axios({
          method: 'post',
          url: 'http://localhost:3001/transaction/search',
          data: data,
        })        
        setSearchTransaction(response.data)
      } catch (error) {
      }  
    }else{
      errorMessage();
    }
  }
  //message
  const errorMessage = () => {
    message.error('Veuillez selectionner des dates !');
  };
  const deleteMessage = () => {
    message.success('Suppression de la transaction réussie !');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //get detail function
  const getDetail = async (itemId: string) => {
    //getting the transaction
    try {
      axios({
        method: 'get',
        url: `http://localhost:3001/transaction/find/${itemId}`,
      })
      .then((rep) => {
        {setSelectTransaction(rep.data)
        }
      })
    } catch (error) {
      console.error(error);
    }     
    //getting all detail 
    try {
      axios({
        method: 'get',
        url: `http://localhost:3001/detailtransaction/trans/${itemId}`,
      })
        .then((rep) => {
          {setDetail(rep.data)
            showDetail()
        }
        })
      } catch (error) {
        console.error(error);
      }   
  }

  //edit trasanction item
  function EditTransaction(item: Item) {
    setSelectedItemEdit(item);
    showModal()

    setEditedItem({
      _id: item._id,
      date_transaction: item.date_transaction,
      nom_client: item.nom_client,
      ref: item.ref,
      montant_transaction: item.montant_transaction,
     }); 
  }
  //handling edit submit
  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    if (editedItem) {
      if (selectedDate) {
        axios({
          method: 'patch',
          url: `http://localhost:3001/transaction/${editedItem._id}`,
          data: formData,
        })
        .then((response) => {
          setEditedItem({ _id: '', date_transaction: '' , nom_client: '', ref: '', montant_transaction: 0,});
        })
        .catch((error) => {
          console.error('EditTransaction : Erreur lors du modification:', error);
        });
      } else {
        errorMessage()
      }
    }
  }
  //handling the edit date change
  const handleDateChange = (date: dayjs.Dayjs | null, dateString: string) => {
    setSelectedDate(date);
    if (date) {
      const isoDate = date.toISOString();
      setFormData({
        ...formData,
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
                  <div className='w-full relative sm:pr-20 block sm:flex justify-between bg-six mt-1 sm:p-3 p-2'>
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
                    <div className='flex sm:flex-col sm:justify-center sm:pr-0 pr-8 sm:mt-0 mt-2 justify-end'>
                      <button className='sm:my-1 p-1 rounded bg-blue-400 hover:bg-blue-500 flex'   onClick={() => EditTransaction(searchtransaction)} > <EditOutlined/></button>
                      <button className='p-1 sm:mx-0 mx-1 rounded bg-red-700 hover:bg-red-800 flex' onClick={ () => showDeleteConfirmation(searchtransaction)}> <DeleteOutlined/> </button>
                    </div>
                    <div className='absolute sm:top-6 bottom-2 right-4'>
                      <button className='sm:my-3 p-1 sm:text-xs sm:rounded-none rounded bg-gray-200 hover:bg-gray-300 flex' onClick={() => getDetail(searchtransaction._id)}><EyeOutlined/><div className='sm:block hidden ml-1'> Detail</div></button>
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
        <Modal title="MODIFIER TRANSACTION" open={isModalOpen} onCancel={handleCloseModal} footer={null} >
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
              detail.map((detail: any , index) => {
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

export default TransactionSearch