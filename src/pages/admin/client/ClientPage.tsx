import { FunctionComponent, useState } from "react";
import { Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Client } from "../../../interfaces/Client.interface";
import { okDeleteStyle } from "../../../constants/ModalStyle";
import { useGetAllClient } from "../../../hooks/useGetAllClient";
import { useDeleteClient } from "../../../hooks/useDeleteClient";
import { usePatchClient } from "../../../hooks/usePatchClient";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleNumberKeyPress } from "../../../utils/keypress";
import { useDark } from "../../../context/DarkThemeContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EditClientValidation } from "@/validation/edit-client.validation";

const ClientPage: FunctionComponent = () => {
  const {
    control,
    formState: { errors },
    handleSubmit: edit,
    register,
  } = useForm<Client>({
    resolver: yupResolver(EditClientValidation),
  });
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Client | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Client | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { data: clients, isLoading, refetch } = useGetAllClient();
  const { mutateAsync: deleteClient, isPending: deleteLoading } =
    useDeleteClient({
      action: () => {
        refetch();
      },
    });
  const { mutateAsync: patchClient, isPending: editLoading } = usePatchClient({
    action: () => {
      refetch();
    },
  });
  const { isDark } = useDark();

  const showDeleteConfirmation = async (item: Client) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      deleteClient(itemToDelete._id);
      setIsDeleteModalVisible(false);
    }
  };

  function EditClient(item: Client) {
    setSelectedItem(item);
    setIsEditClientModalOpen(true);
  }

  const handleSubmitEdit = async (data: Client) => {
    await patchClient(data);
    setIsEditClientModalOpen(false);
  };

  return (
    <div className={`pb-5 pt-24 ${isDark && "dark-container min-h-screen"}`}>
      <div className="md:px-32 sm:px-10 px-4">
        <div className="flex justify-between">
          <div className="text-xl font-bold font-lato">LISTE DES CLIENTS</div>
          <Link to="/admin/addforms">
            <Button variant={"default"}>
              <div className="sm:hidden block">
                <PlusOutlined />
              </div>
              <div className="sm:block hidden"> AJOUTER </div>
            </Button>
          </Link>
        </div>
        <div className="my-7 grid gap-2 justify-center grid-cols-customized">
          {isLoading ? (
            <div className="text-center my-10">
              <LoadingOutlined className="text-3xl" />
              <div>Chargement...</div>
            </div>
          ) : (
            clients &&
            clients.map((client: any) => {
              return (
                <Card
                  key={client._id}
                  className={`h-52 overflow-hidden ${isDark && "bg-gray-600 border-gray-800"}`}
                >
                  <div className="w-40 text-center mx-auto transition-all duration-500 ease-in-out hover:transform hover:-translate-y-12">
                    <CardHeader>
                      <UserOutlined className="text-7xl mx-auto" />
                    </CardHeader>
                    <CardContent className={`py-3 ${isDark && "text-white"}`}>
                      <div className="text-base text-primary font-bold">
                        {client.nom_client}
                      </div>
                      <div className="text-xs">{client.adresse_client}</div>
                      <div className="text-sm">{client.mail_client}</div>
                      <div className="text-sm">{client.telephone_client}</div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-1">
                      <Button
                        variant={"default"}
                        size={"sm"}
                        onClick={() => EditClient(client)}
                      >
                        {" "}
                        <EditOutlined />{" "}
                      </Button>
                      <Button
                        variant={"destructive"}
                        size={"sm"}
                        onClick={() => showDeleteConfirmation(client)}
                      >
                        {" "}
                        <DeleteOutlined />{" "}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              );
            })
          )}
          <Modal
            title="MODIFIER CLIENT"
            open={isEditClientModalOpen}
            onCancel={() => setIsEditClientModalOpen(false)}
            footer={null}
          >
            {selectedItem && (
              <div>
                <form
                  className="w-2/3 my-7 mx-auto"
                  onSubmit={edit(handleSubmitEdit)}
                >
                  <input
                    className="hidden"
                    defaultValue={selectedItem._id}
                    {...register("_id")}
                  />
                  <label htmlFor="nom_client">Nom : </label> <br />
                  <Controller
                    control={control}
                    name="nom_client"
                    defaultValue={selectedItem.nom_client}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        value={value}
                        className={
                          errors.nom_client &&
                          "border border-red-500 rounded text-red-500"
                        }
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.nom_client && (
                    <div className="text-xs text-red-500 text-left">
                      {errors.nom_client.message}
                    </div>
                  )}
                  <label htmlFor="adresse_client">Adresse : </label> <br />
                  <Controller
                    control={control}
                    name="adresse_client"
                    defaultValue={selectedItem.adresse_client}
                    render={({ field: { value, onBlur, onChange } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={
                          errors.adresse_client &&
                          "border border-red-500 rounded text-red-500"
                        }
                      />
                    )}
                  />
                  {errors.adresse_client && (
                    <div className="text-xs text-red-500 text-left">
                      {errors.adresse_client.message}
                    </div>
                  )}
                  <label htmlFor="mail_client">Mail : </label> <br />
                  <Controller
                    control={control}
                    name="mail_client"
                    defaultValue={selectedItem.mail_client}
                    render={({ field: { value, onBlur, onChange } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className={
                          errors.mail_client &&
                          "border border-red-500 rounded text-red-500"
                        }
                      />
                    )}
                  />
                  {errors.mail_client && (
                    <div className="text-xs text-red-500 text-left">
                      {errors.mail_client.message}
                    </div>
                  )}
                  <label htmlFor="telephone_client">Telephone : </label> <br />
                  <Controller
                    control={control}
                    name="telephone_client"
                    defaultValue={selectedItem.telephone_client}
                    render={({ field: { value, onBlur, onChange } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        onKeyPress={handleNumberKeyPress}
                        className={
                          errors.telephone_client &&
                          "border border-red-500 rounded text-red-500"
                        }
                      />
                    )}
                  />
                  {errors.telephone_client && (
                    <div className="text-xs text-red-500 text-left">
                      {errors.telephone_client.message}
                    </div>
                  )}
                  <div className="flex justify-center my-3">
                    <Button type="submit" variant={"primary"}>
                      {editLoading && <LoadingOutlined />}
                      MODIFIER
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Modal>
          <Modal
            title="Suppression"
            open={isDeleteModalVisible}
            onOk={handleDeleteConfirm}
            onCancel={() => setIsDeleteModalVisible(false)}
            okText="Supprimer"
            okButtonProps={{ style: okDeleteStyle }}
            cancelText="Annuler"
          >
            <div className="text-red-900">
              <WarningOutlined className="mr-2" />
              Êtes-vous sûr de vouloir supprimer ce client ?
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
