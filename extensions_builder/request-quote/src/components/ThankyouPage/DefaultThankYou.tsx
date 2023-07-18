import { Box, Modal, Typography } from '@mui/material';
// import React from 'react'

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

const DefaultThankYou = ({isOpen, handleModal}: Props) => {

  const closeThankyou = () => {
    handleModal('');
  }
  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeThankyou}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thank you page
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Thank for .....
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default DefaultThankYou