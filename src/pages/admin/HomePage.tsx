import dayjs from "dayjs";
import { FunctionComponent, lazy } from "react";
import { Link } from "react-router-dom";
import Typewriter from "../../components/Typewritter";
import {
  DollarCircleOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useGetLastTransation } from "../../hooks/useGetLastTransaction";
import { useDark } from "../../context/DarkThemeContext";
import { Button } from "@/components/ui/button";
import { useGetClientTotal } from "@/hooks/useGetClientTotal";
import { useGetProductTotal } from "@/hooks/useGetProductTotal";
import { useGetTransactionTotal } from "@/hooks/useGetTransactionTotal";
const DashboardCard = lazy(
  () => import("../../components/dashboard/DashboardCard"),
);

const HomePage: FunctionComponent = () => {
  const { data: transactions, isError, isLoading } = useGetLastTransation();
  const { isDark } = useDark();
  const { data: totalTransaction } = useGetTransactionTotal();
  const { data: totalProduct } = useGetProductTotal();
  const { data: totalClient } = useGetClientTotal();

  const text = "BIENVENUE SUR NOTRE PLATEFORME DE GESTION DE CAISSE";

  return (
    <div
      className={`lg:px-32 sm:px-10 px-4 pb-5 pt-24 sm:h-screen h-full ${isDark ? "dark-container" : ""}`}
    >
      <div className="block sm:justify-between sm:flex h-full">
        <div className="flex flex-col sm:py-0 py-32 justify-center w-full sm:w-1/2">
          <div className="sm:text-3xl text-2xl mt-30 font-bold font-lato">
            <Typewriter text={text} />
          </div>
          <div className="my-4 flex justify-center">
            <Link to="/admin/addforms">
              <Button variant={"outline"}>AJOUTER TRANSACTION</Button>
            </Link>
          </div>
          <div className="flex gap-4 mt-20">
            <DashboardCard title="Clients" value={totalClient}>
              <UserOutlined
                className="p-2 w-max rounded-full text-green-900 text-2xl"
                style={{ backgroundColor: "rgba(0,255,0,.5)" }}
              />
            </DashboardCard>
            <DashboardCard title="Produits" value={totalProduct}>
              <ShoppingCartOutlined
                className="p-2 rounded-full text-red-900 text-2xl"
                style={{ backgroundColor: "rgba(255,0,0,.5)" }}
              />
            </DashboardCard>
            <DashboardCard title="Transactions" value={totalTransaction}>
              <DollarCircleOutlined
                className="p-2 rounded-full text-blue-900 text-2xl"
                style={{ backgroundColor: "rgba(0,0,0,.25)" }}
              />
            </DashboardCard>
          </div>
        </div>
        <div className={`h-max ${isDark ? "bg-gray-600" : "bg-gray-300"}`}>
          <div className="px-4 py-4 bg-gray-900 text-white font-bold font-lato">
            DERNIERES TRANSACTIONS
          </div>
          <div className="px-2 py-2">
            <div>
              {isLoading && (
                <div className="text-center my-10">
                  <LoadingOutlined className="text-3xl" />
                  <div>Chargement...</div>
                </div>
              )}
            </div>
            <div>
              {isError && (
                <div className="text-center my-10 w-full">
                  <div>
                    Un erreur est survenu lors de la récuperation des
                    transactions
                  </div>
                </div>
              )}
            </div>
            {transactions?.map((transaction: any) => {
              return (
                <div
                  className={`my-1 px-2 py-1 ${isDark ? "dark-container" : "bg-gray-100 text-black"}`}
                >
                  <div className=" text-xs">
                    {dayjs(transaction.date_transaction).format(
                      "DD-MM-YYYY HH:mm",
                    )}
                  </div>
                  <div className="text-xs"> Ref : {transaction.ref}</div>
                  <div className="font-bold font-sans">
                    {transaction.nom_client}
                  </div>
                  <div className="text-right">
                    {transaction.montant_transaction.toLocaleString("fr-FR")}
                    <span className="text-xs ml-1">MGA</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-2 py-2 bg-gray-600 text-right">
            <Link to="/admin/page/transaction">
              <Button variant={"secondary"} size={"sm"}>
                Voir tout les transactions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
