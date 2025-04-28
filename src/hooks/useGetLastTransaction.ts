import { useQuery } from "@tanstack/react-query"
import { getLatestTransaction } from "../api/Transaction";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";
import { QueryCacheKey } from "@/api/queryCacheKey";

export const useGetLastTransation = () => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: [QueryCacheKey.LAST_TRANSACTIONS, QueryCacheKey.TRANSACTIONS],
        queryFn: () => getLatestTransaction(),
        staleTime: Infinity,
    })

    useEffect(() => {
        if(error) {
            showToast({
                toastProps: {
                    message: "Erreur lors de la recuperation des dernieres transactions !",
                    type: TOAST_TYPE.ERROR,
                }
            })
        }
    },[error])

    return {
        data: data?.data,
        isError,
        isLoading,
        error
    }
}