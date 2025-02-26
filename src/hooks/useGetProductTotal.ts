import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";
import { getProductTotal } from "../api/Dashboard";

export const useGetProductTotal = () => {
    const token = localStorage.getItem('token');

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['product_total'],
        queryFn: () => getProductTotal(token),
        staleTime: Infinity
    })

    useEffect(() => {
        if(error) {
            showToast({
                toastProps: {
                    message: "Erreur lors de la recuperation de total des produits pour la chart !",
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