import * as yup from "yup";

export const AddTransactionValidation = yup.object({
  client: yup.string().required("Veuillez selectionner un client !"),
  date_transaction: yup
    .date()
    .required("Veuillez entrer la date de la transaction ! "),
});
