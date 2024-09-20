import {FC} from "react";

interface IErrorMessageProps {
    message: string;
}

const ErrorMessage:FC<IErrorMessageProps> = ({message}) => {
    return <span>{message}</span>
}

export default ErrorMessage