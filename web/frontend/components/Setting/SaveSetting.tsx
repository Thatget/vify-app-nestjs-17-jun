import {useContext} from 'react'
import {StoreContext, actions} from '../../store'
import {useAuthenticatedFetch} from '../../hooks'
import { Button, ButtonGroup } from '@shopify/polaris';

interface SaveSettingProps {
    isFetchingQuoteEntity: boolean;
    refetchQuoteEntity: () => void;
}

const SaveSetting = ({isFetchingQuoteEntity, refetchQuoteEntity}: SaveSettingProps) => {
    const {state, dispatch} = useContext(StoreContext);
    const setting = state.setting;
    const currentSetting = state.currentSetting;

    const fetch = useAuthenticatedFetch();
    const unchamgeSetting = () => {
      dispatch(actions.resetNewSetting())
    }
    const updateSetting = async () => {
        const dataPost: Object[] = [];
        let changedName = false;
        let changeNamePlaceholder = false;
        let changedEmail = false;
        let changeEmailPlaceholder = false;
        let changedMessage = false;
        let changeMessagePlaceholder = false;
        let changedHidePrice = false;
        let changedHideByNow = false;
        let changedRequestQuote = false;
        let changeThankTitle = false;
        let changeThankContent = false;
        let changeShoppingButton = false;
        let changeFormTitle = false;
        let defaultName = {name: 'name', value: setting.name || ''};
        let defaultEmail = {name: 'email', value: setting.email_title || ''};
        let defaultEmailPlaceholder = {name: 'email_placeholder', value: setting.email_placeholder || ''};
        let defaultMessage = {
            name: 'message',
            value: setting.message_title || ''
        };
        let defaultMessagePlaceholder = {
            name: 'message_placeholder',
            value: setting.message_placeholder || ''
        };
        let defaultNamePlaceholder = {
            name: 'name_placeholder',
            value: setting.message_title || ''
        };

        let defaultHidePrice = {
            name: 'hide_price',
            value: setting.hide_price || ''
        };
        let defaultHideByNow = {
            name: 'hide_buy_now',
            value: setting.hide_buy_now || ''
        };
        let defaultRequestQuote = {
            name: 'show_request_for_quote',
            value: setting.show_request_for_quote || ''
        };
        let defaultFormTitle = {
            name: 'form_title',
            value: setting.form_title || ''
        };
        let defaultThankTitle = {name: 'thank_title', value: setting.thank_title || ''};
        let defaultThankContent = {name: 'thank_content', value: setting.thank_content || ''};
        let defaultContinueShoppingButton = {name: 'shopping_button', value: setting.shopping_button || ''};

      if(currentSetting) {
        Object.entries(currentSetting).map(([key, value]) => {
            switch (key) {
                case 'name':
                    if (value !== setting.name) {
                        defaultName = {...defaultName, value: value};
                        changedName = true;
                    }
                    break;
                case 'name_placeholder':
                    if (value !== setting.name_placeholder) {
                        defaultNamePlaceholder = {...defaultNamePlaceholder, value: value};
                        changeNamePlaceholder = true;
                    }
                    break;
                case 'email':
                    if (value !== setting.email_title) {
                        defaultEmail = {...defaultEmail, value: value};
                        changedEmail = true;
                    }
                    break;
                case 'email_placeholder':
                    if (value !== setting.email_placeholder) {
                        defaultEmailPlaceholder = {...defaultEmailPlaceholder, value: value};
                        changeEmailPlaceholder = true;
                    }
                    break;
                case 'message_title':
                    if (value !== setting.message_title) {
                        defaultMessage = {...defaultMessage, value: value};
                        changedMessage = true;
                    }
                    break;

                case 'message_placeholder':
                    if (value !== setting.message_placeholder) {
                        defaultMessagePlaceholder = {...defaultMessagePlaceholder, value: value};
                        changeMessagePlaceholder = true;
                    }
                    break;
                case 'hide_price':
                    if (value !== setting.hide_price) {
                        defaultHidePrice = {...defaultHidePrice, value: value};
                        changedHidePrice = true;
                    }
                    break;
                case 'hide_buy_now':
                    if (value !== setting.hide_buy_now) {
                        defaultHideByNow = {...defaultHideByNow, value: value};
                        changedHideByNow = true;
                    }
                    break;
                case 'show_request_for_quote':
                    if (value !== setting.show_request_for_quote) {
                        defaultRequestQuote = {...defaultRequestQuote, value: value};
                        changedRequestQuote = true;
                    }
                    break;
                case 'thank_title':
                    if (value !== setting.thank_title) {
                        defaultThankTitle = {...defaultThankTitle, value: value};
                        changeThankTitle = true;
                    }
                    break;
                case 'thank_content':
                    if (value !== setting.thank_content) {
                        defaultThankContent = {...defaultThankContent, value: value};
                        changeThankContent = true;
                    }
                    break;
                case 'shopping_button':
                    if (value !== setting.shopping_button) {
                        defaultContinueShoppingButton = {...defaultContinueShoppingButton, value: value};
                        changeShoppingButton = true;
                    }
                    break;
                case 'all_product':
                  if (value !== setting?.all_product) {
                    dataPost.push({name: 'all_product', value})
                  }
                  break;
                case 'form_title':
                    if (value !== setting.form_title) {
                        defaultFormTitle = {...defaultFormTitle, value: value};
                        changeFormTitle = true;
                    }
                    break;
                default:
                    break;
            }
        })
        if (changedName) {
            dataPost.push(defaultName);
        }
        if (changeNamePlaceholder) {
            dataPost.push(defaultNamePlaceholder);
        }
        if (changedEmail) {
            dataPost.push(defaultEmail);
        }
        if (changeEmailPlaceholder) {
            dataPost.push(defaultEmailPlaceholder);
        }
        if (changedMessage) {
            dataPost.push(defaultMessage);
        }
        if (changeMessagePlaceholder) {
            dataPost.push(defaultMessagePlaceholder);
        }
        if (changedHidePrice) {
            dataPost.push(defaultHidePrice)
        }
        if (changedHideByNow) {
            dataPost.push(defaultHideByNow)
        }
        if (changedRequestQuote) {
            dataPost.push(defaultRequestQuote)
        }
        if (changeThankTitle) {
            dataPost.push(defaultThankTitle)
        }
        if (changeThankContent) {
            dataPost.push(defaultThankContent)
        }
        if (changeShoppingButton) {
            dataPost.push(defaultContinueShoppingButton)
        }
        if (changeFormTitle) {
            dataPost.push(defaultFormTitle)
        }
        const data: any = fetch("/api/quote-entity", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPost)
        })

        if (data.ok) {
            refetchQuoteEntity();
        }
      }
    }

    return (
      <>
      {state.currentSetting && <>
        <ButtonGroup>
          <Button destructive disabled={isFetchingQuoteEntity} onClick={unchamgeSetting} >UnChange</Button>
          <Button primary disabled={isFetchingQuoteEntity} onClick={updateSetting} >Save All Setting</Button>
        </ButtonGroup>
      </>}
      </>

    )
}

export default SaveSetting
