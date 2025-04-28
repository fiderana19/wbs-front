import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { AxiosError } from "axios";
import { HttpStatus } from "../constants/Http_status";
import { postDetail } from "../api/Detail";

export const usePostDetail = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (mutateData: any) => postDetail(mutateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['details'],
                exact: true,
            });
            showToast({toastProps: {
                type: TOAST_TYPE.SUCCESS,
                message: "Detail de transaction ajouté avec succés !",
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