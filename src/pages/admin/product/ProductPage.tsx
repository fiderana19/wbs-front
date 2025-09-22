import { FunctionComponent, useState } from "react";
import { Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  CreateProductInterface,
  Product,
} from "../../../interfaces/Product.interface";
import { useGetAllProduct } from "../../../hooks/useGetAllProduct";
import { useDeleteProduct } from "../../../hooks/useDeleteProduct";
import { usePatchProduct } from "../../../hooks/usePatchProduct";
import { Controller, useForm } from "react-hook-form";
import { handleNumberKeyPress } from "../../../utils/keypress";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDark } from "../../../context/DarkThemeContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EditProductValidation } from "@/validation/edit-product.validation";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { AddProductValidation } from "@/validation/create-product.validation";
import { usePostProduct } from "@/hooks/usePostProduct";

const ProductPage: FunctionComponent = () => {
  const {
    control,
    handleSubmit: edit,
    formState: { errors },
    register,
    reset: resetEditFields,
  } = useForm<Product>({
    resolver: yupResolver(EditProductValidation),
  });
  const [isAddProductModalOpen, setIsAddProductModalOpen] =
    useState<boolean>(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const { isDark } = useDark();
  const {
    control: create_control,
    handleSubmit: submit,
    formState: { errors: create_errors },
  } = useForm<CreateProductInterface>({
    resolver: yupResolver(AddProductValidation),
  });
  const { data: products, isLoading, refetch } = useGetAllProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct({
    action: () => {
      refetch();
    },
  });
  const { mutateAsync: patchProduct } = usePatchProduct({
    action: () => {
      refetch();
    },
  });
  const { mutateAsync: createProduct } = usePostProduct({
    action: () => {
      refetch();
    },
  });

  const handleSubmit = async (data: CreateProductInterface) => {
    await createProduct(data);
    setIsAddProductModalOpen(false);
  };

  function EditProduct(item: Product) {
    setSelectedItem(item);
    setIsEditProductModalOpen(true);
  }

  const handleSubmitEdit = async (data: Product) => {
    await patchProduct(data);
    setIsEditProductModalOpen(false);
    resetEditFields();
  };

  const handleDeleteConfirm = (item: Product) => {
    deleteProduct(item._id);
  };

  return (
    <div className={`pb-5 pt-24 ${isDark && "dark-container min-h-screen"}`}>
      <div className="md:px-32 sm:px-10 px-4">
        <div className="flex justify-between">
          <div className="text-xl font-bold font-lato">LISTE DES PRODUITS</div>
          <Button onClick={() => setIsAddProductModalOpen(true)}>
            <div className="sm:hidden block">
              <PlusOutlined />
            </div>
            <div className="sm:block hidden"> AJOUTER </div>
          </Button>
        </div>
        <Modal
          title="AJOUTER UN PRODUIT"
          open={isAddProductModalOpen}
          onCancel={() => setIsAddProductModalOpen(false)}
          footer={null}
        >
          <form className="w-2/3 my-7 mx-auto" onSubmit={submit(handleSubmit)}>
            <Label htmlFor="libelle" className="mt-2 mb-1">
              Libelle
            </Label>
            <Controller
              control={create_control}
              name="libelle"
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  className={
                    create_errors?.libelle &&
                    "text-red-500 border-red-500 rounded"
                  }
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {create_errors?.libelle && (
              <div className="text-xs text-red-500 text-left">
                {create_errors.libelle.message}
              </div>
            )}
            <Label htmlFor="description" className="mt-2 mb-1">
              Description
            </Label>
            <Controller
              control={create_control}
              name="description"
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  className={
                    create_errors?.description &&
                    "text-red-500 border-red-500 rounded"
                  }
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            {create_errors?.description && (
              <div className="text-xs text-red-500 text-left">
                {create_errors.description.message}
              </div>
            )}
            <Label htmlFor="pu" className="mt-2 mb-1">
              Prix unitaire
            </Label>
            <Controller
              control={create_control}
              name="pu"
              render={({ field: { value, onBlur, onChange } }) => (
                <Input
                  className={
                    create_errors?.pu && "text-red-500 border-red-500 rounded"
                  }
                  onKeyPress={handleNumberKeyPress}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
            {create_errors?.pu && (
              <div className="text-xs text-red-500 text-left">
                {create_errors.pu.message}
              </div>
            )}
            <div className="flex justify-center my-3">
              <Button variant={"success"} type="submit">
                AJOUTER
              </Button>
            </div>
          </form>
        </Modal>
        <div className="my-7 grid gap-2 justify-center grid-cols-customized">
          {isLoading ? (
            <div className="text-center my-10">
              <LoadingOutlined className="text-3xl" />
              <div>Chargement...</div>
            </div>
          ) : (
            products &&
            products.map((product: any) => {
              return (
                <Card
                  key={product._id}
                  className={isDark ? " bg-gray-600 border-gray-800" : ""}
                >
                  <div className="w-48 m-auto">
                    <CardHeader>
                      <ShoppingCartOutlined className="text-7xl mx-auto" />
                    </CardHeader>
                    <CardContent
                      className={`py-3 ${isDark ? "text-white" : ""}`}
                    >
                      <div className="text-base text-primary font-bold">
                        {product.libelle}
                      </div>
                      <div className="text-xs">{product.description}</div>
                      <div className="text-sm">
                        <span
                          className={
                            isDark
                              ? "text-gray-100 font-latobold"
                              : "text-gray-500 font-semibold"
                          }
                        >
                          {" "}
                          Unité:{" "}
                        </span>
                        {product.pu.toLocaleString("fr-FR")}{" "}
                        <span className="text-xs">MGA</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-1">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={"destructive"} size={"sm"}>
                            {" "}
                            <DeleteOutlined />{" "}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Suppression d'un produit
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Voulez-vous vraiment supprimer le produit{" "}
                              {product.libelle} ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                              variant={"destructive"}
                              onClick={() => handleDeleteConfirm(product)}
                            >
                              Confirmer
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Button
                        variant={"default"}
                        size={"sm"}
                        onClick={() => EditProduct(product)}
                      >
                        {" "}
                        <EditOutlined />{" "}
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              );
            })
          )}
        </div>
        <Modal
          title="MODIFIER PRODUIT"
          open={isEditProductModalOpen}
          onCancel={() => {
            setIsEditProductModalOpen(false);
            resetEditFields();
          }}
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
                <label htmlFor="libelle">Libelle : </label> <br />
                <Controller
                  control={control}
                  name="libelle"
                  defaultValue={selectedItem?.libelle}
                  render={({ field: { value, onBlur, onChange } }) => (
                    <Input
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      className={
                        errors.libelle
                          ? "border border-red-500 rounded text-red-500"
                          : ""
                      }
                    />
                  )}
                />
                {errors.libelle && (
                  <div className="text-xs text-red-500 text-left">
                    {errors.libelle.message}
                  </div>
                )}
                <label htmlFor="description">Description : </label> <br />
                <Controller
                  control={control}
                  name="description"
                  defaultValue={selectedItem.description}
                  render={({ field: { value, onBlur, onChange } }) => (
                    <Input
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      className={
                        errors.description
                          ? "border border-red-500 rounded text-red-500"
                          : ""
                      }
                    />
                  )}
                />
                {errors.description && (
                  <div className="text-xs text-red-500 text-left">
                    {errors.description.message}
                  </div>
                )}
                <label htmlFor="pu">Prix unitaire : </label> <br />
                <Controller
                  control={control}
                  name="pu"
                  defaultValue={selectedItem.pu}
                  render={({ field: { value, onBlur, onChange } }) => (
                    <Input
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      onKeyPress={handleNumberKeyPress}
                      className={
                        errors.pu
                          ? "border border-red-500 rounded text-red-500"
                          : ""
                      }
                    />
                  )}
                />
                {errors.pu && (
                  <div className="text-xs text-red-500 text-left">
                    {errors.pu.message}
                  </div>
                )}
                <div className="flex justify-center my-3">
                  <Button variant={"primary"} type="submit">
                    MODIFIER
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProductPage;
