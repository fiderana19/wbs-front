import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const AppLayout = lazy(() => import('./layouts/AppLayout'));
const NotFound = lazy(() => import('./pages/admin/NotFound'));
const AddForms = lazy(() => import('./pages/admin/step/AddStep'));
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const ProductPage = lazy(() => import('./pages/admin/product/ProductPage'));
const TransactionPage = lazy(() => import('./pages/admin/transaction/TransactionPage'));
const DashboardPage = lazy(() => import('./pages/admin/dashboard/DashboardPage'));
const ClientPage = lazy(() => import('./pages/admin/client/ClientPage'));
const HomePage = lazy(() => import('./pages/admin/HomePage'));
const MainPage = lazy(() => import('./pages/MainPage'));

function App() {
  return (
    <Suspense fallback={<div className='text-center'>Chargement...</div>}
    >
       <Routes>
            <Route index element={<MainPage/>}/>
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
    </Suspense>
  );
}

export default App;
