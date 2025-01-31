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

function App() {
  return (
       <Routes>
          <Route path='addforms' element={<AddForms/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path="/" element={<AppLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='transaction' element={<Transaction/>}/>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='client' element={<Client/>}/>
            <Route path='*' element={<NotFound />} />
          </Route>
       </Routes>
  );
}

export default App;
