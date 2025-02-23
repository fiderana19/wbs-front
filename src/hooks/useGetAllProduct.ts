import { useQuery } from "@tanstack/react-query"
import { getAllProduct } from "../api/Product"
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";

export const useGetAllProduct = () => {
    const token = localStorage.getItem('token');

    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => getAllProduct(token),
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
        isLoading
    }
}