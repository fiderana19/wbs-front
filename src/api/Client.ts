import axios from "axios";

const ClientAPIURL = "http://localhost:3002/client";

export const getAllClient = async (token: string | null) => {
    const response = await axios({
        method: 'get',
        url: `${ClientAPIURL}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const postClient = async (token: string | null, data: any) => {
    const response = await axios({
        method: 'post',
        url: `${ClientAPIURL}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const deleteClientById = async (token: string | null, id: string) => {
    const response = await axios({
        method: 'delete',
        url: `${ClientAPIURL}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const patchClientById = async (token: string | null, id: string, data: any) => {
    try {
        const response = await axios({
            method: 'patch',
            url: `${ClientAPIURL}/${id}`,
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