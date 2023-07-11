import { Box, Modal, Typography, TextField } from '@mui/material';
import { useState } from 'react';

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
  handleClose: () => void;

}

type FormValue = {
  name: string;
  email: string;
  message: string;
}

const DefaultForm = ({ isOpen, handleClose }: Props) => {
  const [formValue, setFormValue] = useState<FormValue>({
    name: '',
    email: '',
    message: ''
  })
  const setFormData = (e) => {
    switch (key) {
      case value:
        
        break;
    
      default:
        break;
    }
    setFormValue((preData) => ({...preData,  });
  }
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Title
          </Typography>
          <TextField name='name' onChange={(e) => setFormData(e)} value={formValue.name} type="text" />
          <TextField name='email' value={formValue.email} type="text" />
          <TextField name='messagage' value={formValue.message} type="text" />
        </Box>
      </Modal>
    </>
  )
}

export default DefaultForm
