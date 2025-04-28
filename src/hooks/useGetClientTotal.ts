import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";
import { getClientTotal } from "../api/Dashboard";
import { QueryCacheKey } from "@/api/queryCacheKey";

export const useGetClientTotal = () => {
    const { data, isError, error, isLoading } = useQuery({
        queryKey: [QueryCacheKey.CLIENT_TOTAL],
        queryFn: () => getClientTotal(),
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