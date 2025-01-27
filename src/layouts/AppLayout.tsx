import { Dropdown, MenuProps, Space } from "antd";
import { FunctionComponent, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined , HomeOutlined, BarChartOutlined , MoneyCollectOutlined, MenuOutlined , UserOutlined } from '@ant-design/icons';

const AppLayout: FunctionComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation()

    const items: MenuProps['items'] = [
        {
            label: <Link to=''>
                        <div  className={location.pathname === '' ? 'text-primary' : ''}>
                            <HomeOutlined /> ACCUEIL
                        </div>
                    </Link>,
            key: '01'
        },
        {
            label: <Link to='dashboard'>
                    <div className={location.pathname === '/dashboard' ? 'text-primary' : ''}>
                        <BarChartOutlined /> DASHOARD
                    </div>
                </Link>,
            key: '1'
        },
        {
            label: <Link to='transaction'>
                <div className={location.pathname === '/transaction' ? 'text-primary' : ''}>
                    <MoneyCollectOutlined /> TRANSACTION
                </div>
                </Link>,
            key: '3'
        },
        {
            label: <Link to='product'>
                <div className={location.pathname === '/product' ? 'text-primary' : ''}>
                    <ShoppingCartOutlined /> PRODUIT
                </div>
                </Link>,
            key: '4'
        },
        {
            label: <Link  to='client'>
                <div className={location.pathname === '/client' ? 'text-primary' : ''}>
                    <UserOutlined /> CLIENT
                </div>
                </Link>,
            key: '6'
        },

    ];

    return(
        <div className="w-full">
            <div className="w-full fixed px-5 h-14 bg-primary z-50 text-white flex justify-between items-center  font-lato">
                <Link to='home'>
                    <p className="text-2xl font-bold hover:animate-pulse">WBS</p>
                </Link>
                <div className="md:flex items-center hidden md:visible">
                    <Link to='' className="mx-1 p-1 hover:scale-105 hover:text-opacity-100  transition duration-300">
                        <div  className={location.pathname === '/' ? 'text-four' : ''}>
                            <HomeOutlined /> Accueil
                        </div>
                    </Link>
                    <Link to='dashboard' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/dashboard' ? 'text-four' : ''}>
                            <BarChartOutlined /> Dashboard
                        </div>
                    </Link>
                    <Link to='transaction' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/transaction' ? 'text-four' : ''}>
                            <MoneyCollectOutlined /> Transaction
                        </div>
                    </Link>
                    <Link to='product' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/product' ? 'text-four' : ''}>
                            <ShoppingCartOutlined /> Produit
                        </div>
                    </Link>
                    <Link to='client' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/client' ? 'text-four' : ''}>
                            <UserOutlined /> Client
                        </div>
                    </Link>
                </div>
                <Dropdown className="visible md:hidden" menu={{items}} trigger={['click']}>
                    <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
                        <Space>
                            <MenuOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
            <Outlet />
        </div>
    )
}

export default AppLayout;