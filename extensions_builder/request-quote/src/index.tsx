import * as React from 'react';
import {Button} from '@mui/material';
import FormRequest from './components/FormRequest/Index.tsx';
import Thankyou from './components/ThankyouPage/Index.tsx';
import {useEffect} from "react";
import {useState} from 'react'
// import {Button} from '@shopify/polaris';
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
        // console.log("lineItemId", lineItemId)
        console.log("version 1.2 - App.tsx")
        fetch(`/apps/vify_rfq-f/quote_setting?variant_selected_id=${variant_selected_id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Products from quoteSetting ", data)
                setSetting(data);
                console.log("setting.show", data.show)
                setDataSettings(data.settings)
                const hidepriceElement = document.querySelector('.price--show-badge') as HTMLDivElement
                console.log("test", hidepriceElement)
                if (data.show === true)
                    hidepriceElement.style.display = 'block'
                const hideByNowElement = document.querySelector('.shopify-payment-button__button') as HTMLDivElement
                const hideAddToCartElement = document.querySelector('.product-form__submit') as HTMLDivElement
                // data.settings.map(setting => {
                //     if (setting.name === 'hide_buy_now') {
                //         if (setting.value === '1') {
                //             console.log("setting.name - hide by now", setting.value)
                //             console.log("hideByNowElement", hideByNowElement)
                //             hideByNowElement.style.display = 'none'
                //         }
                //     }
                //     if (setting.name === 'hide_add_to_cart') {
                //         if (setting.value === '1') {
                //             console.log("hideByNowElement", hideAddToCartElement)
                //             hideAddToCartElement.style.display = 'none'
                //         }
                //     }
                // })
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
                            onClick={() => handleChangeModal('request')}>Request For Quote V1.3</Button>
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
