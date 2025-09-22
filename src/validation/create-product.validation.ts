import * as yup from "yup";

export const AddProductValidation = yup.object({
  libelle: yup.string().required("Le libelle est requis! "),
  description: yup.string().required("La description du produit est requise !"),
  pu: yup.number().required("Le prix unitaire est requis !"),
});
