import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postClient } from "../api/Client";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";

export const usePostClient = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (mutateData: any) => postClient(mutateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['clients'],
                exact: true,
            });
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Client ajouté avec succés !",
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