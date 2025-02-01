import { FunctionComponent, useState, useEffect } from 'react'
import { Input, Button, Card, message, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { deleteClientById, getAllClient, patchClientById } from '../../../api/Client';
import { HttpStatus } from '../../../constants/Http_status';

interface Data {
    _id: string;
    nom_client: string;
    adresse_client: string;
    mail_client: string;
    telephone_client: string;
}

const ClientPage: FunctionComponent = () => {
  let [client, setClient] = useState<Data[]>([]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Data | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [loading , setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const [editedItem, setEditedItem] = useState<Data>({   
    _id: '',
    nom_client: '',
    adresse_client: '',
    mail_client: '',
    telephone_client: '',
  });

  useEffect(() => {        
    fetchAllClient()
  }, [])

  //fetching all client item
  async function fetchAllClient() {
    const response  = await getAllClient(token);
    if(response?.status === HttpStatus.OK) {
      setClient(response.data);
      setLoading(false)
    } else {
      console.log("Error")
    }
  }

  //show the delete confimation modal
  const showDeleteConfirmation = async (item: Data) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  }
  //handlign delete confirmation
  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      handleDelete(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
  }
  //handling delete cancel
  const handleDeleteCancel = async () => {
    setIsDeleteModalVisible(false)
  }
  //handlign delete confirmation
  async function handleDelete(itemId: string) {
    //deleting the client
    const response  = await deleteClientById(token, itemId);
    if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
      setClient(client.filter((item: any) => item._id !== itemId));
      deleteMessage()
    } else {
      console.log("Error");
    }
  }
  //show the modal edit
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  //closing the modal edit
  const handleCloseModal1 = () => {
    setIsModalOpen1(false);
  };
  //message 
  const deleteMessage = () => {
    message.success('Suppression du client réussie !');
  };
  //editing client item
  function EditClient(item: Data) {
    setSelectedItem(item);
    showModal1();
 
    setEditedItem({
      _id: item._id,
      nom_client: item.nom_client,
      adresse_client: item.adresse_client,
      mail_client: item.mail_client,
      telephone_client: item.telephone_client,
    }); 
  }
  //handling the edit submit
  const handleSubmit = async (e: React.FormEvent) => {
    const response = await patchClientById(token, editedItem._id, editedItem);
    if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
      setEditedItem({ _id: '', nom_client: '' , adresse_client: '', mail_client: '', telephone_client: ''});
    } else {
      console.log("Error");
    }
  }
  //handling the edit form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };
  //style of modal
  const okDeleteStyle = {
    background: 'red', color: 'white'
  }
  //handling the keypress
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
            loading ? (
              <div className='text-center my-10'>
                <LoadingOutlined className='text-3xl' />
                <div>Chargement...</div>
              </div>
            ) : (
              client.map((clients: any, index) =>{
                return(
                  <Card  key={index} className='hover:scale-105 duration-300'>
                    <div className='w-40 text-center'>
                      <UserOutlined className='text-5xl' />
                      <div className='py-3'>
                        <div className='text-base text-primary font-bold'>
                          { clients.nom_client }
                        </div>
                        <div className='text-xs'>
                          { clients.adresse_client }
                        </div>
                        <div className='text-sm'>
                          { clients.mail_client }
                        </div>
                        <div className='text-sm'>
                          { clients.telephone_client }
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <Button className='mx-1 bg-blue-400'  onClick={() => EditClient(clients)} > <EditOutlined/> </Button>
                        <Button className='mx-1 bg-red-700'  onClick={() => showDeleteConfirmation(clients)}> <DeleteOutlined/> </Button>
                      </div>
                    </div>
                  </Card>
                )
              })
            )
          }
          <Modal title="MODIFIER CLIENT" open={isModalOpen1} onCancel={handleCloseModal1} footer={null} >
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
            onCancel={handleDeleteCancel}
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