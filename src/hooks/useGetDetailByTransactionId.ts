import { useQuery } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { getDetailByTransactionId } from "../api/Detail";
import { useEffect } from "react";
import { QueryCacheKey } from "@/api/queryCacheKey";

export const useGetDetailByTransactionId = ({id} : {id : string}) => {
    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: [QueryCacheKey.DETAILS , id],
        queryFn: () => getDetailByTransactionId(id),
        enabled : id !== ''
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
        isLoading,
        refetch
    }
}