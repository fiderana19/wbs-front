import { useQuery } from "@tanstack/react-query"
import { getLatestTransaction } from "../api/Transaction";

export const useGetLastTransation = () => {
    const token  = localStorage.getItem("token");

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["last_transaction"],
        queryFn: () => getLatestTransaction(token),
        staleTime: Infinity,
    })

    return {
        data: data?.data,
        isError,
        isLoading,
        error
    }
}