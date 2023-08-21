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
  let variant_selected = (window as any).variant_selected
  const [selectedVariant, setSelectedVariant] = useState(variant_selected)
  const [clicked,setClicked] = useState(false)
  
  useEffect(() => {
    document.getElementsByClassName('product-form__input')[0].addEventListener('click', function(event) {
      if (event.target && event.target.matches('input[type=radio]')) {
        const foundVariant = (window as any).vifyRequestFQ.lineItem.variants.find(variant => variant.title === event.target.value)
        setSelectedVariant(foundVariant)
        console.log("variant_selected", foundVariant)
        console.log("clicked",true)
        setClicked(true)
      }
    })
  },[])
  

  useEffect(() => {
    void fetch(`/apps/vify_rfq-f/quote_setting?variant_selected_id=${selectedVariant.id}`)
      .then(response => response.json())
      .then(data => {
        setSetting(data);
        setDataSettings(data.settings)
        console.log("data.settings",data.settings)
        const hidepriceElement: HTMLElement = document.querySelector('.price--show-badge')
      console.log("hidepriceElement.style.display",hidepriceElement);
      const hide_price: quoteEntity = data.settings.find((result) => result.name === 'hide_price')
      if(hide_price.value === '0') {
        hidepriceElement.style.display = 'block'
      }
      const hideBuyNowElement: HTMLElement = document.querySelector('.shopify-payment-button')
      console.log("hideBuyNowElement",hideBuyNowElement);
      const hide_buy_now: quoteEntity = data.settings.find((result) => result.name === 'hide_buy_now')
      console.log("hide_buy_now",hide_buy_now); 
      if( hide_buy_now.value === '0') hideBuyNowElement.style.display = 'block'
      const hideAddToCardElement: HTMLElement = document.querySelector('.product-form__submit')
      const hide_add_to_cart: quoteEntity = data.settings.find((result) => result.name === 'hide_add_to_cart')
      if( hide_add_to_cart.value === '0') hideAddToCardElement.style.display = 'block'
      const show_request_for_quote: quoteEntity = data.settings.find((result) => result.name === 'show_request_for_quote')
      if( show_request_for_quote.value === '0' ) setSetting({show:false})
      const form = document.querySelector('.product-form__input')
      console.log("form",form);
    }) 
  }, [clicked])

  const handleChangeModal = (modal: string) => {
    console.log("modal", modal)
    setModal(modal);
  }


  return (
    <>
      {setting.show &&
          <div>
              <Button style={{backgroundColor: "#212121"}} variant="contained" sx={{width: '100%'}}
                      onClick={() => handleChangeModal('request')}>Request For Quote 1.8</Button>
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
