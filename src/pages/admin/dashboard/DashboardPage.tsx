import { FunctionComponent, lazy, Suspense } from 'react'
import { Card, Space, Statistic } from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { useGetTransactionTotal } from '../../../hooks/useGetTransactionTotal';
import { useGetProductTotal } from '../../../hooks/useGetProductTotal';
import { useGetClientTotal } from '../../../hooks/useGetClientTotal';
import { useDark } from '../../../context/DarkThemeContext';
const DashboardChart = lazy(() => import('../../../components/dashboard/DashboardChart'));

const DashboardPage: FunctionComponent = () => {
  const { isDark } = useDark();
  const { data: totalTransaction } = useGetTransactionTotal();
  const { data: totalProduct } = useGetProductTotal();
  const { data: totalClient } = useGetClientTotal();

  return (  
    <div className={isDark ? 'dark-container md:px-32 lg: px sm:px-10 px-4 pb-5 pt-24' : 'md:px-32 lg: px sm:px-10 px-4 pb-5 pt-24'}>
      <div>
        <div className='text-xl font-bold font-lato'>Dashboard</div>
      </div>
      <div>
          <div className='my-4'>
            <Space direction='horizontal' className='sm:flex block'>
              <Card className={isDark ? 'bg-gray-600 border-gray-800' : 'bg-transparent'}>
                <Space direction='horizontal'>
                  <UserOutlined  className='p-2 rounded-full text-green-900 text-2xl' style={{ backgroundColor: 'rgba(0,255,0,.5)' }}/>
                  <Statistic title="Clients" value={totalClient} />
                </Space>
              </Card>
              <Card className={isDark ? 'bg-gray-600 border-gray-800' : 'bg-transparent'}>
                <Space direction='horizontal'>
                  <ShoppingCartOutlined  className='p-2 rounded-full text-red-900 text-2xl'  style={{ backgroundColor: 'rgba(255,0,0,.5)' }} />
                  <Statistic title="Produits" value={totalProduct}/>
                </Space>
              </Card>
              <Card className={isDark ? 'bg-gray-600 border-gray-800' : 'bg-transparent'}>
                <Space direction='horizontal'>
                  <DollarCircleOutlined  className='p-2 rounded-full text-blue-900 text-2xl'  style={{ backgroundColor: 'rgba(0,0,0,.25)' }} />
                  <Statistic title="Transactions" value={totalTransaction}/>
                </Space>
              </Card>
            </Space>
          </div>
          <div className=''>
            <Card  className={isDark ? 'bg-gray-600 border-gray-800 my-4 w-full p-2' : 'my-4 w-full bg-cyan-50 p-2'}>
              <div>
                <div className='text-center text-2xl font-bold font-lato'>STOCK DES PRODUITS</div>
                <div className='w-full h-72 my-3'>
                  <Suspense fallback={<div className='text-center my-10'>
                      <LoadingOutlined className='text-5xl' />
                    </div>}
                  >
                    <DashboardChart/>
                  </Suspense>
                </div>
              </div>
            </Card>
          </div>
      </div>
    </div>
  )
}

export default DashboardPage;