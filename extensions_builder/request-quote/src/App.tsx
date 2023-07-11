import * as React from 'react';
import { Button } from '@mui/material';
import FormRequest from './components/FormRequest/Index';

function App() {
  const [open, setOpen] = React.useState(false);
  const [showRequest, setShowRequest] = React.useState(true)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  fetch('/apps/vify_rfq-f/quote_setting')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setShowRequest(true);
  })
  return (
    <>
    {showRequest &&
      <div>
        <Button onClick={handleOpen}>Request For Quote</Button>
        <FormRequest isOpen={open} handleClose={handleClose} form={''} />
      </div>
    }
    </>
  );
}

export default App
