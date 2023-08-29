import {  Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {Modal} from '@shopify/polaris'
// import React from 'react'

type Props = {
    isOpen: boolean;
    handleModal: (modal: string) => void;
    form: string,
    dataSettings: Array<quoteEntity>
}
type quoteEntity = {
    name: string;
    value: string;
}

const DefaultThankYou = ({isOpen, handleModal, form, dataSettings}: Props) => {
    const initialValue: quoteEntity = {
        name: '',
        value: ''
    }
    const [thank_title, setThankTitle] = useState<quoteEntity>(initialValue)
    const [thank_content, setThankContent] = useState<quoteEntity>(initialValue)
    const [shopping_button, setShoppingButton] = useState<quoteEntity>(initialValue)

    useEffect(() => {
      if(isOpen === true) {
        const backdropElement: HTMLElement = document.querySelector(
          ".Polaris-Backdrop"
        );
        backdropElement.style.display = 'block'
        const bodyElement: HTMLElement = document.querySelector(
          ".content-for-layout"
        )
        bodyElement.style.overflow = 'hidden'
      } 
    },[isOpen])
  const resetCss =  () => {
    console.log('Reset css')
    const backdropElement: HTMLElement = document.querySelector(
      ".Polaris-Backdrop"
    );
    backdropElement.style.display = 'none'
    const bodyElement: HTMLElement = document.querySelector(
      ".content-for-layout"
    )
    bodyElement.style.overflow = 'unset'
  }
  
    useEffect(() => {
      console.log("dataSettings",dataSettings);
      
        dataSettings.map(setting => {
            const temp: quoteEntity = {
                name: setting.name,
                value: setting.value
            }
            if (temp.name === "thank_title") setThankTitle(temp)
            if (temp.name === "thank_content") setThankContent(temp)
            if (temp.name === "shopping_button") setShoppingButton(temp)
        })
    }, [dataSettings])

    const closeThankyou = () => {
        handleModal('');
        resetCss()
    }
    return (
        <>
            <Modal
          open={isOpen}
          onClose={closeThankyou} 
          title={thank_title.value || 'Thank you so much for choosing us'}
          primaryAction={{
            content: `${shopping_button.value || 'Continue Shopping'}`,
            onAction: closeThankyou,
          }}
            >
              <Modal.Section>
                        <div style={{margin: 0.5}}>
                            <Typography variant="body1"
                                sx={{m: 1}}>{thank_content.value || 'Have a good day and continue shopping'}</Typography>
                        </div>
                    </Modal.Section>
            </Modal>
        </>
    )
}

export default DefaultThankYou