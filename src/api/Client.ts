import axios from "axios";

const ClientAPIURL = "http://localhost:3002/client";

export const getAllClient = async (token: string | null) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${ClientAPIURL}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const deleteClientById = async (token: string | null, id: string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${ClientAPIURL}/client/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}

export const patchClientById = async (token: string | null, id: string, data: any) => {
    try {
        const response = await axios({
            method: 'patch',
            url: `${ClientAPIURL}/client/${id}`,
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