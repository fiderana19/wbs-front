import { message } from "antd";

export const errorMessage = (data: string) => {
    message.error(data);
};

export const successMessage = (data: string) => {
    message.success(data);
};

export const alertMessage = (data: string) => {
    message.warning(data);
};

export const infoMessage = (data: string) => {
    message.info(data);
};