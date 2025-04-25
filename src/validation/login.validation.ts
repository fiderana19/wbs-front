import * as yup from 'yup';

export const LoginValidation = yup.object({
    usrid: yup.string().required("L'Identifiant de l'utilisateur est requis !"),
    password: yup.string().required("Password vide !")
})