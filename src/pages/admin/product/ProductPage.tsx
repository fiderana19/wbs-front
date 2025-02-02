import { FunctionComponent, useState, useEffect } from 'react'
import { Button, Card, Modal, Input } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, ShoppingCartOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import AddProduct from './AddProductPage';
import { deleteProductById, getAllProduct, patchProduct } from '../../../api/Product';
import { HttpStatus } from '../../../constants/Http_status';
import { Product } from '../../../interfaces/Product.interface';
import { okDeleteStyle } from '../../../constants/ModalStyle';
import { successMessage } from '../../../utils/AntdMessage';

const ProductPage: FunctionComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null);
  const [loading , setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const [editedItem, setEditedItem] = useState<Product>({   
    _id: '',
    libelle: '',
    description: '',
    pu: 0,
    stock: 0,
  });

  useEffect(() => {      
    fetchAllProduct();  
  }, [])

  async function fetchAllProduct() {
    const response = await getAllProduct(token);
    if(response?.status === HttpStatus.OK) {
      setProducts(response.data);
      setLoading(false);
    } else {
      console.log("Error");
    }
  }

  const showDeleteConfirmation = (item: Product) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  async function handleDelete(itemId: string) {
    const response = await deleteProductById(token, itemId);
    if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
      setProducts(products.filter((item: any) => item._id !== itemId));
      successMessage('Suppression du produit réussie !');
    } else {
      console.log("Error");
    }
  }

  function EditProduct(item: Product) {
    setSelectedItem(item);
    setIsEditProductModalOpen(true);
  
    setEditedItem({
      _id: item._id,
      libelle: item.libelle,
      description: item.description,
      pu: item.pu,
      stock: item.stock,
    });    
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await patchProduct(token, editedItem._id, editedItem);
    if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
      setEditedItem({ _id: '', libelle: '' , description: '', pu: 0, stock: 0, });
      fetchAllProduct();
      setIsEditProductModalOpen(false);
    } else {
      console.log("Error");
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedItem) {
      const { name, value } = e.target;
      setEditedItem({ ...editedItem, [name]: value });
    }
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
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
          <div className='text-xl font-bold font-lato'>LISTE DES PRODUITS</div>
          <Button onClick={() => setIsAddProductModalOpen(true)} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
        </div>
        <Modal title="AJOUTER UN PRODUIT" open={isAddProductModalOpen} onCancel={() => setIsAddProductModalOpen(false)} footer={null} >
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
              products && products.map((product: any, index) =>{
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
        <Modal title="MODIFIER PRODUIT" open={isEditProductModalOpen} onCancel={() => setIsEditProductModalOpen(false)} footer={null} >
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
          onCancel={() => setIsDeleteModalVisible(false)}
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

export default ProductPage;