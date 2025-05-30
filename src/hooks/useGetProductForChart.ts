import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";
import { getProductForChart } from "../api/Dashboard";
import { QueryCacheKey } from "@/api/queryCacheKey";

export const useGetProductForChart = () => {
    const { data, isError, error, isLoading } = useQuery({
        queryKey: [QueryCacheKey.PRODUCT_FOR_CHART],
        queryFn: () => getProductForChart(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(error) {
            showToast({
                message: "Erreur lors de la recuperation des produits pour la chart !",
                type: TOAST_TYPE.ERROR,
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