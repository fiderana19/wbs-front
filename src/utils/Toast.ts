import { Bounce, toast } from "react-toastify";

type ToastProps = {
    message?: any,
    type?: any;
}

export const showToast = ({toastProps}: {toastProps: ToastProps}) => {
    const {message, type} = toastProps;

    toast( message, {
        type: type,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:  Bounce 
    });
}