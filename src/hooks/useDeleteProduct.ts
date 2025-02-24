import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { deleteProductById } from "../api/Product";

export const useDeleteProduct = () => {
    const token  = localStorage.getItem("token");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteProductById(token, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
                exact: true,
            });
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