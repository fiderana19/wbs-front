import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TOAST_TYPE } from "../constants/ToastType";
import { showToast } from "../utils/Toast";
import { getTransactionTotal } from "../api/Dashboard";
import { QueryCacheKey } from "@/api/queryCacheKey";

export const useGetTransactionTotal = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [QueryCacheKey.TRANSACTION_TOTAL],
    queryFn: () => getTransactionTotal(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      showToast({
        message:
          "Erreur lors de la recuperation de total des transactions pour la chart !",
        type: TOAST_TYPE.ERROR,
      });
    }
  }, [error]);

  return {
    data: data?.data,
    isError,
    error,
    isLoading,
  };
};
