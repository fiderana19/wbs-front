import * as yup from 'yup';

export const EditTrnsactionValidation = yup.object({
    _id: yup.string().required(),
    date_transaction: yup.string().required("Veuillez selectionner une date !")
})