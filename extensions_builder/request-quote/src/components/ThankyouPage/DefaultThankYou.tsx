import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import styleBox from "../FormRequest/styleBox";
import CancelIcon from "@mui/icons-material/Cancel";
import { CircleCancelMajor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";

type Props = {
  isOpen: boolean;
  handleModal: (modal: string) => void;
  form: string;
  dataSettings: Array<quoteEntity>;
};
type quoteEntity = {
  name: string;
  value: string;
};

const DefaultThankYou = ({
  isOpen,
  handleModal,
  form,
  dataSettings,
}: Props) => {
  const initialValue: quoteEntity = {
    name: "",
    value: "",
  };
  const [thank_title, setThankTitle] = useState<quoteEntity>(initialValue);
  const [thank_content, setThankContent] = useState<quoteEntity>(initialValue);
  const [shopping_button, setShoppingButton] = useState<quoteEntity>(initialValue);
  const initialThankPageContent = 'We have received your request. We are going to reply to you within 24 hours'
  useEffect(() => {
    console.log("dataSettings", dataSettings);

    dataSettings.map((setting) => {
      const temp: quoteEntity = {
        name: setting.name,
        value: setting.value,
      };
      if (temp.name === "thank_title") setThankTitle(temp);
      if (temp.name === "thank_content") setThankContent(temp);
      if (temp.name === "shopping_button") setShoppingButton(temp);
    });
  }, [dataSettings]);

  const closeThankyou = () => {
    handleModal("");
  };
  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeThankyou}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <Box
            sx={{
              height: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              mb: 0.5,
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
            <Typography
              variant="h5"
              sx={{
                m: 1,
                fontWeight: 700,
              }} className='text-body1'
            >
              {thank_title.value || "Thank you so much for choosing us"}
            </Typography>
          </Box>
            <div style={{ margin: 0.5 }}>
              <Typography className='text-body2' variant="body1" sx={{ m: 1 }}>
                {thank_content.value || initialThankPageContent }
              </Typography>
              <div className="row">
              <button className="submit_button" onClick={closeThankyou}>{shopping_button.value || 'Continue Shopping'}</button>
            </div>
            </div>
        </Box>
      </Modal>
    </>
  );
};

export default DefaultThankYou;
