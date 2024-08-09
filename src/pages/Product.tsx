import { FunctionComponent, useState, useEffect } from 'react'
import { Button, Card, message, Modal, Input } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, ShoppingCartOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import AddProduct from './AddProduct';

interface Data {
  _id: string;
  libelle: string;
  description: string;
  pu: number;
  stock: number;
}

const Product: FunctionComponent = () => {
  let [product, setProduct] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Data | null>(null);
  const [loading , setLoading] = useState(true);
  const [editedItem, setEditedItem] = useState<Data>({   
    _id: '',
    libelle: '',
    description: '',
    pu: 0,
    stock: 0,
  });

  useEffect(() => {      
    //getting all product
    try {
      axios({
        method: 'get',
        url: 'http://localhost:3001/product',
      })
      .then((rep) => {
        {
          setProduct(rep.data)
          setLoading(false);
        }
      })
    } catch (error) {
      console.error("Product : Erreur de recuperation des produits : " + error);
    }  
  }, [])
  //show delete confirmation
  const showDeleteConfirmation = (item: Data) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };
  //handling product delete
  function handleDelete(itemId: string) {
    axios({
      method: 'delete',
      url: `http://localhost:3001/product/${itemId}`,
    })
    .then(() => {
      setProduct(product.filter((item: any) => item._id !== itemId));
      deleteMessage()
    })
    .catch(error => {
      console.error('Product : Erreur lors de la suppression de l\'élément :', error);
    });
  }
  //edit product item
  function EditProduct(item: Data) {
    setSelectedItem(item);
    showModal1();
  
    setEditedItem({
      _id: item._id,
      libelle: item.libelle,
      description: item.description,
      pu: item.pu,
      stock: item.stock,
    });    
  }
  //handlign the form submit
  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    if (editedItem) {
      axios({
        method: 'patch',
        url: `http://localhost:3001/product/${editedItem._id}`,
        data: editedItem,
      })
      .then(() => {
        setEditedItem({ _id: '', libelle: '' , description: '', pu: 0, stock: 0, });
      })
      .catch((error) => {
        console.error('EditProduct : Erreur lors du modification:', error);
      });
    }
  }
  //handle edit input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedItem) {
      const { name, value } = e.target;
      setEditedItem({ ...editedItem, [name]: value });
    }
  };
  //handling delete confirmation
  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
  };
  //handlign delete cancel
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };
  ///message
  const deleteMessage = () => {
    message.success('Suppression du produit réussie !');
  };
  //show add modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  //closing add modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //show edit modal
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  //close edit modal
  const handleCloseModal1 = () => {
    setIsModalOpen1(false);
  };
  const okDeleteStyle = {
    background: 'red'
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
          <div className='text-xl font-bold font-lato'>LISTE DES PRODUITS</div>
          <Button onClick={showModal} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
        </div>
        <Modal title="AJOUTER UN PRODUIT" open={isModalOpen} onCancel={handleCloseModal} footer={null} >
          <AddProduct />
        </Modal>
        <div className='my-7 grid gap-2 justify-center grid-cols-customized'>
          {
            loading ? (
              <div className='text-center my-10'>
                <LoadingOutlined className='text-3xl' />
                <div>Chargement...</div>
              </div>
            ) : (
              product.map((product: any, index) =>{
                return(
                  <Card key={index} className='hover:scale-105 duration-300'>
                    <div className='w-40 text-center'>
                      <ShoppingCartOutlined className='text-5xl' />
                      <div className='py-3'>
                        <div className='text-base text-primary font-bold'>
                          { product.libelle }
                        </div>
                        <div className='text-xs'>
                          { product.description }
                        </div>
                        <div className='text-sm'>
                          <span className='text-gray-500 font-semibold'> Unité: </span>{ product.pu.toLocaleString('fr-FR') } <span className='text-xs'>MGA</span>
                        </div>
                        <div className='text-sm'>
                          <span className='text-gray-500 font-semibold'>Stock: </span> { product.stock }
                        </div>
                      </div>
                      <div className='flex justify-center'>
                        <Button className='mx-1 bg-blue-400'  onClick={() => EditProduct(product)} > <EditOutlined/> </Button>
                        <Button className='mx-1 bg-red-700'  onClick={() => showDeleteConfirmation(product)}> <DeleteOutlined/> </Button>
                      </div>
                    </div>
                  </Card>
                )
              })
            )
          }
        </div>
        <Modal title="MODIFIER PRODUIT" open={isModalOpen1} onCancel={handleCloseModal1} footer={null} >
          {/* {selectedItem && <EditProduct item={selectedItem} />} */}
          {selectedItem && 
            <div>
              <form className='w-2/3 my-7 mx-auto' onSubmit={handleSubmit}>
                <label htmlFor='libelle' >Libelle : </label> <br />
                <Input name='libelle' value={editedItem.libelle} onChange={handleInputChange}/>
                <label htmlFor='description' >Description : </label> <br />
                <Input name='description' value={editedItem.description} onChange={handleInputChange}/>
                <label htmlFor='pu' >Prix unitaire : </label> <br />
                <Input name='pu' value={editedItem.pu} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                <label htmlFor='stock' >Stock : </label> <br />
                <Input name='stock' value={editedItem.stock} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                <div className='flex justify-center my-3'>
                  <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>MODIFIER</button>
                </div>
              </form>
            </div>
          }
        </Modal>
        <Modal
          title="Suppression"
          open={isDeleteModalVisible}
          onOk={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          okText="Supprimer"
          cancelText="Annuler"
          okButtonProps={{style: okDeleteStyle}}
        >
          <div className='text-red-900'>
            <WarningOutlined className='mr-2' />  
            Êtes-vous sûr de vouloir supprimer ce produit ?
            Cela pourrait entraînner des incohérences de données
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Product;