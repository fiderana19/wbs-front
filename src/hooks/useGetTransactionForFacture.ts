import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import {  getTransactionForFacture } from "../api/Transaction";

export const useGetTransactionForFacture = () => {
    const token = localStorage.getItem('token');

    const { mutateAsync, data } = useMutation({
        mutationFn: (id: string) => getTransactionForFacture(token, id),
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