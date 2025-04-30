import { useMutation } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { patchClientById } from "../api/Client";

export const usePatchClient = ({action} : {action?: () => void}) => {
    const mutation = useMutation({
        mutationFn: (data: any) => patchClientById(data),
        onSuccess: () => {
            if(action) {
                action()
            }
            showToast({
                type: TOAST_TYPE.SUCCESS,
                message: "Client modifié !",
            });
        },
        onError: (error: AxiosError) => {
            if (error?.status === HttpStatus.FORBIDDEN) {
                showToast({
                    type: TOAST_TYPE.ERROR,
                    message: error.message
                })
            }
        },
    })

    return mutation;
}