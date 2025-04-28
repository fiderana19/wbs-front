import * as yup from 'yup';

export const AddDetailValidation = yup.object({
    transaction: yup.string().required("Veuillez selectionner la transaction !"),
    product: yup.string().required("Veuillez selectionner le produit !"),
    quantite: yup.string().required("Veuillez donner la quantité !"),
    remise: yup.string().required("Veuillez ecrire la remise !")
})