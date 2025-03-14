import axios from "axios";

const ProductAPIURL = "http://localhost:3002/product";

export const getAllProduct = async (token: string | null) => {
    const response = await axios({
        method: 'get',
        url: `${ProductAPIURL}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const postProduct = async (token: string | null, data: any) => {
    const response = await axios({
        method: 'post',
        url: `${ProductAPIURL}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const deleteProductById = async (token: string | null, id: string) => {
    const response = await axios({
        method: 'delete',
        url: `${ProductAPIURL}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const patchProduct = async (token: string | null, data: any) => {
    const response = await axios({
        method: 'patch',
        url: `${ProductAPIURL}/${data?._id}`,
        data: data,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}