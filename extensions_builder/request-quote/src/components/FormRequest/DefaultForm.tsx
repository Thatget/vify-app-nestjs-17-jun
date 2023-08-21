import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Card, CardMedia, IconButton, Modal, TextareaAutosize, TextField, Typography} from '@mui/material';
import {styled} from "@mui/system";
import {useForm, useWatch} from "react-hook-form";
import "../../css/style.css"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {CircleCancelMajor} from "@shopify/polaris-icons";
import {Icon} from '@shopify/polaris'
import CancelIcon from '@mui/icons-material/Cancel'

//CSS
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
type Props = {
  isOpen: boolean;
  handleModal: (modal: string) => void;
  form: string,
  dataSettings: Array<quoteEntity>
}
type Variant = {
  name: string;
  title: string;
}
type LineItem = {
  description: string;
  id: number;
  variant: Variant;
  title: string;
  images: string;
  
}
type quoteEntity = {
  name: string;
  value: string;
}
type VariantDTO = {
  id: string;
  title: string;
  price: number;
}

type ProductDTO = {
  id: string;
  title: string;
  image: string
}
const initialLineItem: LineItem = {
  id: 1,
  variant: {
    name:'',
    title:'',
  },
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

const DefaultForm = ({isOpen, handleModal, form, dataSettings}: Props) => {
  // const fetch = useAuthenticatedFetch()
  const [open, setOpen] = useState(isOpen)
  const [product, setProduct] = useState({initialLineItem})
  const [formValue, setFormValue] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  })
  const initialValue: quoteEntity = {
    name: '',
    value: ''
  }
  const [formName, setFormName] = useState<quoteEntity>(initialValue)
  const [formEmail, setFormEmail] = useState<quoteEntity>(initialValue)
  const [formMessage, setFormMessage] = useState<quoteEntity>(initialValue)
  const [formNamePlaceholder, setNamePlaceholder] = useState<quoteEntity>(initialValue)
  const [formEmailPlaceholder, setEmailPlaceholder] = useState<quoteEntity>(initialValue)
  const [formMessagePlaceholder, setMessagePlaceholder] = useState<quoteEntity>(initialValue)
  const [formFormTitle, setFormTitle] = useState<quoteEntity>(initialValue)
  const [formHidePrice, setHidePrice] = useState<quoteEntity>(initialValue)
 
  
  let variant_selected_id = (window as any).variant_selected_id
  const [variantSelectedId, setVariantSelectedId] = useState(variant_selected_id)
  console.log('variant_selected_id',variant_selected_id);
  
  useEffect(() => {
    setVariantSelectedId(variant_selected_id)
    console.log("variantSelectedId",variantSelectedId);
     
  },[variant_selected_id])
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
    product.variants.map((variant) => {
      if (variantSelectedId === variant.id) {
        initialLineItem.variant = variant
      }
    })
    setProduct(product);
    initialLineItem.title = product.title;
    initialLineItem.description = product.description;
    initialLineItem.id = product.id;
    initialLineItem.images = product.images[0];
    dataSettings.map(setting => {
      const temp: quoteEntity = {
        name: setting.name,
        value: setting.value
      }
      if (temp.name === "name") setFormName(temp)
      if (temp.name === "email") setFormEmail(temp)
      if (temp.name === "message") setFormMessage(temp)
      if (temp.name === "email_placeholder") setEmailPlaceholder(temp)
      if (temp.name === 'message_placeholder') setMessagePlaceholder(temp)
      if (temp.name === 'name_placeholder') setNamePlaceholder(temp)
      if (temp.name === 'form_title') setFormTitle(temp)
      if (temp.name === 'hide_price') setHidePrice(temp)
    })
  }, [dataSettings,variantSelectedId])
  const sendQuote = () => {
    setOpen(false)
    handleModal('thankyou');
    // const variant_selected_id = (window as any).variant_selected_id
    const product = (window as any).vifyRequestFQ.lineItem;
    let selected_product: ProductDTO
    selected_product = {
      id: product.id,
      title: product.title,
      image: product.images[0]
    }
    let selected_variant: VariantDTO
    product.variants.map(variant => {
      if (variant.id === variantSelectedId) {
        selected_variant = {
          id: variant.id,
          title: variant.title,
          price: variant.price
        }
      }
    })
    formValue.email = email
    const data = {selected_product, selected_variant, formValue}
    fetch("/apps/vify_rfq-f/new_quote",
      {
        method: "Post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }
    ).then(response => {
        // Check if the response was successful (status code in the range of 200-299)
        if (response.ok) {
          handleModal('thankyou');
          return response.json(); // Parse the response data as JSON
        } else {
          throw new Error('Request failed with status ' + response.status);
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        handleModal('');
        console.error('Error:', error);
      });
    
  }
  const onSubmit = () => {
    sendQuote()
    
  }
  
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
            <Box sx={{height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 1.2}}>
              <IconButton aria-label="cancel" color="inherit" onClick={() => handleModal('')}>
                <CancelIcon/>
              </IconButton>
              <Icon source={CircleCancelMajor} color="critical"/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.2}}>
              <Typography variant="h5" sx={{m: 1, fontWeight: 700}}>{formFormTitle.value}</Typography>
            </Box>
            <Card sx={{display: 'flex', mr: 1, width: '100%', mb: 0.5}}>
              <CardMedia
                component="img"
                sx={{width: 200, m: 1}}
                image={`https://${initialLineItem.images}`}
                alt=""
              />
              <div style={{margin: 0.5}}>
                <Typography variant="body1" sx={{m: 1}}>
                  {initialLineItem.variant.name}</Typography>
                <Typography variant="body1" sx={{m: 1}}>
                  {initialLineItem.variant.title}</Typography>
              </div>
            </Card>
            <Box sx={{
              display: 'flex', width: '100%', mb: 1, mt: 1.7,
              mr: 1.3, alignItems: 'center'
            }}>
              <Typography variant="body1">{formName.value || 'Your Name:'}</Typography>
              <TextField
                id="name"
                label={formNamePlaceholder.value || 'Write Your Name here '}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(e.target.value, 'name')}
                type="text"
                autoComplete="off"
                sx={{width: '50ch', mr: 0, ml: 'auto'}}
              />
            </Box>
            <Box sx={{
              display: 'flex', width: '100%', mb: 1, mt: 1.7,
              mr: 1.3, alignItems: 'center'
            }}>
              <Typography variant="body1"
                          sx={{}}>{formEmail.value || 'Your Email:'}</Typography>
              <TextField {...register("email")}
                         autoComplete="off"
                         sx={{width: '50ch', mr: 0, ml: 'auto'}}
                         label={formEmailPlaceholder.value || 'Your Email'}
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
              <Typography variant="body1">{formMessage.value || "Your Message: "}</Typography>
              <StyledTextarea
                aria-label="minimum height"
                minRows={5}
                placeholder={formMessagePlaceholder.value || 'Write Your Message here'}
                // value={formValue.message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => setFormData(e.target.value, "message")}
                sx={{width: '49ch', mr: 0, ml: 'auto'}}
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

