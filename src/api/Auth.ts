import { SingupInterface } from "../interfaces/Auth.interface";
import { axiosInstance } from "./Config";

const AuthAPIURL = `${import.meta.env.VITE_BASE_URL}/auth`;

export const loginAuth = async (usrid: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${AuthAPIURL}/login`, {
      usrid,
      password,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const signupUser = async (data: SingupInterface) => {
  try {
    const response = await axiosInstance.post(`${AuthAPIURL}/create`, data);
    return response;
  } catch (error: any) {
    return error;
  }
};
