import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { deleteProductById } from "../api/Product";

export const useDeleteProduct = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (id: string) => deleteProductById(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Produit supprimé !",
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