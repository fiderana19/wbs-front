import axios from "axios";

const MailerAPIURL = "http://localhost:3002/mailer";

export const getMailer = async (token: string | null, id: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${MailerAPIURL}/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error: any) {
        return error;
    }
}
