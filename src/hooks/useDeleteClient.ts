import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { deleteClientById } from "../api/Client";

export const useDeleteClient = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (id: string) => deleteClientById(id),
        onSuccess: () => {
            if(action) {
                action();
            }
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Client supprimé !",
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