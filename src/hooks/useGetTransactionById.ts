import { useQuery } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { getTransactionById } from "../api/Transaction";
import { useEffect } from "react";
import { QueryCacheKey } from "@/api/queryCacheKey";

export const useGetTransactionById = ({id} : {id: string}) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [QueryCacheKey.TRANSACTIONS, id],
        queryFn: () => getTransactionById(id),
        enabled: id !== ''
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation de la transaction !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
    }
}