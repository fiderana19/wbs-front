import { useQuery } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { getTransactionBetweenDates } from "../api/Transaction";
import { useEffect } from "react";
import { QueryCacheKey } from "@/api/queryCacheKey";
import { TransactionSearch } from "@/interfaces/Transaction.interface";

export const useGetTransactionBetweenDates = ({dates} : {dates: TransactionSearch}) => {
    const { data, isLoading, error, isError } = useQuery({
        queryKey: [QueryCacheKey.TRANSACTIONS, dates],
        queryFn: () => getTransactionBetweenDates(dates),
        enabled: dates !== null
    })

    useEffect(() => {
        if(isError) {
            showToast({
                type: TOAST_TYPE.ERROR,
                message: "Erreur lors de la récuperation des transactions !"
            })
        }
    }, [error])

    return {
        isLoading,
        data: data?.data,
    }
}