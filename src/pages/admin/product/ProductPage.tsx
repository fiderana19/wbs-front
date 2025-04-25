import { FunctionComponent, lazy, Suspense, useState } from 'react'
import { Modal } from 'antd'
import { EditOutlined, DeleteOutlined, WarningOutlined, ShoppingCartOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Product } from '../../../interfaces/Product.interface';
import { okDeleteStyle } from '../../../constants/ModalStyle';
import { useGetAllProduct } from '../../../hooks/useGetAllProduct';
import { useDeleteProduct } from '../../../hooks/useDeleteProduct';
import { usePatchProduct } from '../../../hooks/usePatchProduct';
import { Controller, useForm } from 'react-hook-form';
import { handleNumberKeyPress } from '../../../utils/keypress';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDark } from '../../../context/DarkThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
const AddProduct = lazy(() => import('./AddProductPage'));

const ProductEditSchema = yup.object({
  _id: yup.string().required(),
  libelle: yup.string().required("Le libelle ne doit pas être vide !"),
  description: yup.string().required("La description ne doit pas être vide !"),
  pu: yup.number().required("Le prix unitaire ne doit pas être vide !"),
  stock: yup.number().required("Le stock ne doit pas être vide !"),
})
const ProductPage: FunctionComponent = () => {
  const { control, handleSubmit: edit, formState, register } = useForm<Product>({
    resolver: yupResolver(ProductEditSchema)
  });
  const { errors } = formState;
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null);
  const { isDark } = useDark();
  const [editedItem, setEditedItem] = useState<Product>({   
    _id: '',
    libelle: '',
    description: '',
    pu: 0,
    stock: 0,
  });

  const { data: products, isLoading } = useGetAllProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const { mutateAsync: patchProduct } = usePatchProduct();

  const showDeleteConfirmation = (item: Product) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);

    console.log("efa izy mlay !!!!")
  };

  async function handleDelete(itemId: string) {
    deleteProduct(itemId);
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

  const handleSubmitEdit = async (data: Product) => {
    patchProduct(data);
    setEditedItem({ _id: '', libelle: '' , description: '', pu: 0, stock: 0, });
    setIsEditProductModalOpen(false);
  }

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDelete(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
  };

  return (
    <div className={isDark ? 'dark-container pb-5 pt-24 min-h-screen' : 'pb-5 pt-24'}>
      <div className='md:px-32 sm:px-10 px-4'>
        <div className='flex justify-between'>
          <div className='text-xl font-bold font-lato'>LISTE DES PRODUITS</div>
          <Button onClick={() => setIsAddProductModalOpen(true)} ><div className='sm:hidden block'><PlusOutlined /></div><div className='sm:block hidden'> AJOUTER </div></Button>
        </div>
        <Modal title="AJOUTER UN PRODUIT" open={isAddProductModalOpen} onCancel={() => setIsAddProductModalOpen(false)} footer={null} >
          <Suspense fallback={<div className='text-center my-10'>
              <LoadingOutlined className='text-5xl' />
            </div>}
          >
            <AddProduct />          
          </Suspense>
        </Modal>
        <div className='my-7 grid gap-2 justify-center grid-cols-customized'>
          {
            isLoading ? (
              <div className='text-center my-10'>
                <LoadingOutlined className='text-3xl' />
                <div>Chargement...</div>
              </div>
            ) : (
              products && products.map((product: any) =>{
                return(
                  <Card key={product._id} className={isDark ? ' bg-gray-600 border-gray-800' : ''}>
                    <div className='w-48'>
                      <CardHeader>
                        <ShoppingCartOutlined className='text-7xl mx-auto' />
                      </CardHeader>
                      <CardContent className={isDark ? 'py-3 text-white' : 'py-3'}>
                        <div className='text-base text-primary font-bold'>
                          { product.libelle }
                        </div>
                        <div className='text-xs'>
                          { product.description }
                        </div>
                        <div className='text-sm'>
                          <span className={isDark ? 'text-gray-100 font-latobold' : 'text-gray-500 font-semibold'}> Unité: </span>{ product.pu.toLocaleString('fr-FR') } <span className='text-xs'>MGA</span>
                        </div>
                        <div className='text-sm'>
                          <span className={isDark ? 'text-gray-100 font-latobold' : 'text-gray-500 font-semibold'}>Stock: </span> { product.stock }
                        </div>
                      </CardContent>
                      <CardFooter className='flex justify-end gap-1'>
                        <Button variant={'default'} size={'sm'} onClick={() => EditProduct(product)} > <EditOutlined/> </Button>
                        <Button variant={'destructive'} size={'sm'} onClick={() => showDeleteConfirmation(product)}> <DeleteOutlined/> </Button>
                      </CardFooter>
                    </div>
                  </Card>
                )
              })
            ) 
          }
        </div>
        <Modal title="MODIFIER PRODUIT" open={isEditProductModalOpen} onCancel={() => setIsEditProductModalOpen(false)} footer={null} >
          {selectedItem && 
            <div>
              <form className='w-2/3 my-7 mx-auto' onSubmit={edit(handleSubmitEdit)}>
                <input className='hidden' defaultValue={editedItem._id} {...register('_id')} />
                <label htmlFor='libelle' >Libelle : </label> <br />
                <Controller 
                  control={control}
                  name='libelle'
                  defaultValue={editedItem.libelle}
                  render={({
                    field: { value, onBlur, onChange }
                  }) => (
                    <Input value={value} onBlur={onBlur} onChange={onChange} className={errors.libelle ? 'border border-red-500 rounded text-red-500' : ''} />
                  )}
                />
                {errors.libelle && <div className='text-xs text-red-500 text-left'>{ errors.libelle.message }</div>}
                <label htmlFor='description' >Description : </label> <br />
                <Controller 
                  control={control}
                  name='description'
                  defaultValue={editedItem.description}
                  render={({
                    field: { value, onBlur, onChange }
                  }) => (
                    <Input value={value} onBlur={onBlur} onChange={onChange} className={errors.description ? 'border border-red-500 rounded text-red-500' : ''}/>
                  )}
                />
                {errors.description && <div className='text-xs text-red-500 text-left'>{ errors.description.message }</div>}
                <label htmlFor='pu' >Prix unitaire : </label> <br />
                <Controller 
                  control={control}
                  name='pu'
                  defaultValue={editedItem.pu}
                  render={({
                    field: { value, onBlur, onChange }
                  }) => (
                    <Input value={value} onBlur={onBlur} onChange={onChange} onKeyPress={handleNumberKeyPress} className={errors.pu ? 'border border-red-500 rounded text-red-500' : ''} />
                  )}
                />
                {errors.pu && <div className='text-xs text-red-500 text-left'>{ errors.pu.message }</div>}
                <label htmlFor='stock' >Stock : </label> <br />
                <Controller 
                  control={control}
                  name='stock'
                  defaultValue={editedItem.stock}
                  render={({
                    field: { value, onBlur, onChange }
                  }) => (
                    <Input value={value} onBlur={onBlur} onChange={onChange} onKeyPress={handleNumberKeyPress} className={errors.stock ? 'border border-red-500 rounded text-red-500' : ''}/>
                  )}
                />
                {errors.stock && <div className='text-xs text-red-500 text-left'>{ errors.stock.message }</div>}
                <div className='flex justify-center my-3'>
                  <Button variant={'primary'} type='submit'>MODIFIER</Button>
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