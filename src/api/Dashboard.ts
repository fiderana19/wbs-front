import axiosAuthInstance from "./Config";

const BaseAPIURL = `${import.meta.env.VITE_BASE_URL}`;

export const getClientTotal = async () => {
  return await axiosAuthInstance.get(`${BaseAPIURL}/client/total`);
};

export const getProductTotal = async () => {
  return await axiosAuthInstance.get(`${BaseAPIURL}/product/total`);
};

export const getTransactionTotal = async () => {
  return await axiosAuthInstance.get(`${BaseAPIURL}/transaction/total`);
};
