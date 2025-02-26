import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { patchProduct } from "../api/Product";

export const usePatchProduct = () => {
    const token  = localStorage.getItem("token");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: any) => patchProduct(token, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
                exact: true,
            });
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Produit modifié !",
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