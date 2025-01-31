import axios from "axios";
import { LoginInterface } from "../types/Auth.interface";

const AuthAPIURL = "http://localhost:3002/auth";

export const loginAuth = async (loginData: LoginInterface) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${AuthAPIURL}/login`,
            data: loginData
        })

        return response;
    } catch (error: any) {
        return error;
    }
}