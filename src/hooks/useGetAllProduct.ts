import { useQuery } from "@tanstack/react-query"
import { getAllProduct } from "../api/Product"

export const useGetAllProduct = () => {
    const token = localStorage.getItem('token');

    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => getAllProduct(token),
        staleTime: Infinity
    })

    return {
        data: data?.data,
        error,
        isError,
        isLoading
    }
}