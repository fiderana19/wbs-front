import axiosAuthInstance from "./Config";

const ClientAPIURL = `${import.meta.env.VITE_BASE_URL}/client`;

export const getAllClient = async () => {
  return await axiosAuthInstance.get(ClientAPIURL);
};

export const postClient = async (data: any) => {
  return await axiosAuthInstance.post(ClientAPIURL, data);
};

export const deleteClientById = async (id: string) => {
  return await axiosAuthInstance.delete(`${ClientAPIURL}/${id}`);
};

export const patchClientById = async (data: any) => {
  return await axiosAuthInstance.patch(`${ClientAPIURL}/${data?._id}`, data);
};
