import { FunctionComponent, useState } from 'react'
import { Input, Button, Card, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Client } from '../../../interfaces/Client.interface';
import { okDeleteStyle } from '../../../constants/ModalStyle';
import { useGetAllClient } from '../../../hooks/useGetAllClient';
import { useDeleteClient } from '../../../hooks/useDeleteClient';
import { usePatchClient } from '../../../hooks/usePatchClient';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleNumberKeyPress } from '../../../utils/keypress';

const ClientEditSchema = yup.object({
  _id: yup.string().required("Le nom du client ne doit pas être vide !"),
  nom_client: yup.string().required("Le nom du client ne doit pas être vide !"),
  adresse_client: yup.string().required("L'adresse du client ne doit pas être vide !"),
  mail_client: yup.string().email("Email invalide !").required("Le mail du client ne doit pas être vide !"),
  telephone_client: yup.string().length(10, "Le numero de telephone doit comprendre 10 chiffres !").required("Le telephone du client ne doit pas être vide !"),
})
const ClientPage: FunctionComponent = () => {
  const { control, formState, handleSubmit: edit, register } = useForm<Client>({
    resolver: yupResolver(ClientEditSchema)
  });
  const { errors } = formState;
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Client | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editedItem, setEditedItem] = useState<Client>({   
    _id: '',
    nom_client: '',
    adresse_client: '',
    mail_client: '',
    telephone_client: '',
  });
  const { data: clients, isLoading } = useGetAllClient();
  const { mutateAsync: deleteClient } = useDeleteClient();
  const { mutateAsync: patchClient } = usePatchClient();

  const showDeleteConfirmation = async (item: Client) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  }

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      deleteClient(itemToDelete._id);
      setIsDeleteModalVisible(false);
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

  const handleSubmitEdit = async (data: Client) => {
    console.log(data)
    patchClient(data);
    setIsEditClientModalOpen(false);
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
              clients && clients.map((client: any) =>{
                return(
                  <Card  key={client._id} className='hover:scale-105 duration-300'>
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
                <form className='w-2/3 my-7 mx-auto' onSubmit={edit(handleSubmitEdit)}>
                  <input className='hidden' defaultValue={editedItem._id} {...register('_id')} />
                  <label htmlFor='nom_client' >Nom : </label> <br />
                  <Controller 
                    control={control}
                    name='nom_client'
                    defaultValue={editedItem.nom_client}
                    render={({
                      field: { value, onChange, onBlur }
                    }) => (
                      <Input value={value} className={errors.nom_client ? 'border border-red-500 rounded text-red-500' : ''} onChange={onChange} onBlur={onBlur} />
                    )}
                  />
                  { errors.nom_client && <div className='text-xs text-red-500 text-left'>{errors.nom_client.message}</div> }
                  <label htmlFor='adresse_client' >Adresse : </label> <br />
                  <Controller 
                    control={control}
                    name='adresse_client'
                    defaultValue={editedItem.adresse_client}
                    render={({
                      field: { value, onBlur, onChange }
                    }) => (
                      <Input value={value} onChange={onChange} onBlur={onBlur}  className={errors.adresse_client ? 'border border-red-500 rounded text-red-500' : ''}/>
                    )}
                  />
                  { errors.adresse_client && <div className='text-xs text-red-500 text-left'>{errors.adresse_client.message}</div> }
                  <label htmlFor='mail_client' >Mail : </label> <br />
                  <Controller 
                    control={control}
                    name='mail_client'
                    defaultValue={editedItem.mail_client}
                    render={({
                      field: { value, onBlur, onChange }
                    }) => (
                      <Input value={value} onChange={onChange} onBlur={onBlur} className={errors.mail_client ? 'border border-red-500 rounded text-red-500' : ''}/>
                    )}
                  />
                  { errors.mail_client && <div className='text-xs text-red-500 text-left'>{errors.mail_client.message}</div> }
                  <label htmlFor='telephone_client' >Telephone : </label> <br />
                  <Controller 
                    control={control}
                    name='telephone_client'
                    defaultValue={editedItem.telephone_client}
                    render={({
                      field: { value, onBlur, onChange }
                    }) => (
                      <Input value={value} onChange={onChange} onBlur={onBlur} onKeyPress={handleNumberKeyPress}  className={errors.telephone_client ? 'border border-red-500 rounded text-red-500' : ''}/>
                    )}
                  />
                  { errors.telephone_client && <div className='text-xs text-red-500 text-left'>{errors.telephone_client.message}</div> }
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