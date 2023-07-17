import * as React from 'react';
import { Button } from '@mui/material';
import FormRequest from './components/FormRequest/Index';

function App() {
  const [setting, setSetting] = React.useState({show: true});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  fetch('/apps/vify_rfq-f/quote_setting')
  .then(response => response.json())
  .then(data => {
    setSetting(data);
  })
  return (
    <>
    {setting.show &&
      <div>
        <Button onClick={handleOpen}>Request For Quote</Button>
        <FormRequest isOpen={open} handleClose={handleClose} form={''} />
      </div>
    }
    </>
  );
}

export default App
