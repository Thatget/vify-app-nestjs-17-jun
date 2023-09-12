import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  IconButton,
  TextField,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImageNotFound from "../../public/imageNotFound.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { CircleCancelMajor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import styleBox from "./styleBox.ts";

type Props = {
  isOpen: boolean;
  handleModal: (modal: string) => void;
  form: string;
  dataSettings: Array<quoteEntity>;
};
type Variant = {
  name: string;
  title: string;
};
type LineItem = {
  description: string;
  id: number;
  variant: Variant;
  title: string;
  images: string;
};
type quoteEntity = {
  name: string;
  value: string;
};
type VariantDTO = {
  id: string;
  title: string;
  price: number;
};

type ProductDTO = {
  id: number;
  title: string;
  image: string;
};
const initialLineItem: LineItem = {
  id: 1,
  variant: {
    name: "",
    title: "",
  },
  description: "Product description",
  title: "Product Title",
  images: ImageNotFound,
};

type FormValues = {
  email: string;
  name: string;
  message: string;
};
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("You must enter a valid email")
      .required("You must enter an email"),
  })
  .required();

const DefaultForm = ({ isOpen, handleModal, form, dataSettings }: Props) => {
  // const fetch = useAuthenticatedFetch()
  const [open, setOpen] = useState(isOpen);
  const [product, setProduct] = useState({ initialLineItem });
  const [formValue, setFormValue] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const initialValue: quoteEntity = {
    name: "",
    value: "",
  };
  const [formName, setFormName] = useState<quoteEntity>(initialValue);
  const [formEmail, setFormEmail] = useState<quoteEntity>(initialValue);
  const [formMessage, setFormMessage] = useState<quoteEntity>(initialValue);
  const [formNamePlaceholder, setNamePlaceholder] =
    useState<quoteEntity>(initialValue);
  const [formEmailPlaceholder, setEmailPlaceholder] =
    useState<quoteEntity>(initialValue);
  const [formMessagePlaceholder, setMessagePlaceholder] =
    useState<quoteEntity>(initialValue);
  const [formFormTitle, setFormTitle] = useState<quoteEntity>(initialValue);
  const [formHidePrice, setHidePrice] = useState<quoteEntity>(initialValue);

  const variant_selected_id = (window as any).variant_selected_id;
  const [variantSelectedId, setVariantSelectedId] =
    useState(variant_selected_id);

  useEffect(() => {
    setVariantSelectedId(variant_selected_id);
    console.log("variantSelectedId", variantSelectedId);
  }, [variant_selected_id]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });
  const email = useWatch({ control, name: "email" });
  // const name = useWatch({ control, name: "name" });
  // const message = useWatch({ control, name: "message" });
  const setFormData = (value: string, id: string) => {
    let field = formValue;
    switch (id) {
      case "name":
        field = { ...field, name: value };
        break;
      case "email":
        field = { ...field, email: value };
        break;
      case "message":
        field = { ...field, message: value };
        break;
      default:
        break;
    }
    setFormValue(field);
  };

  useEffect(() => {
    console.log("version 1.1");
    const product = (window as any).vifyRequestFQ.lineItem;
    product.variants.map((variant) => {
      if (variantSelectedId === variant.id) {
        initialLineItem.variant = variant;
      }
    });
    setProduct(product);
    initialLineItem.title = product.title;
    initialLineItem.description = product.description;
    initialLineItem.id = product.id;
    initialLineItem.images = product.images[0];
    dataSettings.map((setting) => {
      const temp: quoteEntity = {
        name: setting.name,
        value: setting.value,
      };
      if (temp.name === "name") setFormName(temp);
      if (temp.name === "email") setFormEmail(temp);
      if (temp.name === "message") setFormMessage(temp);
      if (temp.name === "email_placeholder") setEmailPlaceholder(temp);
      if (temp.name === "message_placeholder") setMessagePlaceholder(temp);
      if (temp.name === "name_placeholder") setNamePlaceholder(temp);
      if (temp.name === "form_title") setFormTitle(temp);
      if (temp.name === "hide_price") setHidePrice(temp);
    });
  }, [dataSettings, variantSelectedId]);
  const sendQuote = () => {
    setOpen(false);
    handleModal("thankyou");
    const product = (window as any).vifyRequestFQ.lineItem;
    let selected_product: ProductDTO;
    selected_product = {
      id: product.id,
      title: product.title,
      image: product.images[0],
    };
    let selected_variant: VariantDTO;
    product.variants.map((variant) => {
      if (variant.id === variantSelectedId) {
        selected_variant = {
          id: variant.id,
          title: variant.title,
          price: variant.price,
        };
      }
    });
    formValue.email = email;
    const data = { selected_product, selected_variant, formValue };
    fetch("/apps/vify_rfq-f/new_quote", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Check if the response was successful (status code in the range of 200-299)
        if (response.ok) {
          handleModal("thankyou");
          return response.json(); // Parse the response data as JSON
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })
      .catch((error) => {
        handleModal("");
        console.error("Error:", error);
      });
  };

  const onSubmit = () => {
    sendQuote();
  };

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
        <Box sx={styleBox}>
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit(onSubmit, (errors) => {
              console.log(errors);
            })}
          >
            <Box
              sx={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                mb: 1.2,
              }}
            >
              <IconButton
                aria-label="cancel"
                color="inherit"
                onClick={() => handleModal("")}
              >
                <CancelIcon />
              </IconButton>
              <Icon source={CircleCancelMajor} color="critical" />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.2,
              }}
            >
              <Typography className='text-body1' variant="h5" sx={{ m: 1, fontWeight: 700 }}>
                {formFormTitle.value || 'Request for Quote'}
              </Typography>
            </Box>
            <Card sx={{ display: "flex", mr: 1, width: "100%", mb: 0.5 }}>
              <CardMedia
                component="img"
                sx={{ width: 150, m: 1 }}
                image={`https://${initialLineItem.images}`}
                alt=""
              />
              <div style={{ margin: 0.5 }}>
                <Typography className='text-body2' variant="body1" sx={{ m: 1 }}>
                  {initialLineItem.variant.name}
                </Typography>
                <Typography className='text-body2' variant="body1" sx={{ m: 1 }}>
                  {initialLineItem.variant.title}
                </Typography>
              </div>
            </Card>

            <Box sx={{
              display: 'flex', width: '100%', mb: 1, mt: 2.3,
              mr: 1, alignItems: 'center'
            }}>
              <div className="col-25">
                <label htmlFor="lname">{formName.value || "Your Name:"}</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="lname"
                  className="lname"
                  name="name"
                  placeholder={
                    formNamePlaceholder.value || "Write Your Name here "
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(e.target.value, "name")}
                ></input>
              </div>
            </Box>

            <Box sx={{
              display: 'flex', width: '100%', mb: 1, mt: 2.3,
              mr: 1, alignItems: 'center'
            }}>
              <div className="col-25">
                <label htmlFor="lname">
                  {formEmail.value || "Your Email:"}
                </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="lname"
                  className="lname"
                  name="email"
                  placeholder={formEmailPlaceholder.value || "Your Email"}
                  {...register('email')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(e.target.value, "email")}
                ></input>
              </div>
            </Box>
            {errors?.email && (
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Typography style={{ color: "#ff1744" }}>
                  {errors.email.message}
                </Typography>
              </Box>
            )}

            <Box sx={{
              display: 'flex', width: '100%', mb: 1, mt: 2.3,
              mr: 1, alignItems: 'center'
            }}>
              <div className="col-25">
                <label htmlFor="lname">
                  {formMessage.value || "Your Message: "}
                </label>
              </div>
              <div className="col-75">
                <textarea
                  id="message"
                  name="message"
                  placeholder={
                    formMessagePlaceholder.value || "Write Your Message here"
                  }
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(e.target.value, 'message')}
                  style={{ height: "130px" }}
                ></textarea>
              </div>
            </Box>
            
            <div className="row">
              <input
                type="submit"
                value="Submit"
                className="submit_button"
              ></input>
            </div>
          </form>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default DefaultForm;
