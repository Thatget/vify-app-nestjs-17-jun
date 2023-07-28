import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Card, CardMedia, Modal, TextareaAutosize, TextField, Typography} from '@mui/material';
import {styled} from "@mui/system";
import {useForm, useWatch} from "react-hook-form";
// import { window }  from "./../../types/window.ts"
import "../../css/style.css"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import * as ReactDOMServer from 'react-dom/server';
// import {useAuthenticatedFetch} from "../../../../../web/frontend/hooks/useAuthenticatedFetch.ts"


// declare global {
//     interface window {
//         vifyRequestFQ: {
//             lineItem: {
//                 id: any;
//             };
//         };
//     }
// }

//CSS
const hidden = {
    price_regular: {
        hidden: true
    }
}
const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
    ({theme}) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.92rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
const messageSample: string = "Hello,We are visiting your website and your products meet my requirements very well.Please send me the price, specification, and similar model will be OK.Feel free to chat with me.Thanks! "
const newMessage = ReactDOMServer.renderToString(
    <p>abc</p>
)
type Props = {
    isOpen: boolean;
    handleModal: (modal: string) => void;
    form: string

}
type LineItem = {
    description: string;
    id: number;
    variant: any;
    title: string;
    images: string;

}
const initialLineItem: LineItem = {
    id: 1,
    variant: {},
    description: 'Product description',
    title: 'Product Title',
    images: '',
}

type FormValues = {
    email: string,
    name: string,
    message: string
}
const schema = yup
    .object()
    .shape({
        email: yup.string().email("You must enter a valid email").required("You must enter an email"),
    })
    .required()

const DefaultForm = ({isOpen, handleModal}: Props) => {
    // const fetch = useAuthenticatedFetch()
    const [open, setOpen] = useState(isOpen)
    const [product, setProduct] = useState({initialLineItem})
    const [formValue, setFormValue] = useState<FormValues>({
        name: '',
        email: '',
        message: '',
    })
    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm({
        criteriaMode: 'all', resolver: yupResolver(schema)
    });
    const email = useWatch({control, name: 'email'})
    const setFormData = (value: string, id: string) => {
        let field = formValue;
        console.log("field", field)
        switch (id) {
            case 'name':
                field = {...field, name: value}
                console.log("field", field)
                break;
            case 'email':
                field = {...field, email: value}
                console.log("field", field)
                break;
            case 'message':
                field = {...field, message: value}
                console.log("field", field)
                break;


            default:
                break;
        }
        setFormValue(field);
    }
    useEffect(() => {
        console.log("version 1.9");
        const product = (window as any).vifyRequestFQ.lineItem;
        const customer = (window as any).vifyRequestFQ.customer;
        const variant_selected_id = (window as any).variant_selected_id
        product.variants.map((variant) => {
            if (variant_selected_id === variant.id) {
                initialLineItem.variant = variant
            }
        })
        setProduct(product);
        initialLineItem.title = product.title;
        initialLineItem.description = product.description;
        initialLineItem.id = product.id;
        initialLineItem.images = product.images[0];
        console.log("initialLineItem", initialLineItem)
        console.log("product", product)
        fetch('/apps/vify_rfq-f/quote_setting', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id: product.id}),
        }).then(response => {
            if (response.ok) {
                return response.json(); // Parse the response data as JSON
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        })
        hidden


    }, [])

    const sendQuote = () => {
        setOpen(false)
        handleModal('thankyou');
        handleSubmit(onSubmit, (errors) => {
            console.log("come")
            console.log(errors);
        })
        const product = (window as any).vifyRequestFQ.lineItem;
        // fetch('/apps/vify_rfq-f/new_quote', {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({...formValue, product_id: product.id}),
        // }).then(response => {
        //     // Check if the response was successful (status code in the range of 200-299)
        //     if (response.ok) {
        //         handleModal('thankyou');
        //         return response.json(); // Parse the response data as JSON
        //     } else {
        //         throw new Error('Request failed with status ' + response.status);
        //     }
        // })
        //     // .then(data => {
        //     //   // Process the data returned from the server
        //     //   console.log(data);
        //     // })
        //     .catch(error => {
        //         // Handle any errors that occurred during the request
        //         handleModal('');
        //         console.error('Error:', error);
        //     });

    }

    // const closeRequest = () => {
    //     // setOpen(false)
    //     handleModal('thankyou');
    //     isOpen = false
    //
    // }
    const onSubmit = (data: any) => {
        console.log("data from From submit", data)
        sendQuote()

    }

//Use in case needed
    // box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleSubmit(onSubmit, (errors) => {
                    console.log(errors);
                })}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form style={{width: '100%'}}
                          onSubmit={handleSubmit(onSubmit, (errors) => {
                              console.log(errors);
                          })}

                    >
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.2}}>
                            <Typography variant="h5" sx={{m: 1, fontWeight: 700}}>Request For
                                Quote Version 1.0</Typography>
                        </Box>
                        <Card sx={{display: 'flex', mr: 1, width: '100%', mb: 0.5}}>
                            <CardMedia
                                component="img"
                                sx={{width: 200, m: 1}}
                                image={`https://${initialLineItem.images}`}
                                alt=""
                            />
                            <div style={{margin: 0.5}}>
                                <Typography variant="body1"
                                            sx={{m: 1}}>Description: {initialLineItem.description}</Typography>
                                <Typography variant="body1" sx={{m: 1}}>
                                    Title: {initialLineItem.variant.name}</Typography>
                                <Typography variant="body1" sx={{m: 1}}>
                                    Price:{initialLineItem.variant.price_formatted}</Typography>

                            </div>

                        </Card>
                        <Box sx={{
                            display: 'flex', width: '100%', mb: 1, mt: 1.7,
                            mr: 1.3, alignItems: 'center'
                        }}>
                            <Typography variant="body1" sx={{}}>Your Name:</Typography>
                            <TextField
                                id="name"
                                label="Your Name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(e.target.value, 'name')}
                                // value={formValue.name}
                                type="text"
                                autoComplete="off"
                                sx={{width: '50ch', mr: 0, ml: 'auto'}}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex', width: '100%', mb: 1, mt: 1.7,
                            mr: 1.3, alignItems: 'center'
                        }}>
                            <Typography variant="body1" sx={{}}>Your Email:</Typography>
                            {/*<TextField*/}
                            {/*    id="email"*/}
                            {/*    onChange={onChange}*/}
                            {/*    // value={formValue.name}*/}
                            {/*    type="email"*/}
                            {/*    autoComplete="off"*/}
                            {/*    sx={{width: '50ch', mr: 0, ml: 'auto'}}*/}
                            {/*/>*/}
                            <TextField {...register("email")}
                                       autoComplete="off"
                                       sx={{width: '50ch', mr: 0, ml: 'auto'}}
                                       label="Your Email"
                                       type={"email"}
                            />

                        </Box>
                        {errors?.email &&
                            <Box display="flex"
                                 justifyContent="flex-end"
                                 alignItems="flex-end"
                            >
                                <Typography
                                    style={{color: "#ff1744"}}>{errors.email.message}</Typography>
                            </Box>
                        }
                        <Box sx={{
                            display: 'flex',
                            width: '100%',
                            my: 1,
                            mr: 1.3,
                            alignContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography variant="body1" sx={{}}>Message</Typography>
                            <StyledTextarea
                                aria-label="minimum height"
                                minRows={5}
                                placeholder={messageSample}
                                // value={formValue.message}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setFormData(e.target.value, "message")}
                                sx={{width: '46ch', mr: 0, ml: 'auto'}}
                            />
                        </Box>
                        <Button variant="contained" type="submit"
                                sx={{mr: 1, mb: 0, mt: 0.5, width: '100%', height: 40}}
                                onClick={handleSubmit(onSubmit, (errors) => {
                                    console.log(errors);
                                })}>
                            <Typography variant="body2">Submit</Typography>
                        </Button>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default DefaultForm

