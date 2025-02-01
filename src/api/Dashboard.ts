import axios from "axios";

const ClientAPIURL = "http://localhost:3002/client";
const ProductAPIURL = "http://localhost:3002/product";
const TransactionAPIURL = "http://localhost:3002/transaction";

export const getClientTotal = async (token: string | null) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${ClientAPIURL}/total`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const getProductTotal = async (token: string | null) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${ProductAPIURL}/total`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const getTransactionTotal = async (token: string | null) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${TransactionAPIURL}/total`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const getProductForChart = async (token: string | null) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${ProductAPIURL}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}