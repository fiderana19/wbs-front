import { useMutation } from "@tanstack/react-query";
import { postClient } from "../api/Client";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";

export const usePostClient = ({ action }: { action?: () => void }) => {
  const mutation = useMutation({
    mutationFn: (mutateData: any) => postClient(mutateData),
    onSuccess: () => {
      if (action) {
        action();
      }
      showToast({
        type: TOAST_TYPE.SUCCESS,
        message: "Client ajouté avec succés !",
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
