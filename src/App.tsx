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
       <Routes>
            <Route index element={
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                <MainPage/>
              </Suspense>
              }/>
            <Route path='unauthorized' element={
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                <Unauthorized/>
              </Suspense>
              }/>
            <Route path='*' element={
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                <NotFound />
              </Suspense>
              } />
            <Route path="/admin" element={
              <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                <ProtectedRoute />
              </Suspense>
              }>
              <Route path='addforms' element={
                <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                  <AddForms/>
                </Suspense>
                }/>
              <Route path='page' element={
                <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                  <AppLayout />
                </Suspense>
                }> 
                <Route index element={
                  <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                    <HomePage/>
                  </Suspense>
                  }/>
                <Route path='product' element={
                  <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                    <ProductPage/>
                  </Suspense>
                  }/>
                <Route path='transaction' element={
                  <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                    <TransactionPage/>
                  </Suspense>
                  }/>
                <Route path='dashboard' element={
                  <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                    <DashboardPage/>
                  </Suspense>
                  }/>
                <Route path='client' element={
                  <Suspense fallback={<div className='text-center'>Chargement...</div>}>
                    <ClientPage/>
                  </Suspense>
                  }/>
              </Route>
            </Route>
       </Routes>
  );
}

export default App;
