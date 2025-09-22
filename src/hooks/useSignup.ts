import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { signupUser } from "@/api/Auth";

export const useSignup = () => {
  const mutation = useMutation({
    mutationFn: (mutateData: any) => signupUser(mutateData),
    onSuccess: () => {
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Inscription réussie !",
      });
    },
    onError: (error: AxiosError) => {
      if (
        error?.status === HttpStatus.FORBIDDEN ||
        error?.status === HttpStatus.UNAUTHORIZED
      ) {
        showToast({
          type: TOAST_TYPE.ERROR,
          message: error.message,
        });
      } else {
        showToast({
          type: TOAST_TYPE.ERROR,
          message: "Erreur",
        });
      }
    },
  });

  return mutation;
};
