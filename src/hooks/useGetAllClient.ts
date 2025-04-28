import { useQuery } from "@tanstack/react-query"
import { getAllClient } from "../api/Client";
import { useEffect } from "react";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";

export const useGetAllClient = () => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["clients"],
        queryFn: () => getAllClient(),
        staleTime: Infinity,
    })

    useEffect(() => {
        if(error) {
            showToast({
                toastProps: {
                    message: "Erreur lors de la recuperation des clients !",
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