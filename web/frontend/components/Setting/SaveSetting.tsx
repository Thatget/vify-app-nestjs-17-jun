import React, {useContext} from 'react'
import {StoreContext} from '../../store'
import {useAuthenticatedFetch} from '../../hooks'
import Button from "@mui/material/Button"

const SaveSetting = () => {
    const {state, dispatch} = useContext(StoreContext);

    const setting = state.setting;
    const currentSetting = state.currentSetting;

    const fetch = useAuthenticatedFetch();
    const updateSetting = () => {
        const dataPost: Object[] = [];
        let changedName = false;
        let changedEmail = false;
        let changedMessage = false;
        let changedHidePrice = false;
        let changedHideByNow = false;
        let changedRequestQuote = false;
        let defaultName = {name: 'name', label: setting.name_title || "", value: setting.name_placeholder || ''};
        let defaultEmail = {name: 'email', label: setting.email_title || "", value: setting.email_placeholder || ''};
        let defaultMessage = {
            name: 'message',
            label: setting.message_title || "",
            value: setting.message_placeholder || ''
        };

        let defaultHidePrice = {
            name: 'hide_price',
            value: setting.hide_price || ''
        };
        let defaultHideByNow = {
            name: 'hide_by_now',
            value: setting.hide_buy_now || ''
        };
        let defaultRequestQuote = {
            name: 'show_request_for_quote',
            value: setting.show_request_for_quote || ''
        };


        Object.entries(currentSetting).map(([key, value]) => {
            switch (key) {
                case 'name_title':
                    if (value !== setting.name_title) {
                        defaultName = {...defaultName, label: value};
                        changedName = true;
                    }
                    break;
                case 'name_placeholder':
                    if (value !== setting.name_placeholder) {
                        defaultName = {...defaultName, value: value};
                        changedName = true;
                    }
                    break;
                case 'email_title':
                    if (value !== setting.email_title) {
                        defaultEmail = {...defaultEmail, label: value};
                        changedEmail = true;
                    }
                    break;
                case 'email_placeholder':
                    if (value !== setting.email_placeholder) {
                        defaultEmail = {...defaultEmail, value: value};
                        changedEmail = true;
                    }
                    break;
                case 'message_title':
                    if (value !== setting.message_title) {
                        defaultMessage = {...defaultMessage, label: value};
                        changedMessage = true;
                    }
                    break;
                case 'message_placeholder':
                    if (value !== setting.message_placeholder) {
                        defaultMessage = {...defaultMessage, value: value};
                        changedMessage = true;
                    }
                    break;
                case 'hide_price':
                    if (value !== setting.hide_price) {
                        dataPost.push({name: key, value});
                        changedHidePrice = true;
                    }
                    break;
                case 'hide_buy_now':
                    if (value !== setting.hide_buy_now) {
                        dataPost.push({name: key, value});
                        changedHideByNow = true;
                    }
                    break;
                case 'show_request_for_quote':
                    if (value !== setting.show_request_for_quote) {
                        dataPost.push({name: key, value});
                        changedRequestQuote = true;
                    }
                    break;
                default:
                    break;
            }
        })
        if (changedName) {
            dataPost.push(defaultName);
        }
        if (changedEmail) {
            dataPost.push(defaultEmail);
        }
        if (changedMessage) {
            dataPost.push(defaultMessage);
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

        const data = fetch("/api/quote-entity", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPost)
        })
    }
    const saveAble = (Object.entries(state.currentSetting).length === 0)
    return (
        <Button variant="contained" onClick={updateSetting} sx={{m: 0.2}}>
            Save
        </Button>
    )
}

export default SaveSetting
