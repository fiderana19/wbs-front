import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Transaction from './pages/Transaction';
import Dashboard from './pages/Dashboard';
import AppLayout from './layouts/AppLayout';
import NotFound from './pages/NotFound';
import Client from './pages/Client';
import AddForms from './pages/AddStep';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
       <Routes>
          <Route index element={<LoginPage/>}/>
          <Route path='unauthorized' element={<Unauthorized/>}/>
          <Route path='*' element={<NotFound />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path='page' element={<AppLayout />}> 
              <Route index element={<Home/>}/>
              <Route path='product' element={<Product/>}/>
              <Route path='transaction' element={<Transaction/>}/>
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='client' element={<Client/>}/>
            </Route>
            <Route path='addforms' element={<AddForms/>}/>
          </Route>
       </Routes>
  );
}

export default App;
