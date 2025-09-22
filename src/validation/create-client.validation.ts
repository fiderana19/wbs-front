import * as yup from "yup";

export const AddClientValidation = yup.object({
  nom_client: yup.string().required("Le champ nom du client est requis! "),
  adresse_client: yup
    .string()
    .required("Le champ adresse du client est requis ! "),
  mail_client: yup
    .string()
    .email("Adresse email invalide !")
    .required("Le champ email du client requis !"),
  telephone_client: yup
    .string()
    .length(9, "Le numero de telephone doit etre à 9 carateres !")
    .required("Le champ telephone du client requis ! "),
});
