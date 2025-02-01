import axios from "axios";

const DetailTransactionAPIURL = "http://localhost:3002/detailtransaction";

export const getDetailById = async (token: string | null, id: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${DetailTransactionAPIURL}/trans/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

