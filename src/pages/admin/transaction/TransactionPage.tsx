import { FunctionComponent, useState } from "react";
import { DatePicker, Modal } from "antd";
import { Link } from "react-router-dom";
import {
  WarningOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  TransactionForDisplay,
  TransactionSearch,
} from "../../../interfaces/Transaction.interface";
import { useGetAllTransaction } from "../../../hooks/useGetAllTransaction";
import { useDeleteTransaction } from "../../../hooks/useDeleteTransaction";
import { useGetDetailByTransactionId } from "../../../hooks/useGetDetailByTransactionId";
import { useGetTransactionById } from "../../../hooks/useGetTransactionById";
import { handleNumberKeyPress } from "../../../utils/keypress";
import { useDark } from "../../../context/DarkThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetTransactionBetweenDates } from "@/hooks/useGetTransactionBetweenDates";
import { showToast } from "@/utils/Toast";
import { TOAST_TYPE } from "@/constants/ToastType";

const TransactionPage: FunctionComponent = () => {
  const [transactionToGet, setTransactionToGet] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] =
    useState<TransactionForDisplay | null>(null);
  const [searchRef, setSearchRef] = useState("");
  const { data: transactions, isLoading, refetch } = useGetAllTransaction();
  const { mutateAsync: deleteTransaction } = useDeleteTransaction({
    action: () => {
      refetch();
    },
  });
  const [dateToSearch, setDateToSearch] = useState<any>(null);
  const { data: searchTransaction } = useGetTransactionBetweenDates({
    dates: dateToSearch || null,
  });
  const [selectedDateDebut, setSelectedDateDebut] =
    useState<dayjs.Dayjs | null>(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState<dayjs.Dayjs | null>(
    null,
  );
  const {
    data: details,
    isLoading: loadingDetails,
    refetch: refetchDet,
  } = useGetDetailByTransactionId(
    transactionToGet !== "" ? transactionToGet : "",
  );
  const { data: selectTransaction, isLoading: loadingTransactions } =
    useGetTransactionById({ id: transactionToGet || "" });

  const { isDark } = useDark();

  async function handleDeleteTransaction(itemId: string) {
    deleteTransaction(itemId);
  }

  const showDeleteConfirmation = (item: TransactionForDisplay) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleDeleteTransaction(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
  };

  const getDetail = async (itemId: string) => {
    setTransactionToGet(itemId);
    refetchDet();
    setIsModalDetailOpen(true);
  };

  const handleDateDebutChange = (date: any) => {
    setSelectedDateDebut(date);
  };
  const handleDateEndChange = (date: any) => {
    setSelectedDateEnd(date);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedDateDebut && selectedDateEnd) {
      const data: TransactionSearch = {
        start: selectedDateDebut.toISOString(),
        end: selectedDateEnd.toISOString(),
      };
      setDateToSearch(data);
      setIsSearching(true);
    } else {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Veuillez selectionner des dates !",
      });
    }
  };

  return (
    <div
      className={`pb-5 pt-24 lg:px-32 sm:px-10 px-4 ${isDark ? "dark-container" : ""}`}
    >
      <div className="transaction-body">
        <form
          onSubmit={handleSearch}
          className="flex justify-end gap-1 items-center"
        >
          <DatePicker
            onChange={handleDateDebutChange}
            format="YYYY-MM-DD HH:mm:ss"
            name="datedebut"
            placeholder="De..."
            className="sm:w-max w-1/3"
          />
          <span className="px-1">-</span>
          <DatePicker
            onChange={handleDateEndChange}
            format="YYYY-MM-DD HH:mm:ss"
            name="dateend"
            placeholder="à..."
            className="sm:w-max w-1/3"
          />
          <Button type="submit" variant={"secondary"}>
            <div className="flex">
              {" "}
              <SearchOutlined />{" "}
              <div className="sm:block hidden mx-2">Rechercher</div>{" "}
            </div>
          </Button>
        </form>
        {isSearching && searchTransaction && (
          <div>
            <div className="flex justify-between items-center my-4">
              <div className="text-xl font-lato">RESULTATS RECHERCHE</div>
              <Button className="mt-1" onClick={() => setIsSearching(false)}>
                <div className=" block">
                  <CloseOutlined />
                </div>
                <div className="sm:block hidden"> Fin du recherche</div>
              </Button>
            </div>
            {searchTransaction.length < 1 ? (
              <div className="text-center my-10">
                <CloseOutlined className="text-3xl" />
                <div>AUCUN RESULAT</div>
              </div>
            ) : (
              searchTransaction &&
              searchTransaction.map((transaction: any) => {
                return (
                  <div key={transaction._id}>
                    <div
                      className={`w-full border-l-4 border-l-gray-700 relative sm:pr-4 block sm:flex justify-between mt-1 sm:p-3 p-2 cursor-pointer hover:scale-[1.01] transition-all ${isDark ? "bg-gray-600" : "bg-gray-100"}`}
                    >
                      <div
                        className="sm:w-11/12 w-full"
                        onClick={() => getDetail(transaction._id)}
                      >
                        <div className="sm:flex text-xs">
                          <div className="flex">
                            <div className=""> Date :</div>
                            <div className="sm:ml-2">
                              {dayjs(transaction.date_transaction).format(
                                "DD-MM-YYYY HH:mm",
                              )}{" "}
                            </div>
                          </div>
                          <div className="mx-1 sm:block hidden"> - </div>
                          <div className=""> Ref : {transaction.ref}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm"> Nom du client : </div>
                          <div className="ml-2 font-semibold">
                            {" "}
                            {transaction.nom_client}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm"> Montant : </div>
                          <div className="ml-2">
                            {" "}
                            {transaction.montant_transaction.toLocaleString(
                              "fr-FR",
                            )}{" "}
                            <span className="text-xs">MGA</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col sm:justify-center sm:pr-0 sm:mt-0 mt-2 justify-end">
                        <Button
                          variant={"destructive"}
                          className="sm:my-1 flex"
                          size={"icon"}
                          onClick={() => showDeleteConfirmation(transaction)}
                        >
                          {" "}
                          <DeleteOutlined />{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div className="text-xs text-center my-2">
              -------- Fin du recherche ---------
            </div>
          </div>
        )}
        {!isSearching && (
          <div>
            <div className="my-4 font-bold text-2xl text-center font-lato">
              TRANSACTIONS
            </div>
            <div className="flex justify-between my-4">
              <Link to="/admin/addforms">
                <Button className="mt-1">
                  <div className="sm:hidden block">
                    <PlusOutlined />
                  </div>
                  <div className="sm:block hidden"> AJOUTER</div>
                </Button>
              </Link>
              <Input
                className="my-1 ml-1 w-52"
                placeholder="Saisir la ref..."
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                onKeyPress={handleNumberKeyPress}
              />
            </div>
            {isLoading && (
              <div className="text-center my-10">
                <LoadingOutlined className="text-3xl" />
                <div>Chargement...</div>
              </div>
            )}
            <div className="bg-transparent">
              {transactions &&
                transactions.map((transaction: any) => {
                  if (searchRef && !transaction.ref.includes(searchRef)) {
                    return null;
                  }
                  return (
                    <div key={transaction._id}>
                      <div
                        className={`w-full border-l-4 border-l-gray-700 relative sm:pr-4 block sm:flex justify-between mt-1 sm:p-3 p-2 cursor-pointer hover:scale-[1.01] transition-all ${isDark ? "bg-gray-600" : "bg-gray-100"}`}
                      >
                        <div
                          className="sm:w-11/12 w-full"
                          onClick={() => getDetail(transaction._id)}
                        >
                          <div className="sm:flex text-xs">
                            <div className="flex">
                              <div className=""> Date :</div>
                              <div className="sm:ml-2">
                                {dayjs(transaction.date_transaction).format(
                                  "DD-MM-YYYY HH:mm",
                                )}{" "}
                              </div>
                            </div>
                            <div className="mx-1 sm:block hidden"> - </div>
                            <div className=""> Ref : {transaction.ref}</div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm"> Nom du client : </div>
                            <div className="ml-2 font-semibold">
                              {" "}
                              {transaction.nom_client}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm"> Montant : </div>
                            <div className="ml-2">
                              {" "}
                              {transaction.montant_transaction.toLocaleString(
                                "fr-FR",
                              )}{" "}
                              <span className="text-xs">MGA</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex sm:flex-col sm:justify-center sm:pr-0 sm:mt-0 mt-2 justify-end">
                          <Button
                            variant={"destructive"}
                            className="sm:my-1 flex"
                            size={"icon"}
                            onClick={() => showDeleteConfirmation(transaction)}
                          >
                            {" "}
                            <DeleteOutlined />{" "}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <Modal
          title="Confirmation de suppression"
          open={isDeleteModalVisible}
          onOk={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalVisible(false)}
          okText="Confirmer"
          cancelText="Annuler"
          okButtonProps={{ style: { background: "red" } }}
        >
          <div>
            {itemToDelete && (
              <div className="mb-4">
                <div
                  className={`w-full border-l-4 border-l-gray-700 relative sm:pr-4 block justify-between mt-1 sm:p-3 p-2 ${isDark ? "bg-gray-600" : "bg-gray-100"}`}
                >
                  <div className="flex text-xs mb-2">
                    <div className="flex">
                      <div className=""> Date :</div>
                      <div className="sm:ml-2">
                        {dayjs(itemToDelete.date_transaction).format(
                          "DD-MM-YYYY HH:mm",
                        )}{" "}
                      </div>
                    </div>
                    <div className="mx-1 sm:block hidden"> - </div>
                    <div className=""> Ref : {itemToDelete.ref}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm"> Nom du client : </div>
                    <div className="ml-2 font-semibold">
                      {" "}
                      {itemToDelete.nom_client}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm"> Montant : </div>
                    <div className="ml-2">
                      {" "}
                      {itemToDelete.montant_transaction}{" "}
                      <span className="text-xs">MGA</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-red-900">
            <WarningOutlined className="mr-2" />
            Êtes-vous sûr de vouloir supprimer cette transaction ?
          </div>
        </Modal>
        {/* //Modal du detail transaction */}
        <Modal
          title="Detail de la transaction"
          open={isModalDetailOpen}
          onCancel={() => setIsModalDetailOpen(false)}
          footer={null}
        >
          {loadingTransactions && (
            <div className="text-center my-10">
              <LoadingOutlined className="text-3xl" />
              <div>Chargement...</div>
            </div>
          )}
          {selectTransaction && (
            <div>
              {selectTransaction &&
                selectTransaction.map((transaction: any) => {
                  return (
                    <div className="mb-4">
                      <div
                        className={`w-full border-l-4 border-l-gray-700 relative sm:pr-4 block justify-between mt-1 sm:p-3 p-2 ${isDark ? "bg-gray-600" : "bg-gray-100"}`}
                      >
                        <div className="flex text-xs mb-2">
                          <div className="flex">
                            <div className=""> Date :</div>
                            <div className="sm:ml-2">
                              {dayjs(transaction.date_transaction).format(
                                "DD-MM-YYYY HH:mm",
                              )}{" "}
                            </div>
                          </div>
                          <div className="mx-1 sm:block hidden"> - </div>
                          <div className=""> Ref : {transaction.ref}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm"> Nom du client : </div>
                          <div className="ml-2 font-semibold">
                            {" "}
                            {transaction.nom_client}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm"> Montant : </div>
                          <div className="ml-2">
                            {" "}
                            {transaction.montant_transaction}{" "}
                            <span className="text-xs">MGA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          <div className="w-full bg-seven mb-1">
            {loadingDetails && (
              <div className="text-center my-10">
                <LoadingOutlined className="text-3xl" />
                <div>Chargement...</div>
              </div>
            )}
            {details &&
              details.map((detail: any) => {
                return (
                  <div key={detail._id}>
                    <div className="px-5 py-1 border-b-2 border-gray-200">
                      <div className="flex text-xs">
                        <div className=""> Produit :</div>
                        <div className="ml-2"> {detail.product}</div>
                      </div>
                      <div className="flex">
                        <div className="text-sm"> Quantite: </div>
                        <div className="ml-2"> {detail.quantite}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm"> Montant brut : </div>
                        <div className="ml-2">
                          {" "}
                          {detail.montant_brut.toLocaleString("fr-FR")}{" "}
                          <span className="text-xs">MGA</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm"> Remise </div>
                        <div className="ml-2"> {detail.remise} % </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-sm"> Montant total : </div>
                        <div className="ml-2">
                          {" "}
                          {detail.montant_total.toLocaleString("fr-FR")}{" "}
                          <span className="text-xs">MGA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TransactionPage;
