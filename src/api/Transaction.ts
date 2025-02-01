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