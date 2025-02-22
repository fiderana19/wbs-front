import { useQuery } from "@tanstack/react-query"
import { getAllClient } from "../api/Client";

export const useGetAllClient = () => {
    const token  = localStorage.getItem("token");

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["clients"],
        queryFn: () => getAllClient(token),
        staleTime: Infinity,
    })

    return {
        data: data?.data,
        isError,
        isLoading,
        error
    }
}