import React from "react";
import {InputAdornment, TextField} from "@material-ui/core";

const getFlagUrl = (countryCode: any) => {
    return `https://www.countryflags.io/${countryCode.toLowerCase()}/flat/24.png`;
};
type phone = {
    errors: any,
    state: any,
    handleChange: any,
    handleBlur: any,
    countryCode: any
}
const PhoneNumber = ({
                         errors,
                         state,
                         handleChange,
                         handleBlur,
                         countryCode
                     }: phone) => {
    return (
        <TextField
            required
            name="phone"
            label="Phone Number"
            error={errors.phone ? true : false}
            defaultValue={state.phone}
            onChange={handleChange}
            helperText={errors.phone}
            onBlur={handleBlur}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <img
                            src={countryCode && getFlagUrl(countryCode)}
                            alt={countryCode || ""}
                            height="18px"
                        />
                    </InputAdornment>
                )
            }}
        />
    );
};

export default PhoneNumber;
