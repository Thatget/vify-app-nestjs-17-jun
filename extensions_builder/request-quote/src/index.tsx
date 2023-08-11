import * as React from 'react';
import {Button} from '@mui/material';
import FormRequest from './components/FormRequest/Index.tsx';
import Thankyou from './components/ThankyouPage/Index.tsx';
import {useEffect} from "react";
import {useState} from 'react'

type quoteEntity = {
  name: string;
  value: string;
}

function Index() {
  const [setting, setSetting] = useState({show: true});
  const [modal, setModal] = useState('');
  const [dataSettings, setDataSettings] = useState<Array<quoteEntity>>([])
  
  useEffect(() => {
    const variant_selected_id = (window as any).variant_selected_id
    fetch(`/apps/vify_rfq-f/quote_setting?variant_selected_id=${variant_selected_id}`)
      .then(response => response.json())
      .then(data => {
        setSetting(data);
        setDataSettings(data.settings)
        const hidepriceElement = document.querySelector('.price--show-badge')
        // if (data.show === true)
        // hidepriceElement.style.display = 'block'
      })
  }, [])
  const handleChangeModal = (modal: string) => {
    console.log("modal", modal)
    setModal(modal);
  }
  return (
    <>
      {setting.show &&
          <div>
              <Button style={{backgroundColor: "#212121"}} variant="contained" sx={{width: '100%'}}
                      onClick={() => handleChangeModal('request')}>Request For Quote V1.1</Button>
            {modal === 'request' &&
                <FormRequest isOpen={modal === 'request'} handleModal={handleChangeModal} form={''}
                             dataSettings={dataSettings}/>}
            {modal === 'thankyou' &&
                <Thankyou isOpen={modal === 'thankyou'} handleModal={handleChangeModal} form={''}
                          dataSettings={dataSettings}/>}
          </div>
      }
    </>
  );
}

export default Index
