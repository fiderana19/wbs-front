import { Dropdown, MenuProps, Space } from "antd";
import { FunctionComponent, lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined , HomeOutlined, BarChartOutlined , MoneyCollectOutlined, MenuOutlined , UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { useAuth } from "../context/AuthContext";
import WbsLogo from '../assets/image/wbs-logo.png';
const ToggleTheme = lazy(() => import('../components/ToggleTheme'))

const AppLayout: FunctionComponent = () => {
    const location = useLocation();
    const {logout} = useAuth();

    const items: MenuProps['items'] = [
        {
            label: <Link to='/admin/page'>
                        <div  className={location.pathname === '/admin/page' ? 'text-second' : ''}>
                            <HomeOutlined /> ACCUEIL
                        </div>
                    </Link>,
            key: '01'
        },
        {
            label: <Link to='/admin/page/dashboard'>
                    <div className={location.pathname === '/admin/page/dashboard' ? 'text-second' : ''}>
                        <BarChartOutlined /> DASHBOARD
                    </div>
                </Link>,
            key: '1'
        },
        {
            label: <Link to='/admin/page/transaction'>
                <div className={location.pathname === '/admin/page/transaction' ? 'text-second' : ''}>
                    <MoneyCollectOutlined /> TRANSACTION
                </div>
                </Link>,
            key: '3'
        },
        {
            label: <Link to='/admin/page/product'>
                <div className={location.pathname === '/admin/page/product' ? 'text-second' : ''}>
                    <ShoppingCartOutlined /> PRODUIT
                </div>
                </Link>,
            key: '4'
        },
        {
            label: <Link  to='/admin/page/client'>
                <div className={location.pathname === '/admin/page/client' ? 'text-second' : ''}>
                    <UserOutlined /> CLIENT
                </div>
                </Link>,
            key: '6'
        },

    ];

    return(
        <div className="w-full">
            <div className="w-full fixed px-5 h-14 bg-primary z-50 text-white flex justify-between items-center  font-lato">
                <Link to='/admin/page'>
                    <img src={WbsLogo} alt="WBS Logo" className="w-14 object-cover" />
                </Link>
                <div className="md:flex items-center hidden md:visible">
                    <Link to='/admin/page' className="mx-1 p-1 hover:scale-105 hover:text-opacity-100  transition duration-300">
                        <div  className={location.pathname === '/admin/page' ? 'text-second' : ''}>
                            <HomeOutlined /> Accueil
                        </div>
                    </Link>
                    <Link to='/admin/page/dashboard' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/admin/page/dashboard' ? 'text-second' : ''}>
                            <BarChartOutlined /> Dashboard
                        </div>
                    </Link>
                    <Link to='/admin/page/transaction' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/admin/page/transaction' ? 'text-second' : ''}>
                            <MoneyCollectOutlined /> Transaction
                        </div>
                    </Link>
                    <Link to='/admin/page/product' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/admin/page/product' ? 'text-second' : ''}>
                            <ShoppingCartOutlined /> Produit
                        </div>
                    </Link>
                    <Link to='/admin/page/client' className="mx-1 p-1 hover:scale-105 hover:text-second hover:text-opacity-100  transition duration-300">
                        <div className={location.pathname === '/admin/page/client' ? 'text-second' : ''}>
                            <UserOutlined /> Client
                        </div>
                    </Link>
                    <div className="mx-2">
                        <Suspense fallback={
                            <div className="text-xl"><LoadingOutlined /></div>
                        }>
                            <ToggleTheme />
                        </Suspense>
                    </div>
                    <button onClick={logout} className=" border hover:bg-white hover:text-primary transition-all text-white mx-auto font-latobold py-0.5 px-2.5 my-1 rounded-full">Deconnexion</button>
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