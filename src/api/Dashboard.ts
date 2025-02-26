import axios from "axios";

const ClientAPIURL = "http://localhost:3002/client";
const ProductAPIURL = "http://localhost:3002/product";
const TransactionAPIURL = "http://localhost:3002/transaction";

export const getClientTotal = async (token: string | null) => {
    const response = await axios({
        method: 'get',
        url: `${ClientAPIURL}/total`,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response;
}

export const getProductTotal = async (token: string | null) => {
    const response = await axios({
        method: 'get',
        url: `${ProductAPIURL}/total`,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response;
}

export const getTransactionTotal = async (token: string | null) => {
    const response = await axios({
        method: 'get',
        url: `${TransactionAPIURL}/total`,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response;
}

export const getProductForChart = async (token: string | null) => {
    const response = await axios({
        method: 'get',
        url: `${ProductAPIURL}`,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response;
}