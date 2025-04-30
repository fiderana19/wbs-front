import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { postTransaction } from "../api/Transaction";

export const usePostTransaction = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (mutateData: any) => postTransaction(mutateData),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Transaction ajoutée avec succés !",
            });
        },
        onError: (error: AxiosError) => {
            if (error?.status === HttpStatus.FORBIDDEN) {
                showToast({
                    type: TOAST_TYPE.ERROR,
                    message: error.message
                })
            }
        },
    })

    return mutation;
}