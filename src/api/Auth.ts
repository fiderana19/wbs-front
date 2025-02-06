import axios from "axios";
import { SingupInterface } from "../interfaces/Auth.interface";

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

export const signupUser = async (data: SingupInterface) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${AuthAPIURL}/create`,
            data: data,
        })

        return response;
    } catch (error: any) {
        return error;
    }
}