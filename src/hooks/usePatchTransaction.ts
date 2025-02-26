import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { patchTransaction } from "../api/Transaction";

export const usePatchTransaction = () => {
    const token  = localStorage.getItem("token");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: any) => patchTransaction(token, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['transactions'],
                exact: true,
            });
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Transaction modifiée !",
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