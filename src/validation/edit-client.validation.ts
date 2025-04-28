import * as yup from 'yup';

export const EditClientValidation = yup.object({
    _id: yup.string().required("Le nom du client ne doit pas être vide !"),
    nom_client: yup.string().required("Le nom du client ne doit pas être vide !"),
    adresse_client: yup.string().required("L'adresse du client ne doit pas être vide !"),
    mail_client: yup.string().email("Email invalide !").required("Le mail du client ne doit pas être vide !"),
    telephone_client: yup.string().length(10, "Le numero de telephone doit comprendre 10 chiffres !").required("Le telephone du client ne doit pas être vide !"),
})