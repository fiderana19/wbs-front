import { FunctionComponent, useState , useEffect } from 'react'
import { Card, Space, Statistic } from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined, UserOutlined } from '@ant-design/icons';
import DashboardChart from '../../../components/dashboard/DashboardChart';
import { getClientTotal, getProductTotal, getTransactionTotal } from '../../../api/Dashboard';
import { HttpStatus } from '../../../constants/Http_status';
import { errorMessage } from '../../../utils/AntdMessage';

const DashboardPage: FunctionComponent = () => {
  let [totalClient, setTotalClient] = useState()
  let [totalProduct, setTotalProduct] = useState()
  let [totalTransaction, setTotalTransaction] = useState()
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  useEffect(() => { 
    fetchClientTotal();   
    fetchProductTotal();
    fetchTransactionTotal();    
  },[])


  async function fetchClientTotal() {
    const response = await getClientTotal(token);
    if(response?.status === HttpStatus.OK) {
      setTotalClient(response.data);
    } else {
      errorMessage("Erreur sur la recupartion des données sur les clients ! ")
    }
  }

  async function fetchProductTotal() {
    const response = await getProductTotal(token);
    if(response?.status === HttpStatus.OK) {
      setTotalProduct(response.data);
    } else {
      errorMessage("Erreur sur la recupartion des données sur les produits ! ")
    }
  }

  async function fetchTransactionTotal() {
    const response = await getTransactionTotal(token);
    if(response?.status === HttpStatus.OK) {
      setTotalTransaction(response.data);
    } else {
      errorMessage("Erreur sur la recupartion des données sur les transactions ! ")
    }
  }

  return (
    <div className='md:px-32 lg: px sm:px-10 px-4 pb-5 pt-24'>
      <div>
        <div className='text-xl font-bold font-lato'>Dashboard</div>
      </div>
      <div>
          <div className='my-4'>
            <Space direction='horizontal' className='sm:flex block'>
              <Card>
                <Space direction='horizontal'>
                  <UserOutlined  className='p-2 rounded-full text-green-900 text-2xl' style={{ backgroundColor: 'rgba(0,255,0,.5)' }}/>
                  <Statistic title="Clients" value={totalClient}/>
                </Space>
              </Card>
              <Card>
                <Space direction='horizontal'>
                  <ShoppingCartOutlined  className='p-2 rounded-full text-red-900 text-2xl'  style={{ backgroundColor: 'rgba(255,0,0,.5)' }} />
                  <Statistic title="Produits" value={totalProduct}/>
                </Space>
              </Card>
              <Card>
                <Space direction='horizontal'>
                  <DollarCircleOutlined  className='p-2 rounded-full text-blue-900 text-2xl'  style={{ backgroundColor: 'rgba(0,0,0,.25)' }} />
                  <Statistic title="Transactions" value={totalTransaction}/>
                </Space>
              </Card>
            </Space>
          </div>
          <div className=''>
            <Card  className='my-4 w-full bg-cyan-50 p-2'>
              <div>
                <div className='text-center text-2xl font-bold font-lato'>STOCK DES PRODUITS</div>
                <div className='w-full h-72 my-3'>
                  <DashboardChart/>
                </div>
              </div>
            </Card>
          </div>
      </div>
    </div>
  )
}

export default DashboardPage;