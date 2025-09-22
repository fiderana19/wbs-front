import * as yup from "yup";

export const SignupValidation = yup.object({
  username: yup.string().required("Username requis !"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit comprendre au moins 6 caracteres !")
    .required("Mot de passe requis !"),
});
