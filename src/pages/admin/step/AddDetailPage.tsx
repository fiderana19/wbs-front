import { Button, Input, Select, message } from 'antd'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import { getAllProduct } from '../../../api/Product';
import { HttpStatus } from '../../../constants/Http_status';
import { getAllTransaction } from '../../../api/Transaction';
import { postDetail } from '../../../api/Detail';
import { CreateDetailInterface } from '../../../interfaces/Detail.interface';
import { Transaction } from '../../../interfaces/Transaction.interface';
import { ProductForDetail } from '../../../interfaces/Product.interface';

interface StepsPropsType {
  handlePrev: ()=>void;
  handleNext: ()=>void;
}

const { Option } = Select;

const AddDetailPage: FunctionComponent<StepsPropsType> = ({handlePrev , handleNext}) => {
  let [trans, setTrans] = useState<Transaction[]>([]);
  const [selectedTransId, setSelectedTransId] = useState('');
  let [product, setProduct] = useState<ProductForDetail[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [formData, setFormData] = useState<CreateDetailInterface>({ quantite: 0, remise : 0, product: "", transaction: "" })
  const [quantiteError, setQuantiteError] = useState('');
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  
  useEffect(() => {
    fetchAllProduct();
    fetchAllTransaction();
  }, []);

  async function fetchAllProduct() {
    const response = await getAllProduct(token);
    if(response?.status === HttpStatus.OK) {
      setProduct(response.data);
    } else {
      console.log("Error");
    }
  }
  async function fetchAllTransaction() {
    const response = await getAllTransaction(token);
    if(response?.status === HttpStatus.OK) {
      setTrans(response.data);
    } else {
      console.log("Error")
    }
  }

  //handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuantiteError('')

    if (formData.quantite < 1) {
      setQuantiteError('La quantité ne doit pas être nulle');
  }

    if (selectedProductId && selectedTransId ) {
      if (formData.quantite >= 1) {

        const response = await postDetail(token, formData);
        if(response?.status === HttpStatus.CREATED) {
          setFormData({ quantite: 0, remise : 0, product: "", transaction: "" })
          successMessage();
        } 
        else if(response?.status === HttpStatus.BAD_REQUEST) {
          alertStock();
        }
        else {
          console.log("Error");
        }
      }
    } else {
      errorMessage()
    }
  }
  //handle the key press
  const handleKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which || e.keyCode;

    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  }
  //message
  const alertStock = () => {
    message.error("Le niveau du stock n'est suffisant !");
  };

  const errorMessage = () => {
    message.error('Veuillez remplir les champs !');
  };

  const successMessage = () => {
    message.success('Detail du transaction ajouté avec succés !');
  };
  //handle input change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  }
  //handling the select product change
  const handleSelectProductChange = (value: any) => {
    setSelectedProductId(value);
    setFormData({
      ...formData,
      product: value,
    });
  };
  //handling the select transaction chnage
  const handleSelectTransChange = (value: any) => {
    setSelectedTransId(value);
    setFormData({
      ...formData,
      transaction: value,
    });
  };
    
  return (
    <div className='py-16 flex justify-center'>
      <button onClick={handlePrev}
        className='fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        <ArrowLeftOutlined /> Retour 
      </button>
      <div className='text-center'>
        <div className='text-2xl font-bold'>DETAIL DU TRANSACTION</div>
          <form className='w-60 mx-auto my-7 text-left' onSubmit={handleSubmit}>
            <label htmlFor='idproduit'>Transaction : </label><br />
            <Select
              value={selectedTransId}
              onChange={handleSelectTransChange}
              className='w-full my-1'
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Sélectionnez une transaction</Option>
                {
                  trans.map((tr: any, index) => {
                    return(
                      <Option key={index} value={tr._id}>
                        { `${tr.nom_client} ${dayjs(tr.date_transaction).format('DD-MM-YYYY HH:mm').toString()}` }
                      </Option>
                    )
                  })
                }
            </Select>
            {selectedTransId && <p>Transaction sélectionné : {selectedTransId}</p>}  
            <label htmlFor='idproduit'>Produit : </label><br />
            <Select
              value={selectedProductId}
              onChange={handleSelectProductChange}
              className='w-full my-1'
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Sélectionnez un produit</Option>
              {
                product.map((pr: any, index) => {
                  return(
                    <Option key={index} value={pr._id}>
                      {pr.libelle}
                    </Option>
                  )
                })
              }
            </Select>
            {selectedProductId && <p>Produit sélectionné : {selectedProductId}</p>}
            <label htmlFor='quantite'>Quantité : </label><br />
            <Input name='quantite' onKeyPress={handleKeyPress} className={quantiteError ? 'border border-red-500 my-1' : 'my-1'} onChange={handleChange} value={formData.quantite} required /><br />
            {quantiteError && <div className="text-red-500 text-xs">{quantiteError}</div>}
            <label htmlFor='remise'>Remise : </label><br />
            <Input name='remise' onKeyPress={handleKeyPress} className='my-1'  onChange={handleChange} value={formData.remise} required /><br />
            <div className='flex justify-center my-3'>
              <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type='submit'>AJOUTER</button>
            </div>
          </form>
        <div className=''>
          <Button onClick={handleNext} type='primary' className='bg- bg-green-600' >Valider la transaction</Button>
        </div>
      </div>
    </div>
  )
}

export default AddDetailPage