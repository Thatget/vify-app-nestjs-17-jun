import { Modal } from '@mui/material';
import React from 'react'

type Props = {
  isOpen: boolean;
  handleClose: () => void;
}

const DefaultThankYouPage = ({isOpen, handleClose}: Props) => {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        </Box>
      </Modal>
    </>
  )
}

export default DefaultThankYouPage
