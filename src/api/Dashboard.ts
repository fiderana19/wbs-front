import axios from "axios";

const AuthAPIURL = "http://localhost:3002/auth";

export const loginAuth = async (usrid: string, password: string) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${AuthAPIURL}/login`,
            data: {usrid, password}
        })

        return response;
    } catch (error: any) {
        return error;
    }
}