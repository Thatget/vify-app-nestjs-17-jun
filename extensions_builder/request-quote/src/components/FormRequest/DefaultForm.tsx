import { ChangeEvent, useState } from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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

const DefaultForm = ({ isOpen, handleModal }: Props) => {
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
  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeRequest}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Title
          </Typography>
          <TextField name='name' onChange={(e) => setFormData(e)} value={formValue.name} type="text" />
          <TextField name='email' value={formValue.email} onChange={(e) => setFormData(e)} type="text" />
          <TextField name='message' value={formValue.message} onChange={(e) => setFormData(e)} type="text" />
          <Button onClick={() => sendQuote()} >Send</Button>
        </Box>
      </Modal>
    </>
  )
}

export default DefaultForm
