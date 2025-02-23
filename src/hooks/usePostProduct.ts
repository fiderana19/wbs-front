import { QueryClient, useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { postProduct } from "../api/Product";

export const usePostProduct = () => {
    const token  = localStorage.getItem("token");
    const queryClient = new QueryClient();

    const mutation = useMutation({
        mutationFn: (mutateData: any) => postProduct(token, mutateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
                exact: true,
            });
            queryClient.refetchQueries({
                queryKey: ['products']
            });
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Produit ajouté avec succés !",
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