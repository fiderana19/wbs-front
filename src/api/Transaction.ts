import axios from "axios";

const TransactionAPIURL = "http://localhost:3002/transaction";

export const getLatestTransaction = async (token: string | null) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${TransactionAPIURL}/latest`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const getAllTransaction = async (token: string | null) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${TransactionAPIURL}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const postTransaction = async (token: string | null, data: any) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${TransactionAPIURL}`,
            data: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const deleteTransaction = async (token: string | null, id: string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${TransactionAPIURL}/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const patchTransaction = async (token: string | null, id: string, data: any) => {
    try {
        const response = await axios({
            method: 'patch',
            url: `${TransactionAPIURL}/${id}`,
            data: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const getTransactionById = async (token: string | null, id: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${TransactionAPIURL}/find/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const searchTransactionBetweenDates = async (token: string | null, data: any) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${TransactionAPIURL}/search`,
            data: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const getTransactionForFacture = async (token: string | null, id: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${TransactionAPIURL}/findfacture/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}