import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { getDetailByTransactionId } from "../api/Detail";

export const useGetDetailByTransactionId = () => {
    const token = localStorage.getItem('token');

    const { mutateAsync, data } = useMutation({
        mutationFn: (id: string) => getDetailByTransactionId(token, id),
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