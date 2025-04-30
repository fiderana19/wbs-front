import { useDark } from "@/context/DarkThemeContext";
import { Bounce, toast } from "react-toastify";

type ToastProps = {
    message?: any,
    type?: any;
}

export const showToast = ({ message, type }: ToastProps) => {
    const { isDark } = useDark();

    toast( message, {
        type: type,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${isDark ? "dark" : "light"}`,
        transition:  Bounce 
    });
}