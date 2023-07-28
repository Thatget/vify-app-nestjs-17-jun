import React from "react";
import PhoneNumber from "../Forms/PhoneNumber";
import {TextField, Paper, Button, Grid} from "@material-ui/core";
import {validator} from "../Forms/Validator";
import useForm from "../Forms/useForm";
//
// export const thank_page_content: string = "We've received your request. We are going to reply to you within 24 hours"
// export const defaultFormSetting = {
//     form_title: '',
//     name_title: '',
//     name_placeholder: '',
//     email_title: '',
//     email_placeholder: '',
//     message_title: '',
//     massage_placeholder: '',
//     thank_title: 'Thank you for your quote',
//     thank_content: thank_page_content,
//     shopping_button: 'Continue Shopping',
//     submit_button_text: 'Submit',
// };

//
// const useStyles = makeStyles(theme => ({
//     margin: {
//         margin: theme.spacing(1)
//     },
//     papper: {
//         padding: "20px",
//         width: "40vh",
//         height: "50vh"
//     }
// }));

export default function FormSetting() {
    const initState = {
        email: "",
        password: "",
        phone: ""
    };

    const submit = () => {
        console.log(" Submited");
    };

    const {
        handleChange,
        handleSubmit,
        handleBlur,
        state,
        errors,
        countryCode
    } = useForm({
        initState,
        callback: submit,
        validator
    });

    let isValidForm =
        Object.values(errors).filter(error => typeof error !== "undefined")
            .length === 0;

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: "100vh"}}
        >
            <Paper elevation={4} square={false}>
                <form onSubmit={handleSubmit}>
                    <div>
                        {/* EMAIL */}
                        <TextField
                            required
                            label="Email"
                            name="email"

                            defaultValue={state.email}
                            onChange={handleChange}
                            // error={errors.email ? true : false}
                            // helperText={errors.email}
                            onBlur={handleBlur}
                        />
                        <br/>
                        {/* PASSWORD */}
                        <TextField
                            required
                            label="Password"
                            name="password"
                            type="password"
                            defaultValue={state.password}
                            onChange={handleChange}
                            // error={errors.password ? true : false}
                            // helperText={errors.password}
                            onBlur={handleBlur}
                        />
                    </div>
                    {/* PHONENUMBER */}
                    {/*<div>*/}
                    {/*    <PhoneNumber*/}
                    {/*        errors={errors}*/}
                    {/*        state={state}*/}
                    {/*        handleChange={handleChange}*/}
                    {/*        handleBlur={handleBlur}*/}
                    {/*        countryCode={countryCode}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <Button
                            disabled={!isValidForm}
                            type="submit"
                            variant="contained"
                            color="primary"

                        >
                            Next
                        </Button>
                    </div>
                </form>
            </Paper>
        </Grid>
    );
}
