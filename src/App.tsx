import { Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import NotFound from './pages/admin/NotFound';
import AddForms from './pages/admin/step/AddStep';
import LoginPage from './pages/admin/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import ProductPage from './pages/admin/product/ProductPage';
import TransactionPage from './pages/admin/transaction/TransactionPage';
import DashboardPage from './pages/admin/dashboard/DashboardPage';
import ClientPage from './pages/admin/client/ClientPage';
import HomePage from './pages/admin/HomePage';

function App() {
  return (
       <Routes>
          <Route index element={<LoginPage/>}/>
          <Route path='unauthorized' element={<Unauthorized/>}/>
          <Route path='*' element={<NotFound />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path='addforms' element={<AddForms/>}/>
            <Route path='page' element={<AppLayout />}> 
              <Route index element={<HomePage/>}/>
              <Route path='product' element={<ProductPage/>}/>
              <Route path='transaction' element={<TransactionPage/>}/>
              <Route path='dashboard' element={<DashboardPage/>}/>
              <Route path='client' element={<ClientPage/>}/>
            </Route>
          </Route>
       </Routes>
  );
}

export default App;
