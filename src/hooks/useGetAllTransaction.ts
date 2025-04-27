import { useQuery } from "@tanstack/react-query";
import { getAllTransaction } from "../api/Transaction";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";

export const useGetAllTransaction = () => {

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getAllTransaction(),
    })

    useEffect(() => {
        if(error) {
            showToast({
                toastProps: {
                    message: "Erreur lors de la recuperation des transactions !",
                    type: TOAST_TYPE.ERROR,
                }
            })
        }
    },[error])
    
    return {
        data: data?.data,
        isError,
        error,
        isLoading
    }
}