import { Select } from "antd";
import { FunctionComponent, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { CreateDetailInterface } from "../../../interfaces/Detail.interface";
import { usePostDetail } from "../../../hooks/usePostDetail";
import { useGetAllProduct } from "../../../hooks/useGetAllProduct";
import { useGetAllTransaction } from "../../../hooks/useGetAllTransaction";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDark } from "../../../context/DarkThemeContext";
import { AddDetailValidation } from "@/validation/create-detail.validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleNumberKeyPress } from "@/utils/keypress";
import { getTransactionForFacture } from "@/api/Transaction";
import { Document, Page, PDFViewer, Text, View } from "@react-pdf/renderer";
import { footer, logo, styles } from "@/utils/pdf_generation";
import { useGetDetailByTransactionId } from "@/hooks/useGetDetailByTransactionId";

interface StepsPropsType {
  handlePrev: () => void;
}

const { Option } = Select;

const AddDetailPage: FunctionComponent<StepsPropsType> = ({ handlePrev }) => {
  const {
    control,
    handleSubmit: submit,
    formState,
  } = useForm<CreateDetailInterface>({
    resolver: yupResolver(AddDetailValidation),
  });
  const { errors } = formState;
  const { mutateAsync } = usePostDetail({
    action() {
      refetchTransaction();
    },
  });
  const [selectedTransId, setSelectedTransId] = useState("");
  const { data: details, refetch } = useGetDetailByTransactionId(
    selectedTransId ? selectedTransId : "",
  );
  const [pdfData, setPdfData] = useState<null | any>(null);
  const { data: products } = useGetAllProduct();
  const { data: transactions, refetch: refetchTransaction } =
    useGetAllTransaction();
  const { isDark } = useDark();

  const handleSubmit = async (data: CreateDetailInterface) => {
    setSelectedTransId(data?.transaction);
    refetch();
    await mutateAsync(data);
  };

  const generatePDF = async (selectedTransId: string, details: any) => {
    refetch();
    const res = await getTransactionForFacture(selectedTransId);
    const transaction = res.data[0];
    //the pdf content
    const pdfDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.head}>
              <View>
                <Text style={logo.logo}>WBS</Text>
                <Text style={logo.abrev}>World Business Solution</Text>
                <Text style={logo.abrev}>Tulear 601</Text>
              </View>
              <View>
                <Text style={styles.header}>FACTURE </Text>
                <Text style={styles.ref}>Ref : {transaction.ref}</Text>
                <Text style={styles.ref}>
                  Tulear , le{" "}
                  {dayjs(transaction.date_transaction).format(
                    "DD-MM-YYYY HH:mm",
                  )}
                </Text>
              </View>
            </View>

            <Text style={styles.hr}></Text>
            <View style={logo.client}>
              <Text style={styles.header}>Doit : {transaction.nom_client}</Text>
              <Text style={styles.header}>
                Adresse : {transaction.adresse_client}
              </Text>
              <Text style={styles.header}>
                Mail : {transaction.mail_client}
              </Text>
              <Text style={styles.header}>
                Telephone : {transaction.telephone_client}
              </Text>
            </View>
            <View style={styles.table}>
              <View style={styles.rowhead}>
                <View style={styles.cell}>
                  <Text>Quantite </Text>
                </View>
                <View style={styles.cell}>
                  <Text>Produit</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Montant brut</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Remise</Text>
                </View>
                <View style={styles.cell}>
                  <Text>Montant total</Text>
                </View>
              </View>
              {details.map((detail: any, index: any) => (
                <View style={styles.row} key={index}>
                  <View style={styles.cell}>
                    <Text>{detail.quantite}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{detail.product}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>
                      {detail.montant_brut} <Text style={styles.unit}>MGA</Text>
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>
                      {detail.remise} <Text style={styles.unit}>%</Text>
                    </Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>
                      {detail.montant_total}{" "}
                      <Text style={styles.unit}>MGA</Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.totalchamp}>
              <Text style={styles.totaltext}>Total</Text>
              <Text style={styles.totalchampamount}>
                {transaction.montant_transaction}{" "}
                <Text style={styles.unit}>MGA</Text>
              </Text>
            </View>
            <View style={footer.contain}>
              <View>
                <Text>Le client reçu conforme</Text>
              </View>
              <View>
                <Text>Le vendeur</Text>
              </View>
            </View>
            <Text style={styles.hr}></Text>
            <Text style={logo.nb}>
              NB: Les marchandises restent la propriété du vendeur jusqu'au
              paiement intégral de leur prix
            </Text>
          </View>
        </Page>
      </Document>
    );

    return pdfDocument;
  };

  const finishSubmit = async () => {
    generatePDF(selectedTransId, details).then((pdf) => {
      setPdfData(pdf);
    });
  };

  return (
    <div
      className={`py-16 justify-center ${isDark ? "dark-container min-h-screen h-full" : ""}`}
    >
      <button
        onClick={handlePrev}
        className="fixed top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <ArrowLeftOutlined /> Retour
      </button>
      <div className="text-center">
        <div className="text-2xl font-bold">DETAIL DU TRANSACTION</div>
        <form
          className="w-60 mx-auto my-7 text-left"
          onSubmit={submit(handleSubmit)}
        >
          <label htmlFor="transaction">Transaction : </label>
          <br />
          <Controller
            control={control}
            name="transaction"
            render={({ field: { value, onBlur, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full my-1"
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="">Sélectionnez une transaction</Option>
                {transactions &&
                  transactions.map((tr: any) => {
                    return (
                      <Option key={tr._id} value={tr._id}>
                        {`${tr.nom_client} ${dayjs(tr.date_transaction).format("DD-MM-YYYY HH:mm").toString()}`}
                      </Option>
                    );
                  })}
              </Select>
            )}
          />
          <label htmlFor="product">Produit : </label>
          <br />
          <Controller
            control={control}
            name="product"
            render={({ field: { value, onBlur, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full my-1"
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="">Sélectionnez un produit</Option>
                {products &&
                  products.map((pr: any) => {
                    return (
                      <Option key={pr._id} value={pr._id}>
                        {pr.libelle}
                      </Option>
                    );
                  })}
              </Select>
            )}
          />
          <label htmlFor="quantite">Quantité : </label>
          <br />
          <Controller
            control={control}
            name="quantite"
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                onKeyPress={handleNumberKeyPress}
                className={`my-1 ${errors?.quantite ? "border border-red-500" : ""}`}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors?.quantite && (
            <div className="text-red-500 text-xs">
              {errors.quantite.message}
            </div>
          )}
          <label htmlFor="remise">Remise : </label>
          <br />
          <Controller
            control={control}
            name="remise"
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                onKeyPress={handleNumberKeyPress}
                className="my-1"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <div className="flex justify-center my-3">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-sm  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              AJOUTER
            </Button>
          </div>
        </form>
        <div className="">
          <Button variant={"success"} onClick={() => finishSubmit()}>
            Valider la transaction
          </Button>
        </div>
      </div>
      <div className="my-10 mx-4 md:mx-auto md:w-1/2">
        {pdfData && (
          <PDFViewer width="100%" height="500">
            {pdfData}
          </PDFViewer>
        )}
      </div>
    </div>
  );
};

export default AddDetailPage;
