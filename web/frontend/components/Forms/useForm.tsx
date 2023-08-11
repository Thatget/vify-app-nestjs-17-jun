import {useState, useEffect, ChangeEvent} from "react";
import {getCountryCode} from "./Validator";

// ******************************
type useF = {
    initState: any, callback: any, validator: any
}
type err = {
    email: any,
    password: any
}
const initialError: err = {
    email: '',
    password: ''
}
const useForm = ({
                     initState, callback, validator
                 }: useF) => {
    const [state, setState] = useState(initState);
    const [errors, setErrors] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);
    const [countryCode, setCountryCode] = useState("");

    // ******************************
    useEffect(() => {
        const isValidErrors = () =>
            Object.values(errors).filter(error => typeof error !== "undefined")
                .length > 0;
        if (isSubmited && !isValidErrors()) callback();
    }, [errors]);

    // ******************************
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setState(() => ({
            ...state,
            [name]: value
        }));
        if (name === "phone") {
            const country = getCountryCode(value);
            setCountryCode(() => country);
        }
    };

    // ******************************
    const handleBlur = (e: any) => {
        const {name: fieldName} = e.target;
        const faildFiels = validator(state, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
    };

    // ******************************
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const {name: fieldName} = e.target;
        const faildFiels = validator(state, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFiels)[0]
        }));
        setIsSubmited(true);
    };

    return {
        handleChange,
        handleSubmit,
        handleBlur,
        state,
        errors,
        countryCode
    };
};

export default useForm;
