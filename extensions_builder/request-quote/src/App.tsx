import * as React from 'react';
import { Button } from '@mui/material';
import FormRequest from './components/FormRequest/Index';

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  fetch('/apps/vify_rfq-f/quote_setting')
  .then(response => response.json())

  return (
    <div>
      <Button onClick={handleOpen}>Request For Quote</Button>
      <FormRequest isOpen={ open } handleClose={handleClose} />
    </div>
  );
}

export default App
