import { useQuery } from "@tanstack/react-query"
import { getLatestTransaction } from "../api/Transaction";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";

export const useGetLastTransation = () => {
    const token  = localStorage.getItem("token");

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["last_transaction"],
        queryFn: () => getLatestTransaction(token),
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