import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";
import { getClientTotal } from "../api/Dashboard";

export const useGetClientTotal = () => {
    const token = localStorage.getItem('token');

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['client_total'],
        queryFn: () => getClientTotal(token),
        staleTime: Infinity
    })

    useEffect(() => {
        if(error) {
            showToast({
                toastProps: {
                    message: "Erreur lors de la recuperation de total des clients pour la chart !",
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