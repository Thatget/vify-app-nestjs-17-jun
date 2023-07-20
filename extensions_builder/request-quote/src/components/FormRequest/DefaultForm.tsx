import {ChangeEvent, useState} from 'react';
import {Box, Modal, TextField, Button, Typography, FormControl, TextareaAutosize, Card, CardMedia} from '@mui/material';
// import {Typography} from "@material-tailwind/react"
import {styled} from "@mui/system";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    isOpen: boolean;
    handleModal: (modal: string) => void;

}

type FormValue = {
    name: string;
    email: string;
    message: string;
}

const DefaultForm = ({isOpen, handleModal}: Props) => {
    const [formValue, setFormValue] = useState<FormValue>({
        name: '',
        email: '',
        message: '',
    })
    const setFormData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let field = formValue;
        switch (e.target.name) {
            case 'name':
                field = {...field, name: e.target.value}
                break;
            case 'email':
                field = {...field, email: e.target.value}
                break;
            case 'message':
                field = {...field, message: e.target.value}
                break;

            default:
                break;
        }
        setFormValue(field);
    }


    const sendQuote = () => {
        const product = window.vifyRequestFQ.product;
        console.log("product", product)
        fetch('/apps/vify_rfq-f/new_quote', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...formValue, product_id: product.id}),
        }).then(response => {
            // Check if the response was successful (status code in the range of 200-299)
            if (response.ok) {
                handleModal('thankyou');
                return response.json(); // Parse the response data as JSON
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        })
            // .then(data => {
            //   // Process the data returned from the server
            //   console.log(data);
            // })
            .catch(error => {
                // Handle any errors that occurred during the request
                handleModal('');
                console.error('Error:', error);
            });
    }

    const closeRequest = () => {
        handleModal('');
    }
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
//Use incase needed
    // box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    return (
        <>
            <Modal
                open={isOpen}
                onClose={closeRequest}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/*<Typography variant="h6">*/}
                    {/*    Product Title*/}
                    {/*</Typography>*/}
                    {/*<Box sx={{*/}
                    {/*    display: 'flex', m: 1*/}
                    {/*}}>*/}
                    {/*    <Typography variant="body1" sx={{display: 'inline-block'}}>*/}
                    {/*        Your Name:*/}
                    {/*    </Typography>*/}
                    {/*    <TextField sx={{m: 1, width: '100%'}} label="Your name :" onChange={(e) => setFormData(e)}*/}
                    {/*               value={formValue.name}*/}
                    {/*               type="text"/>*/}

                    {/*</Box>*/}
                    {/*<Box sx={{*/}
                    {/*    display: 'flex', width: '100%', m: 1*/}
                    {/*}}>*/}
                    {/*    <Typography variant="body1" sx={{display: 'inline-block'}}>*/}
                    {/*        Email: */}
                    {/*    </Typography>*/}
                    {/*    <TextField sx={{m: 1, width: '100%'}} label="Your name :" value={formValue.email}*/}
                    {/*               onChange={(e) => setFormData(e)}*/}
                    {/*               type="text"/>*/}

                    {/*</Box>*/}
                    {/*<Box sx={{*/}
                    {/*    display: 'flex', width: '100%', m: 0.5*/}
                    {/*}}>*/}

                    {/*    <Typography variant="body1" sx={{display: 'inline-block'}}>*/}
                    {/*        Message*/}
                    {/*    </Typography>*/}
                    {/*<Typography component="div">*/}
                    {/*    <Box sx={{textAlign: "justify", m: 1}}>Message</Box>*/}
                    {/*</Typography>*/}
                    {/*<TextField sx={{m: 1, width: '100%'}} name='message' label="Message"*/}
                    {/*           value={formValue.message}*/}
                    {/*           onChange={(e) => setFormData(e)}*/}
                    {/*           type="text"/>*/}

                    {/*</Box>*/}
                    {/*<Box sx={{m: 1}} display="flex" justifyContent="flex-end" alignItems="flex-end">*/}
                    {/*    <Button onClick={() => sendQuote()} variant="contained">Send</Button>*/}
                    {/*</Box>*/}
                    <FormControl sx={{width: '100%'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.2}}>
                            <Typography variant="h5" sx={{m: 1, fontWeight: 700}}>Request For Quote</Typography>
                        </Box>
                        <Card sx={{display: 'flex', mr: 1, width: '100%', mb: 0.5}}>
                            <CardMedia
                                component="img"
                                sx={{width: 200, m: 1}}
                                image="https://www.aromicon.de/magento-download-extensions-modules/media/catalog/product/m/a/magento_aromicon_product_preview_box.jpg"
                                alt=""
                            />
                            <div style={{margin: 0.5}}>
                                <Typography variant="body1" sx={{m: 1}}>product Title</Typography>
                                <Typography variant="body1" sx={{m: 1}}>product Description</Typography>
                            </div>
                        </Card>
                        <Box sx={{
                            display: 'flex', width: '100%', my: 1,
                            mr: 1.3, alignItems: 'center'
                        }}>
                            <Typography variant="body1" sx={{}}>Your Name:</Typography>
                            <TextField
                                id="name_request_for_quote"
                                onChange={(e) => setFormData(e)}
                                // value={formValue.name}
                                type="text"
                                autoComplete="off"
                                sx={{width: '50ch', mr: 0, ml: 'auto'}}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex', width: '100%', my: 1,
                            mr: 1.3, alignItems: 'center'
                        }}>
                            <Typography variant="body1" sx={{}}>Your Email:</Typography>
                            <TextField
                                id="email_request_for_quote"
                                // value={formValue.email}
                                onChange={(e) => setFormData(e)}
                                type="email"
                                autoComplete="off"
                                sx={{width: '50ch', mr: 0, ml: 'auto'}}
                            />
                        </Box>
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
                                placeholder="Write down your message here"
                                // value={formValue.message}
                                onChange={(e) => setFormData(e)}
                                sx={{width: '49ch', mr: 0, ml: 'auto'}}
                            />
                            {/*<TextField*/}
                            {/*    id="message_title"*/}
                            {/*    // value={localFormSetting.message_title}*/}
                            {/*    // placeholder={localFormSetting.massage_placeholder}*/}
                            {/*    autoComplete="off"*/}
                            {/*    sx={{width: '50ch', mr: 0, ml: 'auto'}}*/}
                            {/*/>*/}
                        </Box>

                        <Button variant="contained"
                                sx={{mr: 1, mb: 0, mt: 0.5, width: '100%', height: 40}} onClick={() => sendQuote()}>
                            <Typography variant="body2">Submit</Typography>
                        </Button>

                    </FormControl>

                </Box>


            </Modal>
        </>
    )
}

export default DefaultForm

