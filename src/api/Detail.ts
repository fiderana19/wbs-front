import axios from "axios";

const DetailTransactionAPIURL = "http://localhost:3002/detailtransaction";

export const getDetailByTransactionId = async (token: string | null, id: string) => {
    const response = await axios({
        method: 'get',
        url: `${DetailTransactionAPIURL}/trans/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const postDetail = async (token: string | null, data: any) => {
    const response = await axios({
        method: 'post',
        url: `${DetailTransactionAPIURL}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}
