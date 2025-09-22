import { useQuery } from "@tanstack/react-query";
import { showToast } from "../utils/Toast";
import { TOAST_TYPE } from "../constants/ToastType";
import { getTransactionForFacture } from "../api/Transaction";
import { QueryCacheKey } from "@/api/queryCacheKey";
import { useEffect } from "react";

export const useGetTransactionForFacture = ({ id }: { id: string }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: [QueryCacheKey.TRANSACTIONS, id],
    queryFn: () => getTransactionForFacture(id),
    enabled: id !== " ",
  });

  useEffect(() => {
    if (isError) {
      showToast({
        type: TOAST_TYPE.ERROR,
        message: "Erreur lors de la récuperation de la transaction !",
      });
    }
  }, [error]);

  return {
    isLoading,
    data: data?.data,
  };
};
