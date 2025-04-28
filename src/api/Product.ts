import axiosAuthInstance from "./Config";

const ProductAPIURL = `${import.meta.env.VITE_BASE_URL}/product`;

export const getAllProduct = async () => {
    return await axiosAuthInstance.get(ProductAPIURL);
}

export const postProduct = async (data: any) => {
    return await axiosAuthInstance.post(ProductAPIURL, data);
}

export const deleteProductById = async (id: string) => {
    return await axiosAuthInstance.delete(`${ProductAPIURL}/${id}`);
}

export const patchProduct = async (data: any) => {
    return await axiosAuthInstance.patch(`${ProductAPIURL}/${data?._id}`, data);
}