import axiosAuthInstance from "./Config";

const DetailTransactionAPIURL = `${import.meta.env.VITE_BASE_URL}/detailtransaction`;

export const getDetailByTransactionId = async (id: string) => {
  return await axiosAuthInstance.get(`${DetailTransactionAPIURL}/trans/${id}`);
};

export const postDetail = async (data: any) => {
  return await axiosAuthInstance.post(`${DetailTransactionAPIURL}`, data);
};
