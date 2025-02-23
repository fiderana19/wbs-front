import { QueryClient, useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { postTransaction } from "../api/Transaction";

export const usePostTransaction = () => {
    const token  = localStorage.getItem("token");
    const queryClient = new QueryClient();

    const mutation = useMutation({
        mutationFn: (mutateData: any) => postTransaction(token, mutateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['transactions'],
                exact: true,
            });
            queryClient.refetchQueries({
                queryKey: ['transactions']
            });
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Transaction ajoutée avec succés !",
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