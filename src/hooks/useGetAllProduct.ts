import { useQuery } from "@tanstack/react-query"
import { getAllProduct } from "../api/Product"
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";
import { QueryCacheKey } from "@/api/queryCacheKey";

export const useGetAllProduct = () => {
    const { data, error, isError, isLoading , refetch} = useQuery({
        queryKey: [QueryCacheKey.GET_ALL_PRODUCTS],
        queryFn: () => getAllProduct(),
        staleTime: Infinity
    })

    useEffect(() => {
        if(error) {
            showToast({
                toastProps: {
                    message: "Erreur lors de la recuperation des produits !",
                    type: TOAST_TYPE.ERROR,
                }
            })
        }
    },[error])

    return {
        data: data?.data,
        error,
        isError,
        refetch,
        isLoading
    }
}