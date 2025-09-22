import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { patchProduct } from "../api/Product";

export const usePatchProduct = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: any) => patchProduct(data),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Produit modifié !",
            });
        },
        onError: (error: AxiosError) => {
            if (error?.status === HttpStatus.FORBIDDEN || error?.status === HttpStatus.UNAUTHORIZED) {
                showToast({
                    type: TOAST_TYPE.ERROR,
                    message: error.message
                })
            } else {
                showToast({
                    type: TOAST_TYPE.ERROR,
                    message: "Erreur"
                })
            }
        },
    })

    return mutation;
}