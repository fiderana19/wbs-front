import { useQuery } from "@tanstack/react-query";
import { getAllTransaction } from "../api/Transaction";

export const useGetAllTransaction = () => {
    const token = localStorage.getItem('token');

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getAllTransaction(token),
        staleTime: Infinity
    })

    return {
        data: data?.data,
        isError,
        error,
        isLoading
    }
}