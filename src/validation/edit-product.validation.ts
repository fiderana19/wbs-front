import * as yup from 'yup';

export const EditProductValidation = yup.object({
  _id: yup.string().required(),
  libelle: yup.string().required("Le libelle ne doit pas être vide!"),
  description: yup.string().required("La description ne doit pas être vide !"),
  pu: yup.number().required("Le prix unitaire ne doit pas être vide !"),
  stock: yup.number().required("Le stock ne doit pas être vide !"),
})