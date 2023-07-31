import * as React from 'react';
import {Button} from '@mui/material';
import FormRequest from './components/FormRequest/Index.tsx';
import Thankyou from './components/ThankyouPage/Index.tsx';
import {useEffect} from "react";
import {useState} from 'react'

// import {Button} from '@shopify/polaris';

function Index() {
    const [setting, setSetting] = useState({show: true});
    const [modal, setModal] = useState('');

    useEffect(() => {
        const variant_selected_id = (window as any).variant_selected_id
        // console.log("lineItemId", lineItemId)
        console.log("version 1.2 - App.tsx")
        fetch(`/apps/vify_rfq-f/quote_setting?variant_selected_id=${variant_selected_id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Products from quoteSetting ", data)
                setSetting(data);
                console.log("setting.show", data.show)
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
                            onClick={() => handleChangeModal('request')}>Request For Quote V1.6</Button>
                    {modal === 'request' &&
                        <FormRequest isOpen={modal === 'request'} handleModal={handleChangeModal} form={''}/>}
                    {modal === 'thankyou' &&
                        <Thankyou isOpen={modal === 'thankyou'} handleModal={handleChangeModal} form={''}/>}
                </div>
            }
            {setting.show &&

                <style>
                    {` .price__regular {
                display: none 
                }
            `}
                </style>}
        </>
    );
}

export default Index
