import React, { FunctionComponent, useState , useEffect } from 'react'
import axios from 'axios';
import { Card, Space, Statistic } from 'antd';
import { ShoppingCartOutlined, DollarCircleOutlined, UserOutlined } from '@ant-design/icons';
import DashboardChart from './DashboardChart';


const Dashboard: FunctionComponent = () => {
  let [totalClient, setTotalClient] = useState()
  let [totalProduct, setTotalProduct] = useState()
  let [totalTransaction, setTotalTransaction] = useState()

  useEffect(() => {        
    //getting the client total
    try {
      axios({
        method: 'get',
        url: 'http://localhost:3001/client/total',
      })
      .then((rep) => {
        {setTotalClient(rep.data)}
      })
    } catch (error) {
      console.error("Dashboard : Erreur de recuperation total client : " + error);
    }
    //getting the product total
    try {
      axios({
        method: 'get',
        url: 'http://localhost:3001/product/total',
      })
      .then((rep) => {
        {setTotalProduct(rep.data)}
      })
    } catch (error) {
      console.error("Dashboard : Erreur de recuperation total produit : " + error);
    }
    //getting the transaction total
    try {
      axios({
        method: 'get',
        url: 'http://localhost:3001/transaction/total',
      })
      .then((rep) => {
        {setTotalTransaction(rep.data)}
      })
    } catch (error) {
      console.error("Dashboard : Erreur de recuperation total transaction : " + error);
    }
  },[])

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

export default Dashboard;