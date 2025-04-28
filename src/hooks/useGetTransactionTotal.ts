import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";
import { getTransactionTotal } from "../api/Dashboard";

export const useGetTransactionTotal = () => {
    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['transaction_total'],
        queryFn: () => getTransactionTotal(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(error) {
            showToast({
                toastProps: {
                    message: "Erreur lors de la recuperation de total des transactions pour la chart !",
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