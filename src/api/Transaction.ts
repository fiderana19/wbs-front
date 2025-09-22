import axiosAuthInstance from "./Config";

const TransactionAPIURL = `${import.meta.env.VITE_BASE_URL}/transaction`;

export const getLatestTransaction = async () => {
  return await axiosAuthInstance.get(`${TransactionAPIURL}/latest`);
};

export const getAllTransaction = async () => {
  return await axiosAuthInstance.get(TransactionAPIURL);
};

export const postTransaction = async (data: any) => {
  return await axiosAuthInstance.post(TransactionAPIURL, data);
};

export const deleteTransactionById = async (id: string) => {
  return await axiosAuthInstance.delete(`${TransactionAPIURL}/${id}`);
};

export const getTransactionById = async (id: string) => {
  return await axiosAuthInstance.get(`${TransactionAPIURL}/find/${id}`);
};

export const getTransactionBetweenDates = async (data: any) => {
  return await axiosAuthInstance.post(`${TransactionAPIURL}/search`, data);
};

export const getTransactionForFacture = async (id: string) => {
  return await axiosAuthInstance.get(`${TransactionAPIURL}/findfacture/${id}`);
};
