import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { deleteTransactionById } from "../api/Transaction";

export const useDeleteTransaction = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (id: string) => deleteTransactionById(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Transaction supprimé !",
            }});
        },
        onError: (error: AxiosError) => {
            if (error?.status === HttpStatus.FORBIDDEN) {
                showToast({toastProps: {
                    type: TOAST_TYPE.ERROR,
                    message: error.message
                }})
            }
        },
    })

    return mutation;
}