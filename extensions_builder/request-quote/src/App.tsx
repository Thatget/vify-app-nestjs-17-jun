import * as React from 'react';
import {Button} from '@mui/material';
import FormRequest from './components/FormRequest/Index';
import Thankyou from './components/ThankyouPage/Index';

function App() {
    const [setting, setSetting] = React.useState({show: true});
    const [modal, setModal] = React.useState('');

    fetch('/apps/vify_rfq-f/quote_setting')
        .then(response => response.json())
        .then(data => {
            setSetting(data);
        })

    const handleChangeModal = (modal: string) => {
        setModal(modal);
    }
    return (
        <>
            {setting.show &&
                <div>
                    <Button variant="contained" onClick={() => handleChangeModal('request')}>Request For Quote</Button>
                    {modal === 'request' &&
                        <FormRequest isOpen={modal === 'request'} handleModal={() => handleChangeModal} form={''}/>}
                    {modal === 'thankyou' &&
                        <Thankyou isOpen={modal === 'thankyou'} handleModal={() => handleChangeModal} form={''}/>}
                </div>
            }
        </>
    );
}

export default App
