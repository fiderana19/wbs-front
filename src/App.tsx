import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
const AppLayout = lazy(() => import("./layouts/AppLayout"));
const NotFound = lazy(() => import("./pages/admin/NotFound"));
const AddForms = lazy(() => import("./pages/admin/step/AddStep"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const ProductPage = lazy(() => import("./pages/admin/product/ProductPage"));
const TransactionPage = lazy(
  () => import("./pages/admin/transaction/TransactionPage"),
);
const ClientPage = lazy(() => import("./pages/admin/client/ClientPage"));
const HomePage = lazy(() => import("./pages/admin/HomePage"));
const MainPage = lazy(() => import("./pages/MainPage"));

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <MainPage />
          </Suspense>
        }
      />
      <Route
        path="unauthorized"
        element={
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <Unauthorized />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <NotFound />
          </Suspense>
        }
      />
      <Route
        path="/admin"
        element={
          <Suspense
            fallback={
              <div className="text-center my-10">
                <LoadingOutlined className="text-5xl" />
              </div>
            }
          >
            <ProtectedRoute />
          </Suspense>
        }
      >
        <Route
          path="addforms"
          element={
            <Suspense
              fallback={
                <div className="text-center my-10">
                  <LoadingOutlined className="text-5xl" />
                </div>
              }
            >
              <AddForms />
            </Suspense>
          }
        />
        <Route
          path="page"
          element={
            <Suspense
              fallback={
                <div className="text-center my-10">
                  <LoadingOutlined className="text-5xl" />
                </div>
              }
            >
              <AppLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense
                fallback={
                  <div className="text-center my-10">
                    <LoadingOutlined className="text-5xl" />
                  </div>
                }
              >
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="product"
            element={
              <Suspense
                fallback={
                  <div className="text-center my-10">
                    <LoadingOutlined className="text-5xl" />
                  </div>
                }
              >
                <ProductPage />
              </Suspense>
            }
          />
          <Route
            path="transaction"
            element={
              <Suspense
                fallback={
                  <div className="text-center my-10">
                    <LoadingOutlined className="text-5xl" />
                  </div>
                }
              >
                <TransactionPage />
              </Suspense>
            }
          />
          <Route
            path="client"
            element={
              <Suspense
                fallback={
                  <div className="text-center my-10">
                    <LoadingOutlined className="text-5xl" />
                  </div>
                }
              >
                <ClientPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
