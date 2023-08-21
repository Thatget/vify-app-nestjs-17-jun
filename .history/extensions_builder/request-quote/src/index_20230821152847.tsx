import * as React from 'react';
import {Button} from '@mui/material';
import FormRequest from './components/FormRequest/Index.tsx';
import Thankyou from './components/ThankyouPage/Index.tsx';
import {useEffect} from "react";
import {useState} from 'react'
import {CreateProductDto} from '../../../web/backend/src/modules/product/dto/create-product.dto.ts'


type quoteEntity = {
  name: string;
  value: string;
}
type dataReturn = {
  show: boolean;
  settings: quoteEntity[]
}
type variantType = {
  title: string;
  id: number;
  name: string;
}

function Index() {
  const [setting, setSetting] = useState({show: true});
  const [modal, setModal] = useState('');
  const [dataSettings, setDataSettings] = useState<Array<quoteEntity>>([])
  const [selectedProduct,setSelectedProduct] = useState<CreateProductDto>()
  let variant_selected = (window as any).variant_selected
  const [selectedVariant, setSelectedVariant] = useState(variant_selected)

  useEffect(() => {
    const selected_product = (window as any).vifyRequestFQ.lineItem
    console.log("Come here");
    console.log(selected_product.id)
    
    void fetch(`/apps/vify_rfq-f/product_setting?product_id=${selected_product.id}`)
    .then(response => response.json())
    .then((data: CreateProductDto) => {
        console.log("data",data);
        setSelectedProduct(selectedProduct)
    })
  })
  
  useEffect(() => {
    document.getElementsByClassName('product-form__input')[0].addEventListener('click', function(event: any) {
      if (event.target && event.target.matches('input[type=radio]')) {
        const foundVariant = (window as any).vifyRequestFQ.lineItem.variants.find(variant => variant.title === event.target.value)
        setSelectedVariant(foundVariant)
        console.log("variant_selected", foundVariant)
        const variantInProduct = selectedProduct.variants.find(variant => variant.id === foundVariant.id)
        console.log('variantInProduct',variantInProduct);
        
      }
    })
  },[])

  
  useEffect(() => {
    void fetch('/apps/vify_rfq-f/quote_setting')
      .then(response => response.json())
      .then((data: dataReturn) => {
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
  }, [selectedVariant])

  const handleChangeModal = (modal: string) => {
    console.log("modal", modal)
    setModal(modal);
  }


  return (
    <>
      {setting.show &&
          <div>
              <Button style={{backgroundColor: "#212121"}} variant="contained" sx={{width: '100%'}}
                      onClick={() => handleChangeModal('request')}>Request For Quote 1.4</Button>
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
