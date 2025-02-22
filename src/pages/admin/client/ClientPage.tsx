import { FunctionComponent, useState, useEffect } from 'react'
import { Input, Button, Card, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { deleteClientById, getAllClient, patchClientById } from '../../../api/Client';
import { HttpStatus } from '../../../constants/Http_status';
import { Client } from '../../../interfaces/Client.interface';
import { okDeleteStyle } from '../../../constants/ModalStyle';
import { errorMessage, successMessage } from '../../../utils/AntdMessage';
import { useGetAllClient } from '../../../hooks/useGetAllClient';

const ClientPage: FunctionComponent = () => {
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Client | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const [editedItem, setEditedItem] = useState<Client>({   
    _id: '',
    nom_client: '',
    adresse_client: '',
    mail_client: '',
    telephone_client: '',
  });
  const { data: clients, error, isError, isLoading } = useGetAllClient();

  const showDeleteConfirmation = async (item: Client) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  }

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      handleDelete(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
  }

  async function handleDelete(itemId: string) {
    const response  = await deleteClientById(token, itemId);
    if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
      setClients(clients.filter((item: any) => item._id !== itemId));
      successMessage('Suppression du client réussie !')
    } else {
      errorMessage("Erreur sur la suppression du client !")
    }
  }

  function EditClient(item: Client) {
    setSelectedItem(item);
    setIsEditClientModalOpen(true);
 
    setEditedItem({
      _id: item._id,
      nom_client: item.nom_client,
      adresse_client: item.adresse_client,
      mail_client: item.mail_client,
      telephone_client: item.telephone_client,
    }); 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await patchClientById(token, editedItem._id, editedItem);
    if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
      setEditedItem({ _id: '', nom_client: '' , adresse_client: '', mail_client: '', telephone_client: ''});
      setIsEditClientModalOpen(false);
    } else {
      errorMessage("Erreur sur la modification du client ! ")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };


  const handleKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which || e.keyCode;
  
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }

  return (
    <div className='pb-5 pt-24'>
      <div className='md:px-32 sm:px-10 px-4'>
        <div className='flex justify-between'>
          <div className='text-xl font-bold font-lato'>LISTE DES CLIENTS</div>
          <Link to='/admin/addforms'>
          <Button ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
          </Link>
        </div>
        <div className='my-7 grid gap-2 justify-center grid-cols-customized'>
          {
            isLoading ? (
              <div className='text-center my-10'>
                <LoadingOutlined className='text-3xl' />
                <div>Chargement...</div>
              </div>
            ) : (
              clients.map((client: any, index) =>{
                return(
                  <Card  key={index} className='hover:scale-105 duration-300'>
                    <div className='w-40 text-center'>
                      <UserOutlined className='text-5xl' />
                      <div className='py-3'>
                        <div className='text-base text-primary font-bold'>
                          { client.nom_client }
                        </div>
                        <div className='text-xs'>
                          { client.adresse_client }
                        </div>
                        <div className='text-sm'>
                          { client.mail_client }
                        </div>
                        <div className='text-sm'>
                          { client.telephone_client }
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <Button className='mx-1 bg-blue-400'  onClick={() => EditClient(client)} > <EditOutlined/> </Button>
                        <Button className='mx-1 bg-red-700'  onClick={() => showDeleteConfirmation(client)}> <DeleteOutlined/> </Button>
                      </div>
                    </div>
                  </Card>
                )
              })
            )
          }
          <Modal title="MODIFIER CLIENT" open={isEditClientModalOpen} onCancel={() => setIsEditClientModalOpen(false)} footer={null} >
            {selectedItem &&     
              <div>
                <form className='w-2/3 my-7 mx-auto' onSubmit={handleSubmit}>
                  <label htmlFor='nom_client' >Nom : </label> <br />
                  <Input name='nom_client' value={editedItem.nom_client} onChange={handleChange}/>
                  <label htmlFor='adresse_client' >Adresse : </label> <br />
                  <Input name='adresse_client' value={editedItem.adresse_client} onChange={handleChange}/>
                  <label htmlFor='mail_client' >Mail : </label> <br />
                  <Input name='mail_client' value={editedItem.mail_client} onChange={handleChange}/>
                  <label htmlFor='telephone_client' >Telephone : </label> <br />
                  <Input name='telephone_client' value={editedItem.telephone_client} onChange={handleChange} onKeyPress={handleKeyPress} />
                  <div className='flex justify-center my-3'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>MODIFIER</button>
                  </div>
                </form>
              </div>
            }
          </Modal>
          <Modal title="Suppression" 
            open={isDeleteModalVisible}
            onOk={handleDeleteConfirm}
            onCancel={() => setIsDeleteModalVisible(false)}
            okText="Supprimer"
            okButtonProps={{style: okDeleteStyle}}
            cancelText="Annuler"
          >
            <div className='text-red-900'>
              <WarningOutlined className='mr-2' />  
              Êtes-vous sûr de vouloir supprimer ce client ?
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default ClientPage;