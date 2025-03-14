import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { getTransactionBetweenDates } from "../api/Transaction";

export const useGetTransactionBetweenDates = () => {
    const token = localStorage.getItem('token');

    const { mutateAsync, data } = useMutation({
        mutationFn: (data: any) => getTransactionBetweenDates(token, data),
        onError: (error: AxiosError) => {
            showToast({
                toastProps: {
                    type: TOAST_TYPE.ERROR,
                    message: error?.message
                }
            })
        }
    })
    
    return {
        mutateAsync,
        data: data?.data,
    };
}