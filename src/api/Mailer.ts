import axiosAuthInstance from "./Config";

const MailerAPIURL = `${import.meta.env.VITE_BASE_URL}/mailer`;

export const getMailer = async (id: string) => {
    return await axiosAuthInstance.get(`${MailerAPIURL}/${id}`);
}