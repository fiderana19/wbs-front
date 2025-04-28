import axios from "axios";
import axiosAuthInstance from "./Config";

const TransactionAPIURL = `${import.meta.env.VITE_BASE_URL}/transaction`
// const TransactionAPIURL = "http://localhost:3002/transaction";

export const getLatestTransaction = async () => {
    const response = axiosAuthInstance.get(`${TransactionAPIURL}/latest`);
    return response;
}

export const getAllTransaction = async () => {
    const response = axiosAuthInstance.get(TransactionAPIURL);
    return response;
}

export const postTransaction = async (token: string | null, data: any) => {
    const response = await axios({
        method: 'post',
        url: `${TransactionAPIURL}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const deleteTransactionById = async (token: string | null, id: string) => {
    const response = await axios({
        method: 'delete',
        url: `${TransactionAPIURL}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const patchTransaction = async (token: string | null, data: any) => {
    const response = await axios({
        method: 'patch',
        url: `${TransactionAPIURL}/${data._id}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getTransactionById = async (token: string | null, id: string) => {
    const response = await axios({
        method: 'get',
        url: `${TransactionAPIURL}/find/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getTransactionBetweenDates = async (token: string | null, data: any) => {
    const response = await axios({
        method: 'post',
        url: `${TransactionAPIURL}/search`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getTransactionForFacture = async (token: string | null, id: string) => {
    const response = await axios({
        method: 'get',
        url: `${TransactionAPIURL}/findfacture/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}